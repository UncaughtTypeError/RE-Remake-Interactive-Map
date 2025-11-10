/**
 * @file Service layer for biohazard-related business logic in the Express API.
 * @description Provides pure functions for querying and filtering biohazard data from
 * {@link biohazardsData} (base data) and {@link biohazardsRoomData} (room instances) in `src/data/biohazards.ts`.
 * These functions handle business logic and error conditions, keeping controllers focused on
 * HTTP handling. The data is readonly due to `as const` for immutability and type safety.
 * @see {@link ../data/biohazards.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import {
    biohazardsData,
    biohazardsRoomData,
    starsRankingData,
    BiohazardData,
    BiohazardRoomData,
    BiohazardDetailsData,
    STARSRankingData,
    BiohazardCode,
    BiohazardSTARSRankingByCode,
    BiohazardSearchFilters,
    DifficultyLevelEnum,
    BiohazardCodeEnum,
} from '../data';
import { NotFoundError, BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

/**
 * Retrieves all biohazards base data from the static in-memory data source.
 *
 * @description Fetches the entire dataset of biohazards stored in {@link biohazardsData}.
 * Returns master biohazard definitions (e.g., Zombie, Hunter), not room instances.
 * The data is readonly due to the `as const` assertion, ensuring immutability.
 * Suitable for the `GET /api/biohazards/all` endpoint.
 *
 * @returns {Promise<BiohazardData[]>} A promise resolving to an array of all biohazards base data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/all
 * const biohazards = await getAllBiohazardsData();
 * // Returns: [{ id: 'Zb', name: 'Zombie', taxonomy: 'T-Virus Infected Humans', ... }, ...]
 * ```
 */
export const getAllBiohazardsData = async (): Promise<BiohazardData[]> =>
    biohazardsData as BiohazardData[];

/**
 * Retrieves specific biohazards base data by their unique identifiers.
 *
 * @description Queries {@link biohazardsData} for biohazards matching the provided IDs.
 * Returns an object with found biohazards and any unrecognized IDs. If no IDs are provided,
 * returns all biohazards base data. Validates input for a maximum of 100 IDs and format (alphanumeric
 * with hyphens). Uses a Map for O(1) lookups and deduplicates IDs to avoid redundant results.
 * Suitable for the `GET /api/biohazards?ids=...` endpoint.
 *
 * @param ids - An array of unique biohazard identifiers (e.g., ['Zb', 'Ht']).
 * @returns {Promise<{ foundBiohazards: BiohazardData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found biohazards and an array of unrecognized IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters.
 * @throws {NotFoundError} If no provided IDs match any biohazards.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards?ids=Zb,Ht
 * const result = await getBiohazardsDataByIds(['Zb', 'Ht']);
 * // Returns: { foundBiohazards: [{ id: 'Zb', name: 'Zombie', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getBiohazardsDataByIds = async (
    ids: string[],
): Promise<{ foundBiohazards: BiohazardData[]; unrecognizedIds: string[] }> => {
    if (!ids || ids.length === 0) {
        return { foundBiohazards: biohazardsData as BiohazardData[], unrecognizedIds: [] };
    }
    if (ids.length > 100) {
        throw new BadRequestError(Messages.validation.tooManyIds);
    }
    if (ids.some((id) => typeof id !== 'string' || !id.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'));
    }

    const uniqueIds = [...new Set(ids)];
    const idMap = new Map<string, BiohazardData>(
        biohazardsData.map((biohazard) => [biohazard.id, biohazard]),
    );
    const foundBiohazards: BiohazardData[] = [];
    const unrecognizedIds: string[] = [];

    uniqueIds.forEach((id) => {
        const biohazard = idMap.get(id);
        if (biohazard) {
            foundBiohazards.push(biohazard);
        } else {
            unrecognizedIds.push(id);
        }
    });

    if (foundBiohazards.length === 0) {
        throw new NotFoundError(Messages.errors.notFound);
    }

    return { foundBiohazards, unrecognizedIds };
};

/**
 * Retrieves all biohazards room data from the static in-memory data source.
 *
 * @description Fetches the entire dataset of biohazards room data stored in {@link biohazardsRoomData}.
 * Returns specific biohazard instances in rooms (e.g., zombie in keeper's room).
 * The data is readonly due to the `as const` assertion, ensuring immutability and precise
 * type inference for properties like `difficultyLevel` and `code`. Suitable for the
 * `GET /api/biohazards/rooms/all` endpoint.
 *
 * @returns {Promise<BiohazardRoomData[]>} A promise resolving to an array of all biohazards room data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/rooms/all
 * const biohazardsRoomData = await getAllBiohazardsRoomData();
 * // Returns: [{ id: 'zombie1-keepersRoom', code: 'Zb', ... }, ...]
 * ```
 */
export const getAllBiohazardsRoomData = async (): Promise<BiohazardRoomData[]> =>
    biohazardsRoomData as BiohazardRoomData[];

/**
 * Retrieves specific biohazards room data by their unique identifiers, including associated S.T.A.R.S. ranking.
 *
 * @description Queries {@link biohazardsRoomData} for biohazards matching the provided IDs.
 * Returns an object with found biohazards (extended with starsRanking) and any unrecognized IDs. If no IDs are provided,
 * returns all biohazards with their rankings. Validates input for a maximum of 100 IDs and format (alphanumeric
 * with hyphens). Uses a Map for O(1) lookups and deduplicates IDs to avoid redundant results.
 * The data is readonly due to `as const`. Fetches S.T.A.R.S. rankings using {@link getSTARSRankingByCodes}.
 * Suitable for the `GET /api/biohazards/rooms?ids=...` endpoint.
 *
 * @param ids - An array of unique biohazard identifiers (e.g., ['zombie1-keepersRoom']).
 * @returns {Promise<{ foundBiohazards: BiohazardDetailsData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found biohazards with rankings and an array of unrecognized IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters (must be alphanumeric with hyphens).
 * @throws {NotFoundError} If no provided IDs match any biohazards.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/rooms?ids=zombie1-keepersRoom,zombie2-keepersRoom
 * const result = await getBiohazardsRoomDataByIds(['zombie1-keepersRoom', 'zombie2-keepersRoom']);
 * // Returns: { foundBiohazards: [{ id: 'zombie1-keepersRoom', code: 'Zb', starsRanking: { ... }, ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getBiohazardsRoomDataByIds = async (
    ids: string[],
): Promise<{ foundBiohazards: BiohazardDetailsData[]; unrecognizedIds: string[] }> => {
    let biohazards: BiohazardRoomData[] = [];
    let unrecognizedIds: string[] = [];

    if (!ids || ids.length === 0) {
        biohazards = biohazardsRoomData as BiohazardRoomData[];
    } else {
        if (ids.length > 100) {
            throw new BadRequestError(Messages.validation.tooManyIds);
        }
        if (ids.some((id) => typeof id !== 'string' || !id.match(/^[a-zA-Z0-9-]+$/))) {
            throw new BadRequestError(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        }

        const uniqueIds = [...new Set(ids)]; // Deduplicate IDs
        const idMap = new Map<string, BiohazardRoomData>(
            biohazardsRoomData.map((biohazard) => [biohazard.id, biohazard]),
        ); // Optimized O(1) lookup with Map
        const foundBiohazards: BiohazardRoomData[] = [];

        uniqueIds.forEach((id) => {
            const biohazard = idMap.get(id);
            if (biohazard) {
                foundBiohazards.push(biohazard);
            } else {
                unrecognizedIds.push(id);
            }
        });

        if (foundBiohazards.length === 0) {
            throw new NotFoundError(Messages.errors.notFound);
        }

        biohazards = foundBiohazards;
    }

    // Fetch S.T.A.R.S. rankings
    const codes = biohazards.map((b) => b.code);
    const uniqueCodes = [...new Set(codes)];
    const rankingsResponse = await getSTARSRankingByCodes(uniqueCodes);

    const codeToRanking = new Map<string, STARSRankingData>(
        rankingsResponse.foundRankings.map(({ code, starsRanking }) => [
            code,
            starsRanking as STARSRankingData,
        ]),
    );

    // If any codes are unrecognized, add to unrecognizedIds (though static data should prevent this)
    unrecognizedIds = [...unrecognizedIds, ...rankingsResponse.unrecognizedCodes];

    const extendedBiohazards = biohazards.map((b) => ({
        ...b,
        starsRanking: codeToRanking.get(b.code)!,
    }));

    return { foundBiohazards: extendedBiohazards, unrecognizedIds };
};

/**
 * Retrieves all S.T.A.R.S. rankings from the static in-memory data source.
 *
 * @description Fetches the entire dataset of S.T.A.R.S. rankings stored in {@link starsRankingData}.
 * Returns all rankings (Eta through Alpha). The data is readonly due to the `as const` assertion.
 * Suitable for the `GET /api/biohazards/stars-rankings/all` endpoint.
 *
 * @returns {Promise<STARSRankingData[]>} A promise resolving to an array of all S.T.A.R.S. rankings.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/stars-rankings/all
 * const rankings = await getAllSTARSRankings();
 * // Returns: [{ starsClassification: 'Eta', greeksClassification: 'η', ranking: '0', ... }, ...]
 * ```
 */
export const getAllSTARSRankings = async (): Promise<STARSRankingData[]> =>
    starsRankingData as STARSRankingData[];

/**
 * Retrieves S.T.A.R.S. rankings by biohazard codes.
 *
 * @description Queries {@link starsRankingData} for rankings matching the provided codes.
 * Returns an object with found rankings (associated with codes) and any unrecognized codes. If no codes are provided,
 * returns all rankings for all codes. Validates input for a maximum of 100 codes and format (alphanumeric
 * with hyphens). Uses a Map for O(1) lookups and deduplicates codes to avoid redundant results.
 * The data is readonly due to `as const`. Suitable for the `GET /api/biohazards/stars-rankings?codes=...` endpoint.
 *
 * @param codes - An array of biohazard codes (e.g., ['Zb', 'Cr']).
 * @returns {Promise<{ foundRankings: BiohazardSTARSRankingByCode[]; unrecognizedCodes: string[] }>} A promise resolving
 * to an object containing an array of found rankings by code and an array of unrecognized codes.
 *
 * @throws {BadRequestError} If more than 100 codes are provided or any code contains invalid characters (must be alphanumeric with hyphens).
 * @throws {NotFoundError} If no provided codes match any rankings.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/stars-rankings?codes=Zb,Cr
 * const result = await getSTARSRankingByCodes(['Zb', 'Cr']);
 * // Returns: { foundRankings: [{ code: 'Zb', starsRanking: { ... } }, { code: 'Cr', starsRanking: { ... } }], unrecognizedCodes: [] }
 * ```
 */
export const getSTARSRankingByCodes = async (
    codes: string[],
): Promise<{ foundRankings: BiohazardSTARSRankingByCode[]; unrecognizedCodes: string[] }> => {
    if (codes.length > 100) {
        throw new BadRequestError(Messages.validation.tooManyIds.replace('IDs', 'codes'));
    }
    if (codes.some((code) => typeof code !== 'string' || !code.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(
            Messages.validation.invalidIdFormat.replace('{subject}', 'codes'),
        );
    }
    const excludeCodes = (r: STARSRankingData) => {
        const { starsClassification, ranking, threatLevel, directive } = r;
        return { starsClassification, ranking, threatLevel, directive };
    };

    if (!codes || codes.length === 0) {
        const allRankings: BiohazardSTARSRankingByCode[] = [];
        (starsRankingData as STARSRankingData[]).forEach((ranking) => {
            ranking.biohazardCodes.forEach((code) => {
                allRankings.push({ code, starsRanking: excludeCodes(ranking) });
            });
        });
        return { foundRankings: allRankings, unrecognizedCodes: [] };
    }

    const uniqueCodes = [...new Set(codes)]; // Deduplicate codes
    const codeToRankingMap = new Map<BiohazardCode, STARSRankingData>();
    (starsRankingData as STARSRankingData[]).forEach((ranking) => {
        ranking.biohazardCodes.forEach((code) => {
            codeToRankingMap.set(code, ranking);
        });
    });

    const foundRankings: BiohazardSTARSRankingByCode[] = [];
    const unrecognizedCodes: string[] = [];

    uniqueCodes.forEach((code) => {
        const ranking = codeToRankingMap.get(code as BiohazardCode);
        if (ranking) {
            foundRankings.push({
                code: code as BiohazardCode,
                starsRanking: excludeCodes(ranking),
            });
        } else {
            unrecognizedCodes.push(code);
        }
    });

    if (foundRankings.length === 0) {
        throw new NotFoundError(Messages.errors.notFound);
    }

    return { foundRankings, unrecognizedCodes };
};

/**
 * Searches and filters biohazards base data based on specified criteria.
 *
 * @description Filters {@link biohazardsData} using optional criteria (code, name).
 * Returns biohazards matching all provided filters. Name searches are case-insensitive.
 * Suitable for the `GET /api/biohazards/search` endpoint.
 *
 * @param {BiohazardSearchFilters} filters - The criteria to filter biohazards, with optional properties.
 * @returns {Promise<BiohazardData[]>} A promise resolving to an array of biohazards matching the filters.
 *
 * @throws {BadRequestError} If any filter value is invalid (e.g., invalid code).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/search?code=Zb
 * const results = await searchBiohazardsData({ code: 'Zb' });
 * // Returns: [{ id: 'Zb', name: 'Zombie', taxonomy: 'T-Virus Infected Humans', ... }]
 * ```
 */
export const searchBiohazardsData = async ({
    code,
    name,
}: {
    code?: BiohazardCode;
    name?: string;
}): Promise<BiohazardData[]> => {
    // Validate filter inputs
    if (code && !Object.values(BiohazardCodeEnum).includes(code as BiohazardCodeEnum)) {
        throw new BadRequestError(Messages.validation.invalidBiohazardCode);
    }
    if (name && (typeof name !== 'string' || !name.match(/^[a-zA-Z0-9-\s]+$/))) {
        throw new BadRequestError(Messages.validation.invalidString);
    }

    let filtered: BiohazardData[] = biohazardsData as BiohazardData[];

    if (code) filtered = filtered.filter((biohazard) => biohazard.id === code);
    if (name)
        filtered = filtered.filter((biohazard) =>
            biohazard.name.toLowerCase().includes(name.toLowerCase()),
        );

    return filtered;
};

/**
 * Searches and filters biohazards room data based on specified criteria.
 *
 * @description Filters {@link biohazardsRoomData} using optional criteria (room, difficulty, code, name).
 * Returns biohazard room instances matching all provided filters. Name searches are case-insensitive. Suitable for the
 * `GET /api/biohazards/rooms/search?room=keepersRoom&code=Zb` endpoint. The data is readonly
 * due to the `as const` assertion, ensuring immutability and type safety for literal values
 * like `difficultyLevel` and `code`.
 *
 * @param {BiohazardSearchFilters} filters - The criteria to filter biohazards room data, with optional properties.
 * @returns {Promise<BiohazardRoomData[]>} A promise resolving to an array of biohazards room data matching the filters.
 *
 * @throws {BadRequestError} If any filter value is invalid (e.g., invalid ID format, invalid code).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/rooms/search?room=keepersRoom&code=Zb
 * const results = await searchBiohazardsRoomData({
 *   room: 'keepersRoom',
 *   code: 'Zb'
 * });
 * // Returns: [{ id: 'zombie1-keepersRoom', code: 'Zb', ... }, ...]
 * ```
 */
export const searchBiohazardsRoomData = async ({
    room,
    difficulty,
    code,
    name,
}: BiohazardSearchFilters): Promise<BiohazardRoomData[]> => {
    // Validate filter inputs
    if (room && (typeof room !== 'string' || !room.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidRoomIdFormat);
    }
    if (
        difficulty &&
        !Object.values(DifficultyLevelEnum).includes(difficulty as DifficultyLevelEnum)
    ) {
        throw new BadRequestError(Messages.validation.invalidDifficultyLevel);
    }
    if (code && !Object.values(BiohazardCodeEnum).includes(code as BiohazardCodeEnum)) {
        throw new BadRequestError(Messages.validation.invalidBiohazardCode);
    }
    if (name && (typeof name !== 'string' || !name.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidString);
    }

    let filtered: BiohazardRoomData[] = biohazardsRoomData as BiohazardRoomData[];

    if (room) filtered = filtered.filter((biohazard) => biohazard.map.roomId === room);
    if (difficulty)
        filtered = filtered.filter((biohazard) => biohazard.difficultyLevel.includes(difficulty));
    if (code) filtered = filtered.filter((biohazard) => biohazard.code === code);
    if (name)
        filtered = filtered.filter((biohazard) =>
            biohazard.name.toLowerCase().includes(name.toLowerCase()),
        );

    return filtered;
};

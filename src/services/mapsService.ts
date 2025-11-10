/**
 * @file Service layer for map-related business logic in the Express API.
 * @description Provides pure functions for querying and filtering area, map, and room data from
 * {@link areaData}, {@link mapData}, and {@link roomData} in `src/data/areas.ts`, `src/data/maps.ts`,
 * and `src/data/rooms.ts`. These functions handle business logic and error conditions, keeping
 * controllers focused on HTTP handling. The data is readonly due to `as const` for immutability
 * and type safety. It is static in-memory data and could be replaced with DB queries in future.
 * Used by controllers for endpoints like `GET /api/maps/areas/all`, `GET /api/maps/maps/:id`, and
 * `GET /api/maps/rooms/search`.
 * @see {@link ../data/areas.ts}
 * @see {@link ../data/maps.ts}
 * @see {@link ../data/rooms.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import { areaData, mapData, roomData } from '../data';
import {
    AreaData,
    MapData,
    RoomData,
    RoomDetailsData,
    ItemRoomData,
    BiohazardDetailsData,
    RoomSearchFilters,
    ItemID,
    BiohazardCode,
    ItemIDEnum,
    BiohazardCodeEnum,
    PersonsEnum,
    InteractablesEnum,
} from '../data/types';
import * as itemsService from '../services/itemsService';
import * as biohazardsService from '../services/biohazardsService';
import { NotFoundError, BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

/**
 * Retrieves all areas from the static in-memory data source.
 *
 * @description Fetches the entire dataset of areas stored in {@link areaData}.
 * The data is readonly due to the `as const` assertion, ensuring immutability and precise
 * type inference for properties like `id` and `mapIds`. Suitable for the
 * `GET /api/maps/areas/all` endpoint.
 *
 * @returns {Promise<AreaData[]>} A promise resolving to an array of all area data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/areas/all
 * const areas = await getAllAreas();
 * // Returns: [{ id: 'mansion', area: 'Mansion', mapIds: ['mansionF1', ...] }, ...]
 * ```
 */
export const getAllAreas = async (): Promise<AreaData[]> => areaData as AreaData[];

/**
 * Retrieves specific areas by their unique identifiers.
 *
 * @description Queries {@link areaData} for areas matching the provided IDs. Returns an object with
 * found areas and any unrecognized IDs. If no IDs are provided, returns all areas. Validates input
 * for a maximum of 100 IDs and format (alphanumeric with hyphens). Uses a Map for O(1) lookups and
 * deduplicates IDs to avoid redundant results. The data is readonly due to `as const`.
 *
 * @param ids - An array of unique area identifiers (e.g., ['mansion', 'courtyard']).
 * @returns {Promise<{ foundAreas: AreaData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found areas and an array of unrecognized IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters (must be alphanumeric with hyphens).
 * @throws {NotFoundError} If no provided IDs match any areas.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/areas?ids=mansion,courtyard
 * const result = await getAreasByIds(['mansion', 'courtyard']);
 * // Returns: { foundAreas: [{ id: 'mansion', area: 'Mansion', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getAreasByIds = async (
    ids: string[],
): Promise<{ foundAreas: AreaData[]; unrecognizedIds: string[] }> => {
    if (!ids || ids.length === 0) {
        return { foundAreas: areaData as AreaData[], unrecognizedIds: [] };
    }
    if (ids.length > 100) {
        throw new BadRequestError(Messages.validation.tooManyIds);
    }
    if (ids.some((id) => typeof id !== 'string' || !id.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'));
    }

    const uniqueIds = [...new Set(ids)]; // Deduplicate IDs
    const idMap = new Map<string, AreaData>(areaData.map((area) => [area.id, area])); // Optimized O(1) lookup with Map
    const foundAreas: AreaData[] = [];
    const unrecognizedIds: string[] = [];

    uniqueIds.forEach((id) => {
        const area = idMap.get(id);
        if (area) {
            foundAreas.push(area);
        } else {
            unrecognizedIds.push(id);
        }
    });

    if (foundAreas.length === 0) {
        throw new NotFoundError(Messages.errors.notFound);
    }

    return { foundAreas, unrecognizedIds };
};

/**
 * Retrieves all maps from the static in-memory data source.
 *
 * @description Fetches the entire dataset of maps stored in {@link mapData}. The data is readonly
 * due to the `as const` assertion, ensuring immutability and precise type inference for properties
 * like `id` and `roomIds`. Suitable for the `GET /api/maps/maps/all` endpoint.
 *
 * @returns {Promise<MapData[]>} A promise resolving to an array of all map data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/maps/all
 * const maps = await getAllMaps();
 * // Returns: [{ id: 'mansionF1', map: 'Mansion F1', areaId: 'mansion', roomIds: ['keepersRoom', ...] }, ...]
 * ```
 */
export const getAllMaps = async (): Promise<MapData[]> => mapData as MapData[];

/**
 * Retrieves specific maps by their unique identifiers.
 *
 * @description Queries {@link mapData} for maps matching the provided IDs. Returns an object with
 * found maps and any unrecognized IDs. If no IDs are provided, returns all maps. Validates input
 * for a maximum of 100 IDs and format (alphanumeric with hyphens). Uses a Map for O(1) lookups and
 * deduplicates IDs to avoid redundant results. The data is readonly due to `as const`.
 *
 * @param ids - An array of unique map identifiers (e.g., ['mansionF1', 'courtyardF1']).
 * @returns {Promise<{ foundMaps: MapData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found maps and an array of unrecognized IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters (must be alphanumeric with hyphens).
 * @throws {NotFoundError} If no provided IDs match any maps.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/maps?ids=mansionF1,courtyardF1
 * const result = await getMapsByIds(['mansionF1', 'courtyardF1']);
 * // Returns: { foundMaps: [{ id: 'mansionF1', map: 'Mansion F1', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getMapsByIds = async (
    ids: string[],
): Promise<{ foundMaps: MapData[]; unrecognizedIds: string[] }> => {
    if (!ids || ids.length === 0) {
        return { foundMaps: mapData as MapData[], unrecognizedIds: [] };
    }
    if (ids.length > 100) {
        throw new BadRequestError(Messages.validation.tooManyIds);
    }
    if (ids.some((id) => typeof id !== 'string' || !id.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'));
    }

    const uniqueIds = [...new Set(ids)]; // Deduplicate IDs
    const idMap = new Map<string, MapData>(mapData.map((map) => [map.id, map])); // Optimized O(1) lookup with Map
    const foundMaps: MapData[] = [];
    const unrecognizedIds: string[] = [];

    uniqueIds.forEach((id) => {
        const map = idMap.get(id);
        if (map) {
            foundMaps.push(map);
        } else {
            unrecognizedIds.push(id);
        }
    });

    if (foundMaps.length === 0) {
        throw new NotFoundError(Messages.errors.notFound);
    }

    return { foundMaps, unrecognizedIds };
};

/**
 * Retrieves all rooms from the static in-memory data source.
 *
 * @description Fetches the entire dataset of rooms stored in {@link roomData}. The data is readonly
 * due to the `as const` assertion, ensuring immutability and precise type inference for properties
 * like `id`, `accessKey`, and `risk`. Suitable for the `GET /api/maps/rooms/all` endpoint.
 *
 * @returns {Promise<RoomData[]>} A promise resolving to an array of all room data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/rooms/all
 * const rooms = await getAllRooms();
 * // Returns: [{ id: 'keepersRoom', name: "Keeper's Room", ... }, ...]
 * ```
 */
export const getAllRooms = async (): Promise<RoomData[]> => roomData as RoomData[];

/**
 * Retrieves specific rooms by their unique identifiers, including associated persons, interactables, items, and biohazards.
 *
 * @description Queries {@link roomData} for rooms matching the provided IDs. Returns an object with
 * found rooms, their associated details (persons, interactables, items, biohazards), and any unrecognized IDs.
 * If no IDs are provided, returns all rooms with their details. Validates input
 * for a maximum of 100 IDs and format (alphanumeric with hyphens). Uses a Map for O(1) lookups and
 * deduplicates IDs to avoid redundant results. The data is readonly due to `as const`.
 * Fetches persons, interactables, and items using a single {@link getItemsByIds} call by combining their IDs,
 * and biohazards using {@link getBiohazardsByIds}. No unrecognized IDs are expected for detail lists
 * due to static in-memory data.
 *
 * @param ids - An array of unique room identifiers (e.g., ['keepersRoom', 'diningRoomF1']).
 * @returns {Promise<{ foundRooms: RoomDetailsData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found rooms with their details and an array of unrecognized room IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters (must be alphanumeric with hyphens).
 * @throws {NotFoundError} If no provided IDs match any rooms.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/rooms?ids=keepersRoom,diningRoomF1
 * const result = await getRoomsByIds(['keepersRoom', 'diningRoomF1']);
 * // Returns: { foundRooms: [{ id: 'keepersRoom', name: "Keeper's Room", ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getRoomsByIds = async (
    ids: string[],
): Promise<{ foundRooms: RoomDetailsData[]; unrecognizedIds: string[] }> => {
    if (ids.length > 100) {
        throw new BadRequestError(Messages.validation.tooManyIds);
    }
    if (ids.some((id) => typeof id !== 'string' || !id.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'));
    }

    const uniqueIds = [...new Set(ids)]; // Deduplicate IDs
    const idMap = new Map<string, RoomData>(roomData.map((room) => [room.id, room])); // Optimized O(1) lookup with Map
    const foundRooms: RoomDetailsData[] = [];
    const unrecognizedIds: string[] = [];

    // Handle case where no IDs are provided
    if (!ids || ids.length === 0) {
        const allRooms = await Promise.all(
            roomData.map(async (room) => {
                const allItemIds = [
                    ...room.detailList.persons,
                    ...room.detailList.interactables,
                    ...room.detailList.items,
                ];

                // Conditionally call services only when there are ids to lookup
                const itemsPromise = allItemIds.length
                    ? itemsService.getItemsRoomDataByIds(allItemIds)
                    : Promise.resolve({
                          foundItems: [] as ItemRoomData[],
                          unrecognizedIds: [] as string[],
                      });
                const biohazardsPromise = room.detailList.biohazards.length
                    ? biohazardsService.getBiohazardsRoomDataByIds(room.detailList.biohazards)
                    : Promise.resolve({
                          foundBiohazards: [] as BiohazardDetailsData[],
                          unrecognizedIds: [] as BiohazardCode[],
                      });

                const [itemsResponse, biohazardsResponse] = await Promise.all([
                    itemsPromise,
                    biohazardsPromise,
                ]);

                const persons = itemsResponse.foundItems.filter((item: ItemRoomData) =>
                    room.detailList.persons.includes(item.id),
                ) as ItemRoomData[];
                const interactables = itemsResponse.foundItems.filter((item: ItemRoomData) =>
                    room.detailList.interactables.includes(item.id),
                ) as ItemRoomData[];
                const items = itemsResponse.foundItems.filter((item: ItemRoomData) =>
                    room.detailList.items.includes(item.id),
                ) as ItemRoomData[];
                const biohazards = biohazardsResponse.foundBiohazards as BiohazardDetailsData[];

                return {
                    ...room,
                    roomDetails: {
                        persons,
                        interactables,
                        items,
                        biohazards,
                    },
                };
            }),
        );
        return { foundRooms: allRooms, unrecognizedIds: [] };
    }

    // Process provided IDs
    for (const id of uniqueIds) {
        const room = idMap.get(id);
        if (room) {
            const allItemIds = [
                ...room.detailList.persons,
                ...room.detailList.interactables,
                ...room.detailList.items,
            ];

            // Conditionally call services only when arrays are non-empty
            const itemsPromise = allItemIds.length
                ? itemsService.getItemsRoomDataByIds(allItemIds)
                : Promise.resolve({
                      foundItems: [] as ItemRoomData[],
                      unrecognizedIds: [] as string[],
                  });
            const biohazardsPromise = room.detailList.biohazards.length
                ? biohazardsService.getBiohazardsRoomDataByIds(room.detailList.biohazards)
                : Promise.resolve({
                      foundBiohazards: [] as BiohazardDetailsData[],
                      unrecognizedIds: [] as BiohazardCode[],
                  });

            const [itemsResponse, biohazardsResponse] = await Promise.all([
                itemsPromise,
                biohazardsPromise,
            ]);

            const persons = itemsResponse.foundItems.filter((item: ItemRoomData) =>
                room.detailList.persons.includes(item.id),
            ) as ItemRoomData[];
            const interactables = itemsResponse.foundItems.filter((item: ItemRoomData) =>
                room.detailList.interactables.includes(item.id),
            ) as ItemRoomData[];
            const items = itemsResponse.foundItems.filter((item: ItemRoomData) =>
                room.detailList.items.includes(item.id),
            ) as ItemRoomData[];
            const biohazards = biohazardsResponse.foundBiohazards as BiohazardDetailsData[];

            foundRooms.push({
                ...room,
                roomDetails: {
                    persons,
                    interactables,
                    items,
                    biohazards,
                },
            });
        } else {
            unrecognizedIds.push(id);
        }
    }

    if (foundRooms.length === 0) {
        throw new NotFoundError(Messages.errors.notFound);
    }

    return { foundRooms, unrecognizedIds };
};

/**
 * Search filters for rooms.
 * @typedef {Object} RoomSearchFilters
 * @property {MapID} [map] - Finds rooms located in a specific map (e.g., 'mansionF1').
 * @property {ItemID[]} [items] - Finds rooms containing specific items (e.g., ['flashGrenade']).
 * @property {BiohazardCode[]} [biohazards] - Finds rooms containing specific biohazards (e.g., ['Zb']).
 * @property {Persons[]} [persons] - Finds rooms containing specific persons (e.g., ['Barry']).
 * @property {Interactables[]} [interactables] - Finds rooms containing specific interactables (e.g., ['ItemBox']).
 * @property {RoomFunction} [roomFunction] - Finds rooms with a specific function (e.g., 'puzzleRoom').
 * @property {string} [adjoiningRoom] - Finds rooms connected to a specific adjoining room (e.g., 'westWingNorthCorridor').
 * @property {AccessKey} [accessKey] - Finds rooms with accessible via a specific key (e.g., 'Armor Key').
 * @property {RoomThreatLevel} [threatLevel] - Finds rooms with a specific threat level (e.g., 'low-moderate-risk').
 * @property {number} [roomNumber] - Finds rooms with a specific room number (e.g., 5).
 */

/**
 * Searches and filters rooms based on specified criteria.
 *
 * @description Filters {@link roomData} using optional criteria (map, items, biohazards, persons,
 * interactables, roomFunction, adjoiningRoom, accessKey, threatLevel, roomNumber). Returns rooms
 * matching all provided filters. String-based searches (e.g., map, adjoiningRoom) are case-insensitive.
 * Suitable for the `GET /api/maps/rooms/search?map=mansionF1&threatLevel=low-moderate-risk` endpoint.
 * The data is readonly due to the `as const` assertion, ensuring immutability and type safety for
 * literal values like `roomFunction` and `threatLevel`.
 *
 * @param {RoomSearchFilters} filters - The criteria to filter rooms, with optional properties.
 * @returns {Promise<RoomData[]>} A promise resolving to an array of rooms matching the filters.
 *
 * @throws {BadRequestError} If any filter value is invalid (e.g., invalid ID format, non-numeric roomNumber).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/rooms/search?map=mansionF1&threatLevel=low-moderate-risk&roomFunction=none
 * const results = await searchRooms({
 *   map: 'mansionF1',
 *   threatLevel: 'low-moderate-risk',
 *   roomFunction: 'none'
 * });
 * // Returns: [{ id: 'keepersRoom', name: "Keeper's Room", ... }, ...]
 * ```
 */
export const searchRooms = async ({
    map,
    items,
    biohazards,
    persons,
    interactables,
    roomFunction,
    adjoiningRoom,
    accessKey,
    threatLevel,
    roomNumber,
}: RoomSearchFilters): Promise<RoomData[]> => {
    // Validate filter inputs
    if (map && (typeof map !== 'string' || !map.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidMapIdFormat);
    }
    if (
        items &&
        (items.length > 100 ||
            items.some((item) => !Object.values(ItemIDEnum).includes(item as ItemIDEnum)))
    ) {
        throw new BadRequestError(
            items.length > 100 ? Messages.validation.tooManyIds : Messages.validation.invalidItemId,
        );
    }
    if (
        biohazards &&
        (biohazards.length > 100 ||
            biohazards.some(
                (biohazard) =>
                    !Object.values(BiohazardCodeEnum).includes(biohazard as BiohazardCodeEnum),
            ))
    ) {
        throw new BadRequestError(
            biohazards.length > 100
                ? Messages.validation.tooManyIds
                : Messages.validation.invalidBiohazardCode,
        );
    }
    if (
        persons &&
        (persons.length > 100 ||
            persons.some((person) => !Object.values(PersonsEnum).includes(person as PersonsEnum)))
    ) {
        throw new BadRequestError(
            persons.length > 100
                ? Messages.validation.tooManyIds
                : Messages.validation.invalidPerson,
        );
    }
    if (
        interactables &&
        (interactables.length > 100 ||
            interactables.some(
                (interactable) =>
                    !Object.values(InteractablesEnum).includes(interactable as InteractablesEnum),
            ))
    ) {
        throw new BadRequestError(
            interactables.length > 100
                ? Messages.validation.tooManyIds
                : Messages.validation.invalidInteractable,
        );
    }
    if (
        adjoiningRoom &&
        (typeof adjoiningRoom !== 'string' || !adjoiningRoom.match(/^[a-zA-Z0-9-]+$/))
    ) {
        throw new BadRequestError(Messages.validation.invalidAdjoiningRoomIdFormat);
    }
    if (roomNumber !== undefined && (typeof roomNumber !== 'number' || isNaN(roomNumber))) {
        throw new BadRequestError(Messages.validation.invalidNumber.replace('{subject}', 'Room'));
    }

    let filtered: RoomData[] = roomData as RoomData[];

    if (map) {
        filtered = filtered.filter((room) => room.mapId.toLowerCase() === map.toLowerCase());
    }
    if (items) {
        const itemSet = new Set(items);
        filtered = filtered.filter((room) =>
            room.detailList.items.some((itemId) => itemSet.has(itemId as ItemID)),
        );
    }
    if (biohazards) {
        const biohazardSet = new Set(biohazards);
        filtered = filtered.filter((room) =>
            room.detailList.biohazards.some((bioId) => biohazardSet.has(bioId as BiohazardCode)),
        );
    }
    if (persons) {
        const personSet = new Set(persons.map((p) => p.toLowerCase()));
        filtered = filtered.filter((room) =>
            room.detailList.persons.some((person) => personSet.has(person.toLowerCase())),
        );
    }
    if (interactables) {
        const interactableSet = new Set(interactables.map((i) => i.toLowerCase()));
        filtered = filtered.filter((room) =>
            room.detailList.interactables.some((interactable) =>
                interactableSet.has(interactable.toLowerCase()),
            ),
        );
    }
    if (roomFunction) {
        filtered = filtered.filter((room) => room.overview.functions.includes(roomFunction));
    }
    if (adjoiningRoom) {
        filtered = filtered.filter((room) =>
            room.adjoiningRooms.some(
                (adjRoom) => adjRoom.id.toLowerCase() === adjoiningRoom.toLowerCase(),
            ),
        );
    }
    if (accessKey) {
        filtered = filtered.filter((room) => {
            const accessKeys = room.overview.accessControl.accessKey;
            if (typeof accessKeys === 'string') {
                return accessKeys === accessKey;
            } else if (Array.isArray(accessKeys)) {
                return accessKeys.some((entry) => entry.key === accessKey);
            }
        });
    }
    if (threatLevel) {
        filtered = filtered.filter((room) =>
            room.overview.risk.some((entry) => entry.threatLevel === threatLevel),
        );
    }
    if (roomNumber !== undefined) {
        filtered = filtered.filter((room) => room.roomNumber === roomNumber);
    }

    return filtered;
};

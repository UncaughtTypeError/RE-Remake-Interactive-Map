/**
 * @file Service layer for items-related business logic in the Express API.
 * @description Provides pure functions for querying and filtering items data from
 * {@link itemsData} (base data) and {@link itemsRoomData} (room instances) in `src/data/items.ts`.
 * These functions handle business logic and error conditions, keeping controllers focused on
 * HTTP handling. The data is readonly due to `as const` for immutability and type safety.
 * @see {@link ../data/items.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import {
    itemsData,
    itemsRoomData,
    ItemData,
    ItemRoomData,
    ItemSearchFilters,
    DifficultyLevelEnum,
    ItemTypeEnum,
} from '../data';
import { NotFoundError, BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

/**
 * Retrieves all items base data from the static in-memory data source.
 *
 * @description Fetches the entire dataset of items stored in {@link itemsData}.
 * Returns master item definitions (e.g., Typewriter, Battery Pack), not room instances.
 * The data is readonly due to the `as const` assertion, ensuring immutability.
 * Suitable for the `GET /api/items/all` endpoint.
 *
 * @returns {Promise<ItemData[]>} A promise resolving to an array of all items base data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/all
 * const items = await getAllItemsData();
 * // Returns: [{ id: 'typewriter', name: 'Typewriter', function: 'Save Point', ... }, ...]
 * ```
 */
export const getAllItemsData = async (): Promise<ItemData[]> => itemsData as ItemData[];

/**
 * Retrieves specific items base data by their unique identifiers.
 *
 * @description Queries {@link itemsData} for items matching the provided IDs.
 * Returns an object with found items and any unrecognized IDs. If no IDs are provided,
 * returns all items base data. Validates input for a maximum of 100 IDs and format (alphanumeric
 * with hyphens). Uses a Map for O(1) lookups and deduplicates IDs to avoid redundant results.
 * Suitable for the `GET /api/items?ids=...` endpoint.
 *
 * @param ids - An array of unique item identifiers (e.g., ['typewriter', 'itemBox']).
 * @returns {Promise<{ foundItems: ItemData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found items and an array of unrecognized IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters.
 * @throws {NotFoundError} If no provided IDs match any items.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items?ids=typewriter,itemBox
 * const result = await getItemsDataByIds(['typewriter', 'itemBox']);
 * // Returns: { foundItems: [{ id: 'typewriter', name: 'Typewriter', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getItemsDataByIds = async (
    ids: string[],
): Promise<{ foundItems: ItemData[]; unrecognizedIds: string[] }> => {
    if (!ids || ids.length === 0) {
        return { foundItems: itemsData as ItemData[], unrecognizedIds: [] };
    }
    if (ids.length > 100) {
        throw new BadRequestError(Messages.validation.tooManyIds);
    }
    if (ids.some((id) => typeof id !== 'string' || !id.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'));
    }

    const uniqueIds = [...new Set(ids)];
    const idMap = new Map<string, ItemData>(itemsData.map((item) => [item.id, item]));
    const foundItems: ItemData[] = [];
    const unrecognizedIds: string[] = [];

    uniqueIds.forEach((id) => {
        const item = idMap.get(id);
        if (item) {
            foundItems.push(item);
        } else {
            unrecognizedIds.push(id);
        }
    });

    if (foundItems.length === 0) {
        throw new NotFoundError(Messages.errors.notFound);
    }

    return { foundItems, unrecognizedIds };
};

/**
 * Retrieves all items room data from the static in-memory data source.
 *
 * @description Fetches the entire dataset of items room data stored in {@link itemsRoomData}.
 * Returns specific item instances in rooms (e.g., typewriter in dining room).
 * The data is readonly due to the `as const` assertion, ensuring immutability.
 * Suitable for the `GET /api/items/rooms/all` endpoint.
 *
 * @returns {Promise<ItemRoomData[]>} A promise resolving to an array of all items room data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/rooms
 * const itemsRoomData = await getAllItemsRoomData();
 * // Returns: [{ id: 'typewriter-diningRoomF1', itemId: 'typewriter', map: {...}, ... }, ...]
 * ```
 */
export const getAllItemsRoomData = async (): Promise<ItemRoomData[]> =>
    itemsRoomData as ItemRoomData[];

/**
 * Retrieves specific items room data by their unique identifiers.
 *
 * @description Queries {@link itemsRoomData} for items matching the provided IDs. Returns an object with
 * found items and any unrecognized IDs. If no IDs are provided, returns all items. Validates input
 * for a maximum of 100 IDs and format (alphanumeric with hyphens). Uses a Map for O(1) lookups and
 * deduplicates IDs to avoid redundant results. The data is readonly due to `as const`.
 *
 * @param ids - An array of unique item identifiers (e.g., ['typewriter-diningRoomF1']).
 * @returns {Promise<{ foundItems: ItemRoomData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found items and an array of unrecognized IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters.
 * @throws {NotFoundError} If no provided IDs match any items.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/rooms?ids=typewriter-diningRoomF1
 * const result = await getItemsRoomDataByIds(['typewriter-diningRoomF1']);
 * // Returns: { foundItems: [{ id: 'typewriter-diningRoomF1', ... }], unrecognizedIds: [] }
 * ```
 */
export const getItemsRoomDataByIds = async (
    ids: string[],
): Promise<{ foundItems: ItemRoomData[]; unrecognizedIds: string[] }> => {
    if (!ids || ids.length === 0) {
        return { foundItems: itemsRoomData as ItemRoomData[], unrecognizedIds: [] };
    }
    if (ids.length > 100) {
        throw new BadRequestError(Messages.validation.tooManyIds);
    }
    if (ids.some((id) => typeof id !== 'string' || !id.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'));
    }

    const uniqueIds = [...new Set(ids)]; // Deduplicate IDs
    const idMap = new Map<string, ItemRoomData>(itemsRoomData.map((item) => [item.id, item]));
    const foundItems: ItemRoomData[] = [];
    const unrecognizedIds: string[] = [];

    uniqueIds.forEach((id) => {
        const item = idMap.get(id);
        if (item) {
            foundItems.push(item);
        } else {
            unrecognizedIds.push(id);
        }
    });

    if (foundItems.length === 0) {
        throw new NotFoundError(Messages.errors.notFound);
    }

    return { foundItems, unrecognizedIds };
};

/**
 * Searches and filters items base data based on specified criteria.
 *
 * @description Filters {@link itemsData} using optional criteria (type, name, taxonomy).
 * Returns items matching all provided filters. Name searches are case-insensitive.
 * Suitable for the `GET /api/items/search` endpoint.
 *
 * @param {ItemSearchFilters} filters - The criteria to filter items, with optional properties.
 * @returns {Promise<ItemData[]>} A promise resolving to an array of items matching the filters.
 *
 * @throws {BadRequestError} If any filter value is invalid (e.g., invalid type).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/search?type=Typewriter
 * const results = await searchItemsData({ type: 'Typewriter' });
 * // Returns: [{ id: 'typewriter', name: 'Typewriter', type: 'Typewriter', ... }]
 * ```
 */
export const searchItemsData = async ({
    type,
    name,
}: {
    type?: string;
    name?: string;
}): Promise<ItemData[]> => {
    // Validate filter inputs
    if (type && !Object.values(ItemTypeEnum).includes(type as ItemTypeEnum)) {
        throw new BadRequestError(Messages.validation.invalidItemType);
    }
    if (name && (typeof name !== 'string' || !name.match(/^[a-zA-Z0-9-\s]+$/))) {
        throw new BadRequestError(Messages.validation.invalidString);
    }

    let filtered: ItemData[] = itemsData as ItemData[];

    if (type) filtered = filtered.filter((item) => item.type === type);
    if (name)
        filtered = filtered.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));

    return filtered;
};

/**
 * Searches and filters items room data based on specified criteria.
 *
 * @description Filters {@link itemsRoomData} using optional criteria (room, difficulty, type, name).
 * Returns item room instances matching all provided filters. Name searches are case-insensitive.
 * Suitable for the `GET /api/items/rooms/search` endpoint.
 *
 * @param {ItemSearchFilters} filters - The criteria to filter items room data.
 * @returns {Promise<ItemRoomData[]>} A promise resolving to an array of items room data matching the filters.
 *
 * @throws {BadRequestError} If any filter value is invalid.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/rooms/search?room=diningRoomF1
 * const results = await searchItemsRoomData({ room: 'diningRoomF1' });
 * // Returns: [{ id: 'typewriter-diningRoomF1', ... }, ...]
 * ```
 */
export const searchItemsRoomData = async ({
    room,
    difficulty,
    type,
    name,
}: ItemSearchFilters): Promise<ItemRoomData[]> => {
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
    if (type && !Object.values(ItemTypeEnum).includes(type as ItemTypeEnum)) {
        throw new BadRequestError(Messages.validation.invalidItemType);
    }
    if (name && (typeof name !== 'string' || !name.match(/^[a-zA-Z0-9-\s]+$/))) {
        throw new BadRequestError(Messages.validation.invalidString);
    }

    let filtered: ItemRoomData[] = itemsRoomData as ItemRoomData[];

    if (room) filtered = filtered.filter((item) => item.map.roomId === room);
    if (difficulty) filtered = filtered.filter((item) => item.difficultyLevel.includes(difficulty));
    if (type) filtered = filtered.filter((item) => item.type === type);
    if (name)
        filtered = filtered.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));

    return filtered;
};

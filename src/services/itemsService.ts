/**
 * @file Service layer for item-related business logic in the Express API.
 * @description Provides pure functions for querying and filtering item data from
 * {@link itemsRoomData} in `src/data/items.ts`. These functions handle business
 * logic and error conditions, keeping controllers focused on HTTP handling. The
 * data is readonly due to `as const` for immutability and type safety. It is
 * static in-memory data and could be replaced with DB queries in future. Used by
 * controllers for endpoints like `GET /api/items/all` and `GET /api/items/search`.
 * @see {@link ../data/items.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import {
    itemsRoomData,
    ItemRoomData,
    ItemSearchFilters,
    DifficultyLevelEnum,
    ItemTypeEnum,
} from '../data';
import { NotFoundError, BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

/**
 * Retrieves all items from the static in-memory data source.
 *
 * @description Fetches the entire dataset of items stored in {@link itemsRoomData}.
 * The data is readonly due to the `as const` assertion, ensuring immutability and precise
 * type inference for properties like `difficultyLevel` and `type`. Suitable for the
 * `GET /api/items/all` endpoint.
 *
 * @returns {Promise<ItemRoomData[]>} A promise resolving to an array of all item data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/all
 * const items = await getAllItems();
 * // Returns: [{ id: 'selfDefenseJV-keepersRoom', name: 'Battery Pack', ... }, ...]
 * ```
 */
export const getAllItems = async (): Promise<ItemRoomData[]> => itemsRoomData as ItemRoomData[];

/**
 * Retrieves specific items by their unique identifiers.
 *
 * @description Queries {@link itemsRoomData} for items matching the provided IDs. Returns an object with
 * found items and any unrecognized IDs. If no IDs are provided, returns all items. Validates input
 * for a maximum of 100 IDs and format (alphanumeric with hyphens). Uses a Map for O(1) lookups and
 * deduplicates IDs to avoid redundant results. The data is readonly due to `as const`.
 *
 * @param ids - An array of unique item identifiers (e.g., ['selfDefenseJV-keepersRoom']).
 * @returns {Promise<{ foundItems: ItemRoomData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found items and an array of unrecognized IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters (must be alphanumeric with hyphens).
 * @throws {NotFoundError} If no provided IDs match any items.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items?ids=selfDefenseJV-keepersRoom,document-keepersRoom
 * const result = await getItemsByIds(['selfDefenseJV-keepersRoom', 'document-keepersRoom']);
 * // Returns: { foundItems: [{ id: 'selfDefenseJV-keepersRoom', name: 'Battery Pack', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getItemsByIds = async (
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
    const idMap = new Map<string, ItemRoomData>(itemsRoomData.map((item) => [item.id, item])); // Optimized O(1) lookup with Map
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
 * Search filters for items.
 * @typedef {Object} ItemSearchFilters
 * @property {RoomID} [room] - Finds items located in a specific room (e.g., 'keepersRoom').
 * @property {DifficultyLevel} [difficulty] - Finds items by a specific difficulty (e.g., 'JV-lvl-easy').
 * @property {ItemType} [type] - Finds items with a specific item type (e.g., 'SelfDefense').
 * @property {string} [name] - Finds items matching or containing the full or partial item name (case-insensitive).
 */

/**
 * Searches and filters items based on specified criteria.
 *
 * @description Filters {@link itemsRoomData} using optional criteria (room, difficulty, type, name).
 * Returns items matching all provided filters. Name searches are case-insensitive. Suitable for the
 * `GET /api/items/search?room=keepersRoom&type=SelfDefense` endpoint. The data is readonly due
 * to the `as const` assertion, ensuring immutability and type safety for literal values like
 * `difficultyLevel` and `type`.
 *
 * @param {ItemSearchFilters} filters - The criteria to filter items, with optional properties.
 * @returns {Promise<ItemRoomData[]>} A promise resolving to an array of items matching the filters.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/search?room=keepersRoom&difficulty=JV-lvl-easy&type=SelfDefense
 * const results = await searchItems({
 *   room: 'keepersRoom',
 *   difficulty: 'JV-lvl-easy',
 *   type: 'SelfDefense'
 * });
 * // Returns: [{ id: 'selfDefenseJV-keepersRoom', name: 'Battery Pack', ... }, ...]
 * ```
 */
export const searchItems = async ({
    room,
    difficulty,
    type,
    name,
}: ItemSearchFilters): Promise<ItemRoomData[]> => {
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
    if (name && (typeof name !== 'string' || !name.match(/^[a-zA-Z0-9-]+$/))) {
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

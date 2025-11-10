/**
 * @file Client API for items-related endpoints.
 * @description Provides functions to fetch items data from the backend API with caching support.
 * All functions implement Map-based caching with 10-second timeout to reduce redundant requests.
 * Supports both base data (master item definitions) and room data (item instances in rooms).
 */
import { ItemData, ItemRoomData, ItemSearchFilters } from 'src/data';
import { ApiConstants } from 'src/constants';

// Caches for items data to avoid redundant API calls
const itemsDataCache: Map<string, ItemData[]> = new Map();
const itemsRoomDataCache: Map<string, ItemRoomData[]> = new Map();
const itemsRoomDataByIdsCache: Map<
    string,
    { foundItems: ItemRoomData[]; unrecognizedIds: string[] }
> = new Map();

/**
 * Creates a cache key from sorted parameters for consistent caching.
 * @param params - Object containing query parameters.
 * @returns A string cache key.
 */
function createCacheKey(params: Record<string, unknown>): string {
    const sortedKeys = Object.keys(params).sort();
    return sortedKeys.map((key) => `${key}=${params[key]}`).join('&');
}

/**
 * Fetches all items base data from the API.
 * @returns A promise resolving to an array of all items base data.
 * @throws Error if the request fails.
 */
export async function fetchAllItemsData(): Promise<ItemData[]> {
    const cacheKey = 'all';

    // Check cache first
    if (itemsDataCache.has(cacheKey)) {
        return itemsDataCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(`${ApiConstants.API_BASE_URL}/api/items/all`, {
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) throw new Error('Items not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: ItemData[] = await response.json();
        // Cache the response
        itemsDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Fetches items base data by IDs from the API.
 * @param ids - Array of item base data IDs to fetch.
 * @returns A promise resolving to found items and unrecognized IDs.
 * @throws Error if the request fails or IDs are invalid.
 */
export async function fetchItemsDataByIds(
    ids: string[],
): Promise<{ foundItems: ItemData[]; unrecognizedIds: string[] }> {
    if (!ids || ids.length === 0) {
        throw new Error('At least one item ID is required');
    }

    // Validate IDs
    const invalidIds = ids.filter((id) => !/^[a-zA-Z0-9-]+$/.test(id));
    if (invalidIds.length > 0) {
        throw new Error(`Invalid item ID format: ${invalidIds.join(', ')}`);
    }

    const cacheKey = `byIds:${ids.sort().join(',')}`;

    // Check cache first
    if (itemsDataCache.has(cacheKey)) {
        return itemsDataCache.get(cacheKey) as unknown as {
            foundItems: ItemData[];
            unrecognizedIds: string[];
        };
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/items?ids=${encodeURIComponent(ids.join(','))}`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Invalid request. Please check the item IDs.');
            if (response.status === 404) throw new Error('Items not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: { foundItems: ItemData[]; unrecognizedIds: string[] } = await response.json();
        // Cache the response (cast to any to avoid type conflict)
        itemsDataCache.set(cacheKey, data as any);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Fetches all items room data from the API.
 * @returns A promise resolving to an array of all items room data.
 * @throws Error if the request fails.
 */
export async function fetchAllItemsRoomData(): Promise<ItemRoomData[]> {
    const cacheKey = 'all';

    // Check cache first
    if (itemsRoomDataCache.has(cacheKey)) {
        return itemsRoomDataCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(`${ApiConstants.API_BASE_URL}/api/items/rooms/all`, {
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) throw new Error('Items room data not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: ItemRoomData[] = await response.json();
        // Cache the response
        itemsRoomDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Fetches items room data by IDs from the API.
 * @param ids - Array of item room data IDs to fetch.
 * @returns A promise resolving to found items and unrecognized IDs.
 * @throws Error if the request fails or IDs are invalid.
 */
export async function fetchItemsRoomDataByIds(
    ids: string[],
): Promise<{ foundItems: ItemRoomData[]; unrecognizedIds: string[] }> {
    if (!ids || ids.length === 0) {
        throw new Error('At least one item ID is required');
    }

    // Validate IDs
    const invalidIds = ids.filter((id) => !/^[a-zA-Z0-9-]+$/.test(id));
    if (invalidIds.length > 0) {
        throw new Error(`Invalid item ID format: ${invalidIds.join(', ')}`);
    }

    const cacheKey = ids.sort().join(',');

    // Check cache first
    if (itemsRoomDataByIdsCache.has(cacheKey)) {
        return itemsRoomDataByIdsCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/items/rooms?ids=${encodeURIComponent(ids.join(','))}`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Invalid request. Please check the item IDs.');
            if (response.status === 404) throw new Error('Items not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: { foundItems: ItemRoomData[]; unrecognizedIds: string[] } =
            await response.json();
        // Cache the response
        itemsRoomDataByIdsCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Searches items base data using filters.
 * @param filters - Search filters (type, name).
 * @returns A promise resolving to an array of filtered items base data.
 * @throws Error if the request fails.
 */
export async function searchItemsData(filters: {
    type?: string;
    name?: string;
}): Promise<ItemData[]> {
    const cacheKey = createCacheKey(filters as Record<string, unknown>);

    // Check cache first
    if (itemsDataCache.has(cacheKey)) {
        return itemsDataCache.get(cacheKey)!;
    }

    // Build query string
    const queryParams = new URLSearchParams();
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.name) queryParams.append('name', filters.name);

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/items/search?${queryParams.toString()}`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Invalid request. Please check the search filters.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: ItemData[] = await response.json();
        // Cache the response
        itemsDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Searches items room data using filters.
 * @param filters - Search filters (room, difficulty, type, name).
 * @returns A promise resolving to an array of filtered items room data.
 * @throws Error if the request fails.
 */
export async function searchItemsRoomData(filters: ItemSearchFilters): Promise<ItemRoomData[]> {
    const cacheKey = createCacheKey(filters as Record<string, unknown>);

    // Check cache first
    if (itemsRoomDataCache.has(cacheKey)) {
        return itemsRoomDataCache.get(cacheKey)!;
    }

    // Build query string
    const queryParams = new URLSearchParams();
    if (filters.room) queryParams.append('room', filters.room);
    if (filters.difficulty) queryParams.append('difficulty', filters.difficulty);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.name) queryParams.append('name', filters.name);

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/items/rooms/search?${queryParams.toString()}`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Invalid request. Please check the search filters.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: ItemRoomData[] = await response.json();
        // Cache the response
        itemsRoomDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

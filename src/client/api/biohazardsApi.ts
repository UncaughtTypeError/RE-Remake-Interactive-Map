/**
 * @file Client API for biohazards-related endpoints.
 * @description Provides functions to fetch biohazards data from the backend API with caching support.
 * All functions implement Map-based caching with 10-second timeout to reduce redundant requests.
 * Supports both base data (master biohazard definitions) and room data (biohazard instances in rooms).
 */
import { BiohazardData, BiohazardDetailsData, BiohazardSearchFilters } from 'src/data';
import { ApiConstants } from 'src/constants';

// Caches for biohazards data to avoid redundant API calls
const biohazardsDataCache: Map<string, BiohazardData[]> = new Map();
const biohazardsRoomDataCache: Map<string, BiohazardDetailsData[]> = new Map();
const biohazardsRoomDataByIdsCache: Map<
    string,
    { foundBiohazards: BiohazardDetailsData[]; unrecognizedIds: string[] }
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
 * Fetches all biohazards base data from the API.
 * @returns A promise resolving to an array of all biohazards base data.
 * @throws Error if the request fails.
 */
export async function fetchAllBiohazardsData(): Promise<BiohazardData[]> {
    const cacheKey = 'all';

    // Check cache first
    if (biohazardsDataCache.has(cacheKey)) {
        return biohazardsDataCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(`${ApiConstants.API_BASE_URL}/api/biohazards/all`, {
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) throw new Error('Biohazards not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: BiohazardData[] = await response.json();
        // Cache the response
        biohazardsDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Fetches biohazards base data by IDs from the API.
 * @param ids - Array of biohazard base data IDs to fetch.
 * @returns A promise resolving to found biohazards and unrecognized IDs.
 * @throws Error if the request fails or IDs are invalid.
 */
export async function fetchBiohazardsDataByIds(
    ids: string[],
): Promise<{ foundBiohazards: BiohazardData[]; unrecognizedIds: string[] }> {
    if (!ids || ids.length === 0) {
        throw new Error('At least one biohazard ID is required');
    }

    // Validate IDs
    const invalidIds = ids.filter((id) => !/^[a-zA-Z0-9-]+$/.test(id));
    if (invalidIds.length > 0) {
        throw new Error(`Invalid biohazard ID format: ${invalidIds.join(', ')}`);
    }

    const cacheKey = `byIds:${ids.sort().join(',')}`;

    // Check cache first
    if (biohazardsDataCache.has(cacheKey)) {
        return biohazardsDataCache.get(cacheKey) as unknown as {
            foundBiohazards: BiohazardData[];
            unrecognizedIds: string[];
        };
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/biohazards?ids=${encodeURIComponent(ids.join(','))}`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Invalid request. Please check the biohazard IDs.');
            if (response.status === 404) throw new Error('Biohazards not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: { foundBiohazards: BiohazardData[]; unrecognizedIds: string[] } =
            await response.json();
        // Cache the response (cast to any to avoid type conflict)
        biohazardsDataCache.set(cacheKey, data as any);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Fetches all biohazards room data from the API.
 * @returns A promise resolving to an array of all biohazards room data with S.T.A.R.S. rankings.
 * @throws Error if the request fails.
 */
export async function fetchAllBiohazardsRoomData(): Promise<BiohazardDetailsData[]> {
    const cacheKey = 'all';

    // Check cache first
    if (biohazardsRoomDataCache.has(cacheKey)) {
        return biohazardsRoomDataCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(`${ApiConstants.API_BASE_URL}/api/biohazards/rooms/all`, {
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) throw new Error('Biohazards room data not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: BiohazardDetailsData[] = await response.json();
        // Cache the response
        biohazardsRoomDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Fetches biohazards room data by IDs from the API.
 * @param ids - Array of biohazard room data IDs to fetch.
 * @returns A promise resolving to found biohazards with rankings and unrecognized IDs.
 * @throws Error if the request fails or IDs are invalid.
 */
export async function fetchBiohazardsRoomDataByIds(
    ids: string[],
): Promise<{ foundBiohazards: BiohazardDetailsData[]; unrecognizedIds: string[] }> {
    if (!ids || ids.length === 0) {
        throw new Error('At least one biohazard ID is required');
    }

    // Validate IDs
    const invalidIds = ids.filter((id) => !/^[a-zA-Z0-9-]+$/.test(id));
    if (invalidIds.length > 0) {
        throw new Error(`Invalid biohazard ID format: ${invalidIds.join(', ')}`);
    }

    const cacheKey = ids.sort().join(',');

    // Check cache first
    if (biohazardsRoomDataByIdsCache.has(cacheKey)) {
        return biohazardsRoomDataByIdsCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/biohazards/rooms?ids=${encodeURIComponent(ids.join(','))}`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Invalid request. Please check the biohazard IDs.');
            if (response.status === 404) throw new Error('Biohazards not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: { foundBiohazards: BiohazardDetailsData[]; unrecognizedIds: string[] } =
            await response.json();
        // Cache the response
        biohazardsRoomDataByIdsCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Searches biohazards base data using filters.
 * @param filters - Search filters (code, name).
 * @returns A promise resolving to an array of filtered biohazards base data.
 * @throws Error if the request fails.
 */
export async function searchBiohazardsData(
    filters: BiohazardSearchFilters,
): Promise<BiohazardData[]> {
    const cacheKey = createCacheKey(filters as Record<string, unknown>);

    // Check cache first
    if (biohazardsDataCache.has(cacheKey)) {
        return biohazardsDataCache.get(cacheKey)!;
    }

    // Build query string
    const queryParams = new URLSearchParams();
    if (filters.code) queryParams.append('code', filters.code);
    if (filters.name) queryParams.append('name', filters.name);

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/biohazards/search?${queryParams.toString()}`,
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

        const data: BiohazardData[] = await response.json();
        // Cache the response
        biohazardsDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Searches biohazards room data using filters.
 * @param filters - Search filters (room, difficulty, code, name).
 * @returns A promise resolving to an array of filtered biohazards room data with rankings.
 * @throws Error if the request fails.
 */
export async function searchBiohazardsRoomData(
    filters: BiohazardSearchFilters,
): Promise<BiohazardDetailsData[]> {
    const cacheKey = createCacheKey(filters as Record<string, unknown>);

    // Check cache first
    if (biohazardsRoomDataCache.has(cacheKey)) {
        return biohazardsRoomDataCache.get(cacheKey)!;
    }

    // Build query string
    const queryParams = new URLSearchParams();
    if (filters.room) queryParams.append('room', filters.room);
    if (filters.difficulty) queryParams.append('difficulty', filters.difficulty);
    if (filters.code) queryParams.append('code', filters.code);
    if (filters.name) queryParams.append('name', filters.name);

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/biohazards/rooms/search?${queryParams.toString()}`,
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

        const data: BiohazardDetailsData[] = await response.json();
        // Cache the response
        biohazardsRoomDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

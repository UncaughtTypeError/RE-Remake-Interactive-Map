/**
 * @file Client API for maps-related endpoints.
 * @description Provides functions to fetch maps and rooms data from the backend API with caching support.
 */
import { RoomData } from 'src/data';
import { ApiConstants } from 'src/constants';

// Cache for rooms data to avoid redundant API calls
const roomsDataCache: Map<string, RoomData[]> = new Map();

/**
 * Fetches all rooms data from the API.
 * @returns A promise resolving to an array of all rooms data.
 * @throws Error if the request fails.
 */
export async function fetchAllRooms(): Promise<RoomData[]> {
    const cacheKey = 'all';

    // Check cache first
    if (roomsDataCache.has(cacheKey)) {
        return roomsDataCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(`${ApiConstants.API_BASE_URL}/api/maps/rooms/all`, {
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) throw new Error('Rooms data not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: RoomData[] = await response.json();
        // Cache the response
        roomsDataCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

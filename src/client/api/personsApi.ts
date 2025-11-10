/**
 * @file Client API for persons-related endpoints.
 * @description Provides functions to fetch persons data from the backend API with caching support.
 * All functions implement Map-based caching with 10-second timeout to reduce redundant requests.
 */
import { PersonData } from 'src/data';
import { ApiConstants } from 'src/constants';

// Cache for persons data to avoid redundant API calls
const personsDataCache: Map<string, PersonData[]> = new Map();

/**
 * Fetches all persons base data from the API.
 * @returns A promise resolving to an array of all persons base data.
 * @throws Error if the request fails.
 */
export async function fetchAllPersonsData(): Promise<PersonData[]> {
    const cacheKey = 'all';

    // Check cache first
    if (personsDataCache.has(cacheKey)) {
        return personsDataCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(`${ApiConstants.API_BASE_URL}/api/persons/all`, {
            signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch persons data: ${response.statusText}`);
        }

        const data: PersonData[] = await response.json();

        // Cache the result with 10-second timeout
        personsDataCache.set(cacheKey, data);
        setTimeout(() => personsDataCache.delete(cacheKey), 10000);

        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout: Failed to fetch persons data');
        }
        throw error;
    }
}

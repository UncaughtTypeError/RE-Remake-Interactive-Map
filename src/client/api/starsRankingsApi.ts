/**
 * @file Client API for S.T.A.R.S. rankings-related endpoints.
 * @description Provides functions to fetch S.T.A.R.S. rankings data from the backend API with caching support.
 * All functions implement Map-based caching with 10-second timeout to reduce redundant requests.
 */
import { STARSRankingData, BiohazardSTARSRankingByCode } from 'src/data';
import { ApiConstants } from 'src/constants';

// Caches for S.T.A.R.S. rankings data to avoid redundant API calls
const starsRankingsCache: Map<string, STARSRankingData[]> = new Map();
const starsRankingsByCodesCache: Map<
    string,
    { foundRankings: BiohazardSTARSRankingByCode[]; unrecognizedCodes: string[] }
> = new Map();

/**
 * Fetches all S.T.A.R.S. rankings from the API.
 * @returns A promise resolving to an array of all S.T.A.R.S. rankings.
 * @throws Error if the request fails.
 */
export async function fetchAllSTARSRankings(): Promise<STARSRankingData[]> {
    const cacheKey = 'all';

    // Check cache first
    if (starsRankingsCache.has(cacheKey)) {
        return starsRankingsCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/biohazards/stars-rankings/all`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) throw new Error('S.T.A.R.S. rankings not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: STARSRankingData[] = await response.json();
        // Cache the response
        starsRankingsCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

/**
 * Fetches S.T.A.R.S. rankings by biohazard codes from the API.
 * @param codes - Array of biohazard codes to fetch rankings for (e.g., ['Zb', 'Cr']).
 * @returns A promise resolving to found rankings and unrecognized codes.
 * @throws Error if the request fails or codes are invalid.
 */
export async function fetchSTARSRankingsByCodes(
    codes: string[],
): Promise<{ foundRankings: BiohazardSTARSRankingByCode[]; unrecognizedCodes: string[] }> {
    if (!codes || codes.length === 0) {
        throw new Error('At least one biohazard code is required');
    }

    // Validate codes
    const invalidCodes = codes.filter((code) => !/^[a-zA-Z0-9-]+$/.test(code));
    if (invalidCodes.length > 0) {
        throw new Error(`Invalid biohazard code format: ${invalidCodes.join(', ')}`);
    }

    const cacheKey = codes.sort().join(',');

    // Check cache first
    if (starsRankingsByCodesCache.has(cacheKey)) {
        return starsRankingsByCodesCache.get(cacheKey)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/biohazards/stars-rankings?codes=${encodeURIComponent(codes.join(','))}`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Invalid request. Please check the biohazard codes.');
            if (response.status === 404) throw new Error('Rankings not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: { foundRankings: BiohazardSTARSRankingByCode[]; unrecognizedCodes: string[] } =
            await response.json();
        // Cache the response
        starsRankingsByCodesCache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

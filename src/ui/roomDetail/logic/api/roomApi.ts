import { RoomResponse } from 'roomDetail/types/types';
import { ApiConstants } from 'src/constants';

// Cache for room data to avoid redundant API calls
const roomCache: Map<string, RoomResponse> = new Map();

/**
 * Validates a room ID against the expected format.
 * @param roomId - The room ID to validate.
 * @returns True if valid, false otherwise.
 */
function isValidRoomId(roomId: string): boolean {
    return typeof roomId === 'string' && /^[a-zA-Z0-9-]+$/.test(roomId);
}

/**
 * Fetches room data by ID from the API.
 * @param roomId - The room ID to fetch.
 * @returns A promise resolving to the room data.
 * @throws Error if the request fails or the ID is invalid.
 */
export async function fetchRoomData(roomId: string): Promise<RoomResponse> {
    if (!isValidRoomId(roomId)) {
        throw new Error('Invalid room ID format');
    }

    // Check cache first
    if (roomCache.has(roomId)) {
        console.log({ roomCache });
        return roomCache.get(roomId)!;
    }

    // Abort request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
        const response = await fetch(
            `${ApiConstants.API_BASE_URL}/api/maps/rooms?ids=${encodeURIComponent(roomId)}`,
            {
                signal: controller.signal,
            },
        );
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Invalid request. Please check the room ID.');
            if (response.status === 404) throw new Error('Room not found.');
            throw new Error(`Server error: ${response.status}`);
        }

        const data: RoomResponse = await response.json();
        // Cache the response
        roomCache.set(roomId, data);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        throw error;
    }
}

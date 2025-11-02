import { RoomDetailsData } from 'src/data';
import { RoomResponse } from 'roomDetail/types/types';

/**
 * Handles error cases and updates the container if there's an issue.
 * @param container - The container to update with error message.
 * @param data - The room data to check.
 * @returns True if an error was handled, false otherwise.
 */
export function handleError(
    container: HTMLElement,
    response: { data?: RoomResponse; message?: string },
): boolean {
    const { data = null, message = null } = response;

    if ((data?.unrecognizedIds?.length ?? 0) > 0) {
        container.innerHTML = '<span class="error" role="alert">Room not found.</span>';
        return true;
    }
    if (!data?.foundRooms[0]) {
        container.innerHTML = '<span class="error" role="alert">No room data available.</span>';
        return true;
    }
    // Error is implicit
    if (message) {
        container.innerHTML = `<span class="error" role="alert">${message}</span>`;
        return true;
    }
    return false;
}

/**
 * Resets UI elements, clears content, and sets initial states for the room.
 * @param room - The room data.
 */
export function resetUI(room: RoomDetailsData) {
    document.querySelectorAll('.icon-info-wrapper').forEach((el) => el.remove());

    document.querySelectorAll('.room-detail-list .list-group-item').forEach((el) => el.remove());
    document.querySelectorAll('.room-detail-grid .grid-group-item').forEach((el) => el.remove());
}

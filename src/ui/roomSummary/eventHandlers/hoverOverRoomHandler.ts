import { getState } from 'src/state/globalState';
import { renderRoomSummary } from 'roomSummary/orchestrator/orchestrator';
import { animateGears } from 'shared/renderers/gearsAnimatorRenderer';
import { fetchRoomData } from 'client/api/roomApi';
import { RoomResponse } from 'client/types/api';

/**
 * Handles mouseover on room elements.
 * Adds or removes icon pin active classes on room hover.
 * Fetches room data from API and renders the room summary panel.
 * @param element - The element.
 * @param event - The event (unused here).
 */
export async function handleMouseOverRoom(
    element: HTMLElement,
    event: Event | MouseEvent,
): Promise<void> {
    const currentRoomId = getState('roomId');
    const hoverRoomId = element.dataset.room;

    if (hoverRoomId === currentRoomId || !hoverRoomId) return;

    document
        .querySelectorAll(`.room:not([data-room="${currentRoomId}"]) .icon-pin`)
        .forEach((icon) => {
            icon.classList.remove('map-marker-active');
            icon.classList.add('map-marker-inactive');
        });

    element.querySelectorAll('.icon-pin').forEach((icon) => {
        icon.classList.remove('map-marker-inactive');
        icon.classList.add('map-marker-active');
    });

    animateGears(200);

    // Fetch room data from API
    try {
        const data: RoomResponse = await fetchRoomData(hoverRoomId);
        const roomData = data.foundRooms[0];

        if (roomData) {
            // Get current difficulty for filtering
            const difficulty = getState('difficulty');
            // Render room summary with API data
            renderRoomSummary(roomData, difficulty);
        }
    } catch (error) {
        console.error('Failed to fetch room data for summary:', error);
        // Silently fail for hover - don't show error to user
    }
}

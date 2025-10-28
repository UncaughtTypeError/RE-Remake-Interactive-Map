import { setState, getState, GlobalState } from 'src/state/globalState';

import { fetchRoomData } from 'roomDetail/logic/api/roomApi';
import { RoomResponse } from 'roomDetail/types/types';
import { renderRoomData } from 'roomDetail/orchestrator/orchestrator';
import { blankRoomData } from 'roomDetail/logic/api/fallbackData';
import { animateGears, stopGearsAnimation } from 'shared/renderers/gearsAnimatorRenderer';

/**
 * Manages loading state for the UI.
 * @param container - The container to update.
 * @param isLoading - Whether to show the loading state.
 */
function setLoadingState(container: HTMLElement, isLoading: boolean): void {
    container.setAttribute('aria-busy', isLoading.toString());
    if (isLoading) {
        animateGears(1000);
    } else {
        stopGearsAnimation();
    }
}

/**
 * Handles click events on room elements, fetching data and rendering room details.
 * @param element - The clicked element.
 * @param event - The event.
 */
export async function handleOpenRoomDetail(element: HTMLElement, event: Event): Promise<void> {
    const roomId = element.dataset.room;
    const container = document.querySelector('.room-detail-wrapper') as HTMLElement | null;

    if (!container || !roomId) {
        console.error('Missing container or room ID');
        return;
    }

    setLoadingState(container, true);

    try {
        const data: RoomResponse = await fetchRoomData(roomId);
        setState('roomData', data.foundRooms[0] as GlobalState['roomData']);

        setLoadingState(container, false);
    } catch (error) {
        setState('roomData', blankRoomData as GlobalState['roomData']);
        setLoadingState(container, false);
    }

    // Render room initially with current difficulty
    // After which any difficulty changes will re-render via subscription
    const difficulty = getState('difficulty');

    renderRoomData(difficulty);
}

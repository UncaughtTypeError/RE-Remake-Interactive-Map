import { setState } from 'src/state/globalState';

import { animateGears } from 'shared/renderers/gearsAnimatorRenderer';

/**
 * Handles click on room detail close button, toggling UI to inactive and animating gears.
 * @param element - The clicked element (unused, for consistency with registry).
 * @param event - The event (unused, for consistency).
 */
export async function handleCloseRoomDetail(element: HTMLElement, event: Event): Promise<void> {
    // Remove toggle-state from all rooms
    document.querySelectorAll('.room').forEach((el) => el.classList.remove('toggle-state'));

    // Toggle to inactive on detail wrappers
    const roomDetailWrapper = document.querySelector('.room-detail-wrapper') as HTMLElement | null;
    if (roomDetailWrapper) {
        roomDetailWrapper.classList.remove('room-detail-active');
        roomDetailWrapper.classList.add('room-detail-inactive');
    }

    document.querySelectorAll('.difficulty-tag').forEach((el) => {
        el.classList.remove('room-detail-active');
        el.classList.add('room-detail-inactive');
    });

    const roomInfoWrapper = document.querySelector('.room-summary-wrapper') as HTMLElement | null;
    if (roomInfoWrapper) {
        roomInfoWrapper.classList.remove('room-detail-active');
        roomInfoWrapper.classList.add('room-detail-inactive');
    }

    animateGears(500);

    setState('roomId', 'unknown');
    setState('roomDetailActive', false);
}

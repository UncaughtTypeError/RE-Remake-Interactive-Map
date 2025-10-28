import { getState } from 'src/state/globalState';

/**
 * Handles hover on room elements.
 * Adds or removes icon pin active classes on room hover.
 * @param element - The element.
 * @param event - The event (unused here).
 */
export function handleMouseOverRoom(element: HTMLElement, event: Event | MouseEvent): void {
    const roomId = getState('roomId');
    if (element.dataset.room === roomId) return;

    document.querySelectorAll(`.room:not([data-room="${roomId}"]) .icon-pin`).forEach((icon) => {
        icon.classList.remove('map-marker-active');
        icon.classList.add('map-marker-inactive');
    });

    element.querySelectorAll('.icon-pin').forEach((icon) => {
        icon.classList.remove('map-marker-inactive');
        icon.classList.add('map-marker-active');
    });
}

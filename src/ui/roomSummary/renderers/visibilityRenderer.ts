/**
 * @file Visibility renderer for room summary component.
 * @description Handles showing and hiding the room summary panel.
 */

/**
 * Shows the room summary panel by adding active class.
 */
export function showRoomSummary(): void {
    const wrapper = document.querySelector('.room-summary-wrapper');
    if (!wrapper) return;

    wrapper.classList.remove('room-info-inactive');
    wrapper.classList.add('room-info-active');
}

/**
 * Hides the room summary panel by adding inactive class.
 */
export function hideRoomSummary(): void {
    const wrapper = document.querySelector('.room-summary-wrapper');
    if (!wrapper) return;

    wrapper.classList.remove('room-info-active');
    wrapper.classList.add('room-info-inactive');
}

/**
 * Resets all room icons to inactive state.
 * Excludes shadow icons which should remain static.
 */
export function resetRoomIcons(): void {
    document.querySelectorAll('.inactive-icon-wrapper .room-info-icon').forEach((icon) => {
        icon.classList.remove('room-icon-active');
        icon.classList.add('room-icon-inactive');
    });
}

/**
 * Clears all active icon wrappers.
 */
export function clearActiveIcons(): void {
    document.querySelectorAll('.active-icon-wrapper').forEach((wrapper) => {
        wrapper.innerHTML = '';
    });
}

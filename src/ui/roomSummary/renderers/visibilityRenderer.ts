/**
 * @file Visibility renderer for room summary component.
 * @description Handles showing and hiding the room summary panel.
 */

/**
 * Shows the room summary panel by adding active class.
 */
export function showRoomSummary(): void {
    const wrapper = document.querySelector('.room-info-wrapper');
    if (!wrapper) return;

    wrapper.classList.remove('room-info-inactive');
    wrapper.classList.add('room-info-active');
}

/**
 * Hides the room summary panel by adding inactive class.
 */
export function hideRoomSummary(): void {
    const wrapper = document.querySelector('.room-info-wrapper');
    if (!wrapper) return;

    wrapper.classList.remove('room-info-active');
    wrapper.classList.add('room-info-inactive');
}

/**
 * Resets all room icons to inactive state.
 */
export function resetRoomIcons(): void {
    document.querySelectorAll('.room-info-icon').forEach((icon) => {
        icon.classList.remove('room-icon-active');
        icon.classList.add('room-icon-inactive');
    });

    document.querySelectorAll('.biohazard-room-icons').forEach((icon) => {
        icon.classList.remove('biohazard-icons-active');
        icon.classList.add('biohazard-icons-inactive');
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

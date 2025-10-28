/**
 * Toggles the active state on room elements and their icon pins.
 * Removes active classes from all rooms and applies them to the selected element.
 * @param roomId - The room Id for the element to activate.
 */
export function toggleRoomState(roomId: string): void {
    const roomElement = document.querySelector(`.room[data-room="${roomId}"]`) as HTMLElement;
    document.querySelectorAll('.room').forEach((el) => el.classList.remove('toggle-state'));
    roomElement.classList.add('toggle-state');

    document.querySelectorAll('.room').forEach((el) => {
        el.querySelectorAll('.icon-pin').forEach((icon) => {
            icon.classList.remove('map-marker-active');
            icon.classList.add('map-marker-inactive');
        });
    });
    roomElement.querySelectorAll('.icon-pin').forEach((icon) => {
        icon.classList.remove('map-marker-inactive');
        icon.classList.add('map-marker-active');
    });
}

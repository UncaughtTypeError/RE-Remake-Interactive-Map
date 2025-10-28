import { RoomDetailsData } from 'src/data';

/**
 * Activates room functions by toggling classes.
 * @param room - The room data.
 */
export function activateRoomFunctions(room: RoomDetailsData) {
    document.querySelectorAll('.room-function').forEach((element) => {
        element.classList.remove('function-active');
        element.classList.add('function-inactive');
    });
    room.overview.functions.forEach((func) => {
        if (func) {
            document.querySelectorAll(`[data-function-id="${func}"]`).forEach((element) => {
                element.classList.remove('function-inactive');
                element.classList.add('function-active');
            });
        }
    });
}

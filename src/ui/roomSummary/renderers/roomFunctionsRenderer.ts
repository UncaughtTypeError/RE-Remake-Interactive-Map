/**
 * @file Room functions renderer for room summary component.
 * @description Renders room function markers (puzzle room, safe room, etc.) from API data.
 */

import { RoomDetailsData } from 'src/data/types';

/**
 * Activates room function markers based on API room data.
 * @param room - The room data.
 */
export function activateRoomFunctions(room: RoomDetailsData): void {
    // Reset all room functions to inactive
    document.querySelectorAll('.room-summary-wrapper .room-function').forEach((element) => {
        element.classList.remove('function-active');
        element.classList.add('function-inactive');
    });

    // Activate functions based on room data
    room.overview.functions.forEach((func) => {
        if (func) {
            document
                .querySelectorAll(`.room-summary-wrapper [data-function-id="${func}"]`)
                .forEach((element) => {
                    element.classList.remove('function-inactive');
                    element.classList.add('function-active');
                });
        }
    });
}

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
    const roomFunctions = document.querySelectorAll<HTMLElement>(
        '.room-info-wrapper .room-function',
    );

    // First, reset all room functions to inactive
    roomFunctions.forEach((func) => {
        func.classList.remove('function-active');
        func.classList.add('function-inactive');
    });

    // Get functions from API data
    const functions = room.overview.functions;
    if (!functions || functions.length === 0) return;

    // Convert function IDs to match CSS class names (e.g., "puzzleRoom" -> "puzzle-room")
    const functionClassNames = functions.map((func) =>
        func.replace(/([A-Z])/g, '-$1').toLowerCase(),
    );

    // Activate matching function markers
    functionClassNames.forEach((className) => {
        roomFunctions.forEach((func) => {
            // Check if function element has matching data-function-id or class
            const functionId = func.getAttribute('data-function-id');
            if (
                func.classList.contains(className) ||
                (functionId && functionId.toLowerCase() === className)
            ) {
                func.classList.remove('function-inactive');
                func.classList.add('function-active');
            }
        });
    });
}

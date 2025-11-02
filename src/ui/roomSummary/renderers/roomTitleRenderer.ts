/**
 * @file Room title renderer for room summary component.
 * @description Renders the room title from API room data.
 */

import { RoomDetailsData } from 'src/data/types';

/**
 * Sets the room title in the summary panel.
 * @param room - The room data.
 */
export function setRoomTitle(room: RoomDetailsData): void {
    const roomTitleEl = document.querySelector('.room-info-wrapper .room-title');
    if (!roomTitleEl) return;

    // Use room name from API data
    roomTitleEl.textContent = room.name;
}

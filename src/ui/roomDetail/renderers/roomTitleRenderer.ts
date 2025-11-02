/**
 * @file Room title renderer for room detail component.
 * @description Sets the room title in the detail panel.
 */

import { RoomDetailsData } from 'src/data';

/**
 * Sets the room title in the room detail panel.
 * @param room - The room data containing the name.
 */
export function setRoomTitle(room: RoomDetailsData): void {
    const roomDetailTitle = document.querySelector('.room-detail-title') as HTMLElement | null;
    if (roomDetailTitle) {
        roomDetailTitle.textContent = room.name;
    }
}

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
    const roomSummaryTitle = document.querySelector('.room-summary-title') as HTMLElement | null;
    if (roomSummaryTitle) {
        roomSummaryTitle.textContent = room.name;
    }
}

/**
 * @file Presenter for icon marker tags in room tabs.
 * @description Creates DOM elements for room tab icon markers that show item/biohazard counts.
 */
import { RoomTabData } from '../processors/roomTabsProcessor';

/**
 * Creates an icon marker tag element for items in a room tab.
 * @param roomTab - The room tab data.
 * @returns The created icon marker tag element, or null if no items.
 */
export function createItemIconMarkerTag(roomTab: RoomTabData): HTMLElement | null {
    if (!roomTab.hasItems) return null;

    const tag = document.createElement('div');
    tag.className = 'icon-marker-tag items';
    tag.dataset.roomId = roomTab.roomId;
    tag.dataset.count = roomTab.itemCount.toString();
    tag.textContent = roomTab.itemCount.toString();

    return tag;
}

/**
 * Creates an icon marker tag element for biohazards in a room tab.
 * @param roomTab - The room tab data.
 * @returns The created icon marker tag element, or null if no biohazards.
 */
export function createBiohazardIconMarkerTag(roomTab: RoomTabData): HTMLElement | null {
    if (!roomTab.hasBiohazards) return null;

    const tag = document.createElement('div');
    tag.className = 'icon-marker-tag biohazards';
    tag.dataset.roomId = roomTab.roomId;
    tag.dataset.count = roomTab.biohazardCount.toString();
    tag.textContent = roomTab.biohazardCount.toString();

    return tag;
}

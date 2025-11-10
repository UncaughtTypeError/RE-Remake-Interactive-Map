/**
 * @file Renderer for room tabs in the keymenu.
 * @description Renders room tabs with icon marker tags dynamically from API data
 * instead of cloning from the hard-coded map. Fetches items and biohazards room data,
 * processes it, and creates icon markers for each room.
 */
import { fetchAllItemsRoomData } from 'src/client/api/itemsApi';
import { fetchAllBiohazardsRoomData } from 'src/client/api/biohazardsApi';
import { processRoomTabsData } from '../processors/roomTabsProcessor';
import {
    createItemIconMarkerTag,
    createBiohazardIconMarkerTag,
} from '../presenters/iconMarkerTagPresenter';
import { DifficultyLevel } from 'src/data';
import { getState } from '../../../state/globalState';

/**
 * Renders room tabs for items keymenu by fetching and processing room data.
 * Creates icon marker tags dynamically for each room that has items.
 * @param containerSelector - The CSS selector for the items room tabs container.
 * @param difficulty - The current difficulty level to filter by.
 * @returns Promise that resolves when rendering is complete.
 * @throws Error if the container is not found or API call fails.
 */
export async function renderItemsRoomTabs(
    containerSelector: string,
    difficulty: DifficultyLevel,
): Promise<void> {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error(`Items room tabs container not found: ${containerSelector}`);
    }

    // Clear existing content
    container.innerHTML = '';

    try {
        // Fetch data from API
        const itemsRoomData = await fetchAllItemsRoomData();
        const biohazardsRoomData = await fetchAllBiohazardsRoomData();

        // Process data
        const roomTabsMap = processRoomTabsData(itemsRoomData, biohazardsRoomData, difficulty);

        // Create and append icon markers for each room (items only)
        roomTabsMap.forEach((roomTab) => {
            const iconMarker = createItemIconMarkerTag(roomTab);
            if (iconMarker) {
                container.appendChild(iconMarker);
            }
        });
    } catch (error) {
        console.error('Failed to render items room tabs:', error);
        throw error;
    }
}

/**
 * Renders room tabs for biohazards keymenu by fetching and processing room data.
 * Creates icon marker tags dynamically for each room that has biohazards.
 * @param containerSelector - The CSS selector for the biohazards room tabs container.
 * @param difficulty - The current difficulty level to filter by.
 * @returns Promise that resolves when rendering is complete.
 * @throws Error if the container is not found or API call fails.
 */
export async function renderBiohazardsRoomTabs(
    containerSelector: string,
    difficulty: DifficultyLevel,
): Promise<void> {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error(`Biohazards room tabs container not found: ${containerSelector}`);
    }

    // Clear existing content
    container.innerHTML = '';

    try {
        // Fetch data from API
        const itemsRoomData = await fetchAllItemsRoomData();
        const biohazardsRoomData = await fetchAllBiohazardsRoomData();

        // Process data
        const roomTabsMap = processRoomTabsData(itemsRoomData, biohazardsRoomData, difficulty);

        // Create and append icon markers for each room (biohazards only)
        roomTabsMap.forEach((roomTab) => {
            const iconMarker = createBiohazardIconMarkerTag(roomTab);
            if (iconMarker) {
                container.appendChild(iconMarker);
            }
        });
    } catch (error) {
        console.error('Failed to render biohazards room tabs:', error);
        throw error;
    }
}

/**
 * Renders both items and biohazards room tabs.
 * Convenience function that calls both render functions with the current difficulty.
 * @returns Promise that resolves when both room tabs are rendered.
 */
export async function renderRoomTabs(): Promise<void> {
    const difficulty = getState('difficulty');

    await Promise.all([
        renderItemsRoomTabs('.items #tab-rooms', difficulty),
        renderBiohazardsRoomTabs('.biohazards #tab-rooms', difficulty),
    ]);
}

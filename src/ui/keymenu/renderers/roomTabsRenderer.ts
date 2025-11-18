/**
 * @file Renderer for room tabs in the keymenu.
 * @description Renders room tabs with icon marker tags dynamically from API data
 * instead of cloning from the hard-coded map. Fetches items and biohazards room data,
 * processes it, and creates icon markers for each room.
 */
import { fetchAllItemsRoomData } from 'src/client/api/itemsApi';
import { fetchAllBiohazardsRoomData } from 'src/client/api/biohazardsApi';
import { fetchAllRooms } from 'src/client/api/mapsApi';
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
 * @param difficulty - The difficulty level to filter items by.
 * @returns Promise that resolves when rendering is complete.
 * @throws Error if the container is not found or API call fails.
 */
export async function renderItemsRoomTabs(containerSelector: string, difficulty: DifficultyLevel): Promise<void> {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error(`Items room tabs container not found: ${containerSelector}`);
    }

    // Clear existing content
    container.innerHTML = '';

    try {
        // Fetch data from API
        const [itemsRoomData, biohazardsRoomData, roomsData] = await Promise.all([
            fetchAllItemsRoomData(),
            fetchAllBiohazardsRoomData(),
            fetchAllRooms(),
        ]);

        // Process data - groups items/biohazards by type within each room
        const roomTabsMap = processRoomTabsData(itemsRoomData, biohazardsRoomData, roomsData, difficulty);

        // Create and append icon markers for ALL rooms (sorted by room number)
        const sortedRooms = Array.from(roomTabsMap.values()).sort((a, b) => {
            if (a.roomNumber === null) return 1;
            if (b.roomNumber === null) return -1;
            return a.roomNumber - b.roomNumber;
        });

        sortedRooms.forEach((roomTab) => {
            const iconMarker = createItemIconMarkerTag(roomTab, difficulty);
            container.appendChild(iconMarker);
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
 * @param difficulty - The difficulty level to filter biohazards by.
 * @returns Promise that resolves when rendering is complete.
 * @throws Error if the container is not found or API call fails.
 */
export async function renderBiohazardsRoomTabs(containerSelector: string, difficulty: DifficultyLevel): Promise<void> {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error(`Biohazards room tabs container not found: ${containerSelector}`);
    }

    // Clear existing content
    container.innerHTML = '';

    try {
        // Fetch data from API
        const [itemsRoomData, biohazardsRoomData, roomsData] = await Promise.all([
            fetchAllItemsRoomData(),
            fetchAllBiohazardsRoomData(),
            fetchAllRooms(),
        ]);

        // Process data - groups items/biohazards by type within each room
        const roomTabsMap = processRoomTabsData(itemsRoomData, biohazardsRoomData, roomsData, difficulty);

        // Create and append icon markers for ALL rooms (sorted by room number)
        const sortedRooms = Array.from(roomTabsMap.values()).sort((a, b) => {
            if (a.roomNumber === null) return 1;
            if (b.roomNumber === null) return -1;
            return a.roomNumber - b.roomNumber;
        });

        sortedRooms.forEach((roomTab) => {
            const iconMarker = createBiohazardIconMarkerTag(roomTab);
            container.appendChild(iconMarker);
        });
    } catch (error) {
        console.error('Failed to render biohazards room tabs:', error);
        throw error;
    }
}

/**
 * Renders both items and biohazards room tabs.
 * Convenience function that calls both render functions.
 * @param difficulty - The difficulty level to filter by. If not provided, gets from global state.
 * @returns Promise that resolves when both room tabs are rendered.
 */
export async function renderRoomTabs(difficulty?: DifficultyLevel): Promise<void> {
    const difficultyLevel = difficulty ?? getState('difficulty');
    await Promise.all([
        renderItemsRoomTabs('.items #tab-rooms', difficultyLevel),
        renderBiohazardsRoomTabs('.biohazards #tab-rooms', difficultyLevel),
    ]);
}

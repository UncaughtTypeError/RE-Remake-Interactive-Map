/**
 * @file Processor for room tabs data in the keymenu.
 * @description Transforms items room data and biohazards room data into a format suitable
 * for rendering room tab icon markers. Groups items and biohazards by room for display.
 */
import { ItemRoomData, BiohazardDetailsData, DifficultyLevel } from 'src/data';

export interface RoomTabData {
    roomId: string;
    itemCount: number;
    biohazardCount: number;
    hasItems: boolean;
    hasBiohazards: boolean;
}

/**
 * Processes items room data and biohazards room data into room tab data.
 * Groups by room and counts items/biohazards per room, filtering by difficulty.
 * @param itemsRoomData - Array of items room data from API.
 * @param biohazardsRoomData - Array of biohazards room data from API.
 * @param difficulty - The current difficulty level to filter by.
 * @returns Map of room ID to room tab data.
 */
export function processRoomTabsData(
    itemsRoomData: ItemRoomData[],
    biohazardsRoomData: BiohazardDetailsData[],
    difficulty: DifficultyLevel,
): Map<string, RoomTabData> {
    const roomTabsMap = new Map<string, RoomTabData>();

    // Process items
    itemsRoomData.forEach((item) => {
        if (item.difficultyLevel.includes(difficulty)) {
            const roomId = item.map.roomId;
            if (!roomTabsMap.has(roomId)) {
                roomTabsMap.set(roomId, {
                    roomId,
                    itemCount: 0,
                    biohazardCount: 0,
                    hasItems: false,
                    hasBiohazards: false,
                });
            }
            const roomTab = roomTabsMap.get(roomId)!;
            roomTab.itemCount += item.qty;
            roomTab.hasItems = true;
        }
    });

    // Process biohazards
    biohazardsRoomData.forEach((biohazard) => {
        if (biohazard.difficultyLevel.includes(difficulty)) {
            const roomId = biohazard.map.roomId;
            if (!roomTabsMap.has(roomId)) {
                roomTabsMap.set(roomId, {
                    roomId,
                    itemCount: 0,
                    biohazardCount: 0,
                    hasItems: false,
                    hasBiohazards: false,
                });
            }
            const roomTab = roomTabsMap.get(roomId)!;
            roomTab.biohazardCount += 1;
            roomTab.hasBiohazards = true;
        }
    });

    return roomTabsMap;
}

/**
 * @file Processor for room tabs data in the keymenu.
 * @description Transforms items room data, biohazards room data, and rooms data into a format suitable
 * for rendering room tab icon markers. Groups items and biohazards by type within each room.
 */
import { ItemRoomData, BiohazardRoomData, RoomData, DifficultyLevel } from 'src/data';

export interface ItemDifficultyQuantity {
    difficultyLevels: readonly string[];
    qty: number;
}

export interface RoomTabItemDetail {
    name: string;
    difficultyQuantities: ItemDifficultyQuantity[]; // Quantities grouped by difficulty level
}

export interface RoomTabItemGroup {
    type: string; // Item type (e.g., 'Ammunition', 'GreenHerb')
    name: string; // Display name for the group
    iconClass: string; // FontAwesome icon class
    items: RoomTabItemDetail[]; // Individual item names with their difficulty-based quantities
    totalQty: number; // Sum of all quantities
    difficultyLevel: readonly string[]; // Combined difficulty levels
}

export interface RoomTabBiohazardGroup {
    type: string; // Biohazard name (e.g., 'Zombie', 'Hunter')
    code: string; // Biohazard code (e.g., 'Zb', 'Ht')
    rating: string; // STARS rating (e.g., '0Half', '1Half')
    qty: number; // Total count of this biohazard type
    difficultyLevel: readonly string[]; // Combined difficulty levels
}

export interface RoomTabData {
    roomId: string;
    roomName: string;
    roomNumber: number | null;
    itemGroups: RoomTabItemGroup[];
    biohazardGroups: RoomTabBiohazardGroup[];
    hasItems: boolean;
    hasBiohazards: boolean;
}

/**
 * Maps biohazard codes to their STARS ratings.
 * This is a static mapping based on the game data.
 */
const BIOHAZARD_RATINGS: Record<string, string> = {
    Zb: '0Half', // Zombie
    Cr: '1', // Crow
    Cb: '1', // Cerberus
    Ws: '1', // Web Spinner
    Np: '1Half', // Neptune
    Ht: '1Half', // Hunter
    Ch: '2', // Chimera
    Pl: '2Half', // Plant 42
    Ty: '3', // Tyrant
};

/**
 * Processes items room data, biohazards room data, and rooms data into room tab data.
 * Groups items and biohazards by type within each room, filters by difficulty, and aggregates quantities.
 * @param itemsRoomData - Array of items room data from API.
 * @param biohazardsRoomData - Array of biohazards room data from API.
 * @param roomsData - Array of all rooms data from API.
 * @param difficulty - The current difficulty level to filter by.
 * @returns Map of room ID to room tab data, sorted by room number.
 */
export function processRoomTabsData(
    itemsRoomData: ItemRoomData[],
    biohazardsRoomData: BiohazardRoomData[],
    roomsData: RoomData[],
    difficulty: DifficultyLevel,
): Map<string, RoomTabData> {
    const roomTabsMap = new Map<string, RoomTabData>();

    // Initialize all rooms (including empty ones) with room numbers
    roomsData.forEach((room) => {
        roomTabsMap.set(room.id, {
            roomId: room.id,
            roomName: room.name,
            roomNumber: room.roomNumber,
            itemGroups: [],
            biohazardGroups: [],
            hasItems: false,
            hasBiohazards: false,
        });
    });

    // Group items by room and type, then by name within each type
    const itemsByRoom = new Map<string, Map<string, Map<string, ItemRoomData[]>>>();
    itemsRoomData.forEach((item) => {
        // Only include items that are available on the current difficulty
        if (!item.difficultyLevel.includes(difficulty)) return;

        const roomId = item.map.roomId;
        if (!itemsByRoom.has(roomId)) {
            itemsByRoom.set(roomId, new Map());
        }
        const roomItems = itemsByRoom.get(roomId)!;
        if (!roomItems.has(item.type)) {
            roomItems.set(item.type, new Map());
        }
        const typeItems = roomItems.get(item.type)!;
        if (!typeItems.has(item.name)) {
            typeItems.set(item.name, []);
        }
        typeItems.get(item.name)!.push(item);
    });

    // Process grouped items
    itemsByRoom.forEach((itemTypeGroups, roomId) => {
        const roomTab = roomTabsMap.get(roomId);
        if (!roomTab) return;

        itemTypeGroups.forEach((itemNameGroups, type) => {
            const allDifficultyLevels = new Set<string>();
            const itemDetails: RoomTabItemDetail[] = [];
            let totalQty = 0;

            // Process each unique item name
            itemNameGroups.forEach((items, itemName) => {
                // Group quantities by unique difficulty level combinations
                const difficultyQtyMap = new Map<string, number>();

                items.forEach((item) => {
                    const diffKey = item.difficultyLevel.slice().sort().join(',');
                    const currentQty = difficultyQtyMap.get(diffKey) || 0;
                    difficultyQtyMap.set(diffKey, currentQty + item.qty);
                    totalQty += item.qty;
                    item.difficultyLevel.forEach((level) => allDifficultyLevels.add(level));
                });

                // Convert map to array of difficulty quantities
                const difficultyQuantities: ItemDifficultyQuantity[] = [];
                difficultyQtyMap.forEach((qty, diffKey) => {
                    const diffLevels = diffKey.split(',');
                    difficultyQuantities.push({
                        difficultyLevels: diffLevels,
                        qty,
                    });
                });

                itemDetails.push({
                    name: itemName,
                    difficultyQuantities,
                });
            });

            roomTab.itemGroups.push({
                type,
                name: itemDetails[0]?.name || '', // Use first item's name for the group
                iconClass: '', // Will be set by presenter
                items: itemDetails,
                totalQty,
                difficultyLevel: Array.from(allDifficultyLevels),
            });
            roomTab.hasItems = true;
        });
    });

    // Group biohazards by room and type (name)
    const biohazardsByRoom = new Map<string, Map<string, BiohazardRoomData[]>>();
    biohazardsRoomData.forEach((biohazard) => {
        // Only include biohazards that are available on the current difficulty
        if (!biohazard.difficultyLevel.includes(difficulty)) return;

        const roomId = biohazard.map.roomId;
        if (!biohazardsByRoom.has(roomId)) {
            biohazardsByRoom.set(roomId, new Map());
        }
        const roomBiohazards = biohazardsByRoom.get(roomId)!;
        if (!roomBiohazards.has(biohazard.name)) {
            roomBiohazards.set(biohazard.name, []);
        }
        roomBiohazards.get(biohazard.name)!.push(biohazard);
    });

    // Process grouped biohazards
    biohazardsByRoom.forEach((biohazardGroups, roomId) => {
        const roomTab = roomTabsMap.get(roomId);
        if (!roomTab) return;

        biohazardGroups.forEach((biohazards, type) => {
            const allDifficultyLevels = new Set<string>();
            let qty = 0;

            biohazards.forEach((biohazard) => {
                biohazard.difficultyLevel.forEach((level) => allDifficultyLevels.add(level));
                qty += 1; // Each biohazard instance counts as 1
            });

            roomTab.biohazardGroups.push({
                type,
                code: biohazards[0].code,
                rating: BIOHAZARD_RATINGS[biohazards[0].code] || '0',
                qty,
                difficultyLevel: Array.from(allDifficultyLevels),
            });
            roomTab.hasBiohazards = true;
        });
    });

    return roomTabsMap;
}

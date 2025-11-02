import { DifficultyLevel, RoomDetailsData, ItemRoomData, QtyItems } from 'src/data';
import { ItemGroup } from 'client/types/api';

/**
 * Resolves qtyItems to a number for incrementing, handling both number and array cases.
 * @param qtyItems - The qtyItems value (number or QtyItems array).
 * @param difficulty - The current difficulty level.
 * @returns The resolved number or 0 if no match.
 */
function resolveQtyItems(
    qtyItems: number | QtyItems[] | null,
    difficulty: DifficultyLevel,
): number {
    if (typeof qtyItems === 'number') return qtyItems;
    const matchingQty = qtyItems?.find((qty) => qty.difficultyLevel.includes(difficulty));
    return matchingQty?.qty ?? 0; // Fallback to 0 if no match
}

/**
 * Processes an array of group items (e.g., items or interactables) and groups them by type in the provided map.
 * Filters items by difficulty, increments counts, and updates or adds items with unique IDs.
 * @param groupItems - The array of items or interactables to process.
 * @param itemsGroup - The map to group items by type, with count and item list.
 * @param difficulty - The current difficulty level to filter items by.
 */
export function processGroupItems(
    groupItems: ItemRoomData[],
    itemsGroup: Map<string, ItemGroup>,
    difficulty: DifficultyLevel,
) {
    groupItems.forEach((item) => {
        if (item.difficultyLevel.includes(difficulty)) {
            const type = item.type;
            if (!itemsGroup.has(type)) {
                itemsGroup.set(type, { count: 0, items: [] });
            }
            const group = itemsGroup.get(type)!;
            group.count += item.qty; // increment item qty by shared type

            const existingItem = group.items.find((i) => i.id === item.itemId);
            if (!existingItem) {
                // Add new item
                const matchingUses = item.uses?.find((use) =>
                    use.difficultyLevel.includes(difficulty),
                );
                group.items.push({
                    id: item.itemId,
                    name: item.name,
                    qty: item.qty,
                    qtyItems: resolveQtyItems(item.qtyItems, difficulty),
                    uses: matchingUses ? matchingUses.uses : null,
                });
            } else {
                // Update existing item
                existingItem.qty += item.qty; // increment qty
            }
        }
    });
}

/**
 * Processes items and interactables into a grouped map.
 * @param room - The room data.
 * @param difficulty - The current difficulty level.
 * @returns The grouped items map.
 */
export function processItemsAndInteractables(
    room: RoomDetailsData,
    difficulty: DifficultyLevel,
): Map<string, ItemGroup> {
    const itemsGroup = new Map<string, ItemGroup>();
    processGroupItems(room.roomDetails.items, itemsGroup, difficulty);
    processGroupItems(room.roomDetails.interactables, itemsGroup, difficulty);
    processGroupItems(room.roomDetails.persons, itemsGroup, difficulty);
    return itemsGroup;
}

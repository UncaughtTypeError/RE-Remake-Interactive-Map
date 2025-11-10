/**
 * @file Processor for items list data in the keymenu.
 * @description Transforms items data from API into a format suitable for rendering
 * the items list. Groups items by type and provides ONE entry per type with proper display names.
 */
import { ItemData, PersonData } from 'src/data';
import { toTitleCase } from 'src/utils/formatUtils';

export interface ProcessedItemData {
    type: string; // e.g., "Typewriter", "Document"
    displayName: string; // e.g., "Typewriter", "Document"
    function: string | null;
    showFunction: boolean; // Whether to display the function in the UI
}

/**
 * Gets the display name for an item type using toTitleCase utility.
 * Special case: DoorKey -> "Key" instead of "Door Key"
 * @param type - The item type in PascalCase.
 * @returns The display name for the keymenu list.
 */
function getDisplayNameForType(type: string): string {
    // Special case for DoorKey
    if (type === 'DoorKey') return 'Key';

    // Convert PascalCase to Title Case with spaces
    return toTitleCase(type);
}

/**
 * Determines if an item type should display its function.
 * Only Typewriter, ItemBox, and Kerosene display functions.
 * @param type - The item type.
 * @returns True if the function should be displayed.
 */
function shouldShowFunction(type: string): boolean {
    return type === 'Typewriter' || type === 'ItemBox' || type === 'Kerosene';
}

/**
 * Gets the function label for an item type.
 * @param type - The item type.
 * @param functionValue - The function value from data.
 * @returns The function label or null.
 */
function getFunctionForType(type: string, functionValue: string | null): string | null {
    if (!shouldShowFunction(type)) return null;
    return functionValue;
}

/**
 * Processes items data into ONE entry per type for the keymenu list.
 * Groups items by type and returns unique types with proper display names.
 * @param itemsData - Array of items data from API.
 * @returns Array of processed item data ready for rendering (one per type).
 */
export function processItemsList(itemsData: ItemData[]): ProcessedItemData[] {
    // Group items by type and get first item of each type
    const typeMap = new Map<string, ItemData>();

    itemsData.forEach((item) => {
        if (!typeMap.has(item.type)) {
            typeMap.set(item.type, item);
        }
    });

    // Convert to processed format with one entry per type
    return Array.from(typeMap.values()).map((item) => ({
        type: item.type,
        displayName: getDisplayNameForType(item.type),
        function: getFunctionForType(item.type, item.function),
        showFunction: shouldShowFunction(item.type) && item.function !== null,
    }));
}

/**
 * Processes persons data into keymenu format.
 * Returns "Person of Interest" entry.
 * @param personsData - Array of persons data from API.
 * @returns Array with single "Person of Interest" entry or empty if no persons.
 */
export function processPersonsList(personsData: PersonData[]): ProcessedItemData[] {
    if (personsData.length === 0) return [];

    return [{
        type: 'PersonOfInterest',
        displayName: 'Person of Interest',
        function: null,
        showFunction: false,
    }];
}

/**
 * @file Icon markers renderer for room summary component.
 * @description Renders item and biohazard icon markers based on API room data.
 */

import { RoomDetailsData, DifficultyLevel } from 'src/data/types';
import { ItemGroup, BiohazardGroup } from 'roomDetail/types/types';
import { processItemsAndInteractables } from 'roomDetail/processors/itemProcessor';
import { processBiohazards } from 'roomDetail/processors/biohazardProcessor';

/**
 * Converts item type to CSS class name (e.g., "GreenHerb" -> "green-herb").
 * @param type - The item type.
 * @returns The kebab-case class name.
 */
function typeToClassName(type: string): string {
    return type.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
}

/**
 * Processes and activates icon markers for items and biohazards in the room.
 * @param room - The room data.
 * @param difficulty - The current difficulty level for filtering.
 * @returns Object containing counts of items and biohazards.
 */
export function processIconMarkers(
    room: RoomDetailsData,
    difficulty: DifficultyLevel,
): {
    itemCount: number;
    biohazardCount: number;
} {
    let itemCount = 0;
    let biohazardCount = 0;

    // Process items using roomDetail's processor
    const itemsGroup: Map<string, ItemGroup> = processItemsAndInteractables(room, difficulty);

    // Process biohazards using roomDetail's processor
    const biohazardsGroup: Map<string, BiohazardGroup> = processBiohazards(room, difficulty);

    // Activate item icons
    itemsGroup.forEach((group, type) => {
        const className = typeToClassName(type);
        const keySelector = `key-${className}`;

        // Find matching room-info-icon and activate it
        const icon = document.querySelector<HTMLElement>(
            `.room-info-wrapper .room-info-icon.${keySelector}`,
        );

        if (icon) {
            // Activate the icon
            icon.classList.remove('room-icon-inactive');
            icon.classList.add('room-icon-active');

            // Set quantity if present
            const qtySpan = icon.querySelector<HTMLElement>('.difficulty-qty-summary');
            if (qtySpan && group.count > 0) {
                qtySpan.textContent = group.count.toString();
                qtySpan.classList.remove('not-qty');
                qtySpan.classList.add('has-qty');
            } else if (qtySpan) {
                qtySpan.textContent = '';
                qtySpan.classList.remove('has-qty');
                qtySpan.classList.add('not-qty');
            }

            itemCount++;
        }
    });

    // Activate biohazard icons
    biohazardsGroup.forEach((group, code) => {
        const keySelector = `key-${code}`;

        // Find matching room-info-icon and activate it
        const icon = document.querySelector<HTMLElement>(
            `.room-info-wrapper .room-info-icon.${keySelector}`,
        );

        if (icon) {
            // Activate the icon
            icon.classList.remove('room-icon-inactive');
            icon.classList.add('room-icon-active');

            // Set quantity if present
            const qtySpan = icon.querySelector<HTMLElement>('.difficulty-qty-summary');
            if (qtySpan && group.qty > 0) {
                qtySpan.textContent = group.qty.toString();
                qtySpan.classList.remove('not-qty');
                qtySpan.classList.add('has-qty');
            } else if (qtySpan) {
                qtySpan.textContent = '';
                qtySpan.classList.remove('has-qty');
                qtySpan.classList.add('not-qty');
            }

            biohazardCount++;
        }
    });

    return { itemCount, biohazardCount };
}

/**
 * Clones active icons to their respective active icon wrappers.
 */
export function cloneActiveIcons(): void {
    // Clone active biohazard icons
    const activeBiohazards = document.querySelectorAll<HTMLElement>(
        '#biohazard-key-icons .room-icon-active',
    );
    const activeBiohazardsContainer = document.getElementById('active-biohazards');
    if (activeBiohazardsContainer) {
        activeBiohazards.forEach((icon) => {
            const clone = icon.cloneNode(true) as HTMLElement;
            activeBiohazardsContainer.appendChild(clone);
        });
    }

    // Clone active item icons
    const activeItems = document.querySelectorAll<HTMLElement>('#item-key-icons .room-icon-active');
    const activeItemsContainer = document.getElementById('active-items');
    if (activeItemsContainer) {
        activeItems.forEach((icon) => {
            const clone = icon.cloneNode(true) as HTMLElement;
            activeItemsContainer.appendChild(clone);
        });
    }
}

/**
 * Updates quantity displays and default icon visibility for items.
 * @param itemCount - Number of active items.
 */
export function updateItemCounts(itemCount: number): void {
    const itemQtyEl = document.querySelector<HTMLElement>(
        '#item-key-icons .key-icon-wrapper-title .qty',
    );
    const itemDefaultIcon = document.querySelector<HTMLElement>('#item-key-icons .key-default');

    if (itemQtyEl) {
        itemQtyEl.textContent = `x${itemCount}`;
    }

    if (itemDefaultIcon) {
        if (itemCount === 0) {
            itemDefaultIcon.classList.remove('room-icon-inactive');
            itemDefaultIcon.classList.add('room-icon-active');
        } else {
            itemDefaultIcon.classList.remove('room-icon-active');
            itemDefaultIcon.classList.add('room-icon-inactive');
        }
    }
}

/**
 * Updates quantity displays and default icon visibility for biohazards.
 * @param biohazardCount - Number of active biohazards.
 */
export function updateBiohazardCounts(biohazardCount: number): void {
    const biohazardQtyEl = document.querySelector<HTMLElement>(
        '#biohazard-key-icons .key-icon-wrapper-title .qty',
    );
    const biohazardDefaultIcon = document.querySelector<HTMLElement>(
        '#biohazard-key-icons .key-default',
    );

    if (biohazardQtyEl) {
        biohazardQtyEl.textContent = `x${biohazardCount}`;
    }

    if (biohazardDefaultIcon) {
        if (biohazardCount === 0) {
            biohazardDefaultIcon.classList.remove('room-icon-inactive');
            biohazardDefaultIcon.classList.add('room-icon-active');
        } else {
            biohazardDefaultIcon.classList.remove('room-icon-active');
            biohazardDefaultIcon.classList.add('room-icon-inactive');
        }
    }
}

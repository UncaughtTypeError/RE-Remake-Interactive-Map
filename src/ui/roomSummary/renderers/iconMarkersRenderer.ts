/**
 * @file Icon markers renderer for room summary component.
 * @description Renders item and biohazard icon markers based on API room data.
 */

import { RoomDetailsData, DifficultyLevel } from 'src/data/types';
import { ItemGroup, BiohazardGroup } from 'client/types/api';
import { processItemsAndInteractables } from 'roomDetail/processors/itemProcessor';
import { processBiohazards } from 'roomDetail/processors/biohazardProcessor';

/**
 * Processes and activates icon markers for items and biohazards in the room.
 * Uses data-type for items and data-code for biohazards to match templates.
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
        // Find matching room-info-icon by data-type attribute
        const icon = document.querySelector<HTMLElement>(
            `.room-summary-wrapper .inactive-icon-wrapper .room-info-icon[data-type="${type}"]`,
        );

        if (icon) {
            // Activate the icon
            icon.classList.remove('room-icon-inactive');
            icon.classList.add('room-icon-active');

            // Set quantity if present
            const qtySpan = icon.querySelector<HTMLElement>('.difficulty-qty-summary');
            if (qtySpan && group.count > 1) {
                qtySpan.textContent = group.count.toString();
                qtySpan.classList.remove('not-qty');
                qtySpan.classList.add('has-qty');
            } else if (qtySpan) {
                qtySpan.textContent = '';
                qtySpan.classList.remove('has-qty');
                qtySpan.classList.add('not-qty');
            }

            // Sum up the total count of items (not just types)
            itemCount += group.count;
        }
    });

    // Activate biohazard icons
    biohazardsGroup.forEach((group, code) => {
        // Find matching room-info-icon by data-code attribute
        const icon = document.querySelector<HTMLElement>(
            `.room-summary-wrapper .inactive-icon-wrapper .room-info-icon[data-code="${code}"]`,
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

            // Sum up the total count of biohazards (not just types)
            biohazardCount += group.qty;
        }
    });

    return { itemCount, biohazardCount };
}

/**
 * Clones active icons to their respective active icon wrappers.
 * Only clones from inactive-icon-wrapper to avoid duplicating shadow icons.
 */
export function cloneActiveIcons(): void {
    // Clone active biohazard icons from inactive wrapper only
    const activeBiohazards = document.querySelectorAll<HTMLElement>(
        '#biohazard-key-icons .inactive-icon-wrapper .room-icon-active',
    );
    const activeBiohazardsContainer = document.getElementById('active-biohazards');
    if (activeBiohazardsContainer) {
        activeBiohazards.forEach((icon) => {
            const clone = icon.cloneNode(true) as HTMLElement;
            activeBiohazardsContainer.appendChild(clone);
        });
    }

    // Clone active item icons from inactive wrapper only
    const activeItems = document.querySelectorAll<HTMLElement>(
        '#item-key-icons .inactive-icon-wrapper .room-icon-active',
    );
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
 * Only targets the default icon in inactive-icon-wrapper, not shadow icons.
 * @param itemCount - Number of active items.
 */
export function updateItemCounts(itemCount: number): void {
    const itemQtyEl = document.querySelector<HTMLElement>(
        '#item-key-icons .key-icon-wrapper-title .qty',
    );
    const itemDefaultIcon = document.querySelector<HTMLElement>(
        '#item-key-icons .inactive-icon-wrapper .key-default',
    );

    if (itemQtyEl) {
        itemQtyEl.textContent = `${itemCount}`;
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
 * Only targets the default icon in inactive-icon-wrapper, not shadow icons.
 * @param biohazardCount - Number of active biohazards.
 */
export function updateBiohazardCounts(biohazardCount: number): void {
    const biohazardQtyEl = document.querySelector<HTMLElement>(
        '#biohazard-key-icons .key-icon-wrapper-title .qty',
    );
    const biohazardDefaultIcon = document.querySelector<HTMLElement>(
        '#biohazard-key-icons .inactive-icon-wrapper .key-default',
    );

    if (biohazardQtyEl) {
        biohazardQtyEl.textContent = `${biohazardCount}`;
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

/**
 * @file Presenter for icon marker tags in room tabs.
 * @description Creates DOM elements for room tab icon markers with exact HTML structure
 * matching the original jQuery implementation for proper styling and event handling.
 * Handles grouped items/biohazards with aggregated quantities and tooltips.
 */
import {
    RoomTabData,
    RoomTabItemGroup,
    RoomTabBiohazardGroup,
    RoomTabItemDetail,
    ItemDifficultyQuantity,
} from '../processors/roomTabsProcessor';
import { getStarIconClasses } from '../helpers/starIconHelpers';

/**
 * Maps star rating values to CSS class names for icon markers.
 * @param rating - The rating value.
 * @returns CSS class name (e.g., 'star-half-o', 'star-1', 'star-1-half', etc.).
 */
function getStarClass(rating: string): string {
    const classMap: Record<string, string> = {
        '0': 'star-o',
        '0Half': 'star-half-o',
        '1': 'star-1',
        '1Half': 'star-1-half',
        '2': 'star-2',
        '2Half': 'star-2-half',
        '3': 'star-3',
    };
    return classMap[rating] || 'star-o';
}

/**
 * Maps item type to CSS class name (lowercase with hyphens).
 * @param type - Item type in PascalCase (e.g., 'GreenHerb', 'FirstAid').
 * @returns CSS class name (e.g., 'green-herb', 'first-aid').
 */
function getItemTypeClass(type: string): string {
    return type
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .slice(1);
}

/**
 * Maps item type to FontAwesome icon class.
 * @param type - Item type.
 * @returns FontAwesome icon class name.
 */
function getItemIcon(type: string): string {
    const iconMap: Record<string, string> = {
        Typewriter: 'fa-bookmark',
        ItemBox: 'fa-briefcase',
        Kerosene: 'fa-tint',
        Map: 'fa-map',
        PersonOfInterest: 'fa-user',
        DoorKey: 'fa-key',
        InkRibbon: 'fa-stop-circle-o',
        ItemOfInterest: 'fa-cube',
        Document: 'fa-file-text-o',
        GreenHerb: 'fa-leaf',
        RedHerb: 'fa-leaf',
        BlueHerb: 'fa-leaf',
        FirstAid: 'fa-medkit',
        MixedHerbs: 'fa-flask',
        SelfDefense: 'fa-shield',
        Ammunition: 'fa-bullseye',
        Weapon: 'fa-crosshairs',
    };
    return iconMap[type] || 'fa-cube';
}

/**
 * Creates a biohazard icon pin element with grouped quantities.
 * @param biohazardGroup - The biohazard group data.
 * @returns The created biohazard icon pin element.
 */
function createBiohazardIconPin(biohazardGroup: RoomTabBiohazardGroup): HTMLElement {
    const biohazardTypeClass = biohazardGroup.type.toLowerCase().replace(/\s+/g, '-');
    const starClass = getStarClass(biohazardGroup.rating);
    const starIcons = getStarIconClasses(biohazardGroup.rating);
    const difficultyLevels = biohazardGroup.difficultyLevel.join(' ');

    const iconPin = document.createElement('div');
    iconPin.className = `${biohazardTypeClass} ${starClass} icon-pin map-marker-inactive biohazard-info difficulty-valid`;
    iconPin.dataset.info = biohazardTypeClass;
    iconPin.dataset.difficultyLevel = difficultyLevels;

    const iconMarker = document.createElement('i');
    iconMarker.className = 'icon-marker';

    const triangleIcon = document.createElement('i');
    triangleIcon.className = `fa fa-exclamation-triangle ${starClass}`;
    iconMarker.appendChild(triangleIcon);

    // Add quantity marker if more than 1
    if (biohazardGroup.qty > 1) {
        const qtySpan = document.createElement('span');
        qtySpan.className = 'marker-qty difficulty-qty difficulty-qty-summary difficulty-valid';
        qtySpan.dataset.difficultyLevel = difficultyLevels;
        qtySpan.textContent = biohazardGroup.qty.toString();
        iconMarker.appendChild(qtySpan);
    }

    const tooltip = document.createElement('div');
    tooltip.className = 'icon-marker-tooltip';

    const tooltipSpan = document.createElement('span');
    tooltipSpan.textContent = `${biohazardGroup.type} `;

    if (biohazardGroup.code) {
        const codeSmall = document.createElement('small');
        codeSmall.textContent = biohazardGroup.code;
        tooltipSpan.appendChild(codeSmall);
    }

    tooltip.appendChild(tooltipSpan);

    // Add star icons to tooltip
    starIcons.forEach((iconClass) => {
        const starIcon = document.createElement('i');
        starIcon.className = `fa ${iconClass}`;
        tooltip.appendChild(starIcon);
    });

    iconMarker.appendChild(tooltip);
    iconPin.appendChild(iconMarker);

    return iconPin;
}

/**
 * Determines if the current difficulty matches any of the item's difficulty levels.
 * Used to set difficulty-valid or difficulty-invalid classes.
 * @param difficultyLevels - Array of difficulty levels for the item.
 * @param currentDifficulty - The currently selected difficulty.
 * @returns True if current difficulty is in the list.
 */
function isDifficultyValid(
    difficultyLevels: readonly string[],
    currentDifficulty: string,
): boolean {
    return difficultyLevels.includes(currentDifficulty);
}

/**
 * Creates an item icon pin element with grouped quantities and multiple item tooltips.
 * Handles difficulty-based quantity display with proper visibility classes.
 * @param itemGroup - The item group data.
 * @param currentDifficulty - The currently selected difficulty level.
 * @returns The created item icon pin element.
 */
function createItemIconPin(itemGroup: RoomTabItemGroup, currentDifficulty: string): HTMLElement {
    const itemTypeClass = getItemTypeClass(itemGroup.type);
    const iconClass = getItemIcon(itemGroup.type);
    const difficultyLevels = itemGroup.difficultyLevel.join(' ');

    const iconPin = document.createElement('div');
    iconPin.className = `${itemTypeClass} icon-pin map-marker-inactive difficulty-valid`;
    iconPin.dataset.difficultyLevel = difficultyLevels;

    const iconMarker = document.createElement('i');
    iconMarker.className = 'icon-marker';

    const icon = document.createElement('i');
    icon.className = `fa ${iconClass}`;
    iconMarker.appendChild(icon);

    // Add quantity marker if more than 1
    if (itemGroup.totalQty > 1) {
        const qtySpan = document.createElement('span');
        qtySpan.className = 'marker-qty difficulty-qty difficulty-qty-summary difficulty-valid';
        qtySpan.dataset.difficultyLevel = difficultyLevels;
        qtySpan.textContent = itemGroup.totalQty.toString();
        iconMarker.appendChild(qtySpan);
    }

    const tooltip = document.createElement('div');
    tooltip.className = 'icon-marker-tooltip';

    // Add each unique item to the tooltip with aggregated quantity for current difficulty
    itemGroup.items.forEach((item) => {
        // Sum up all quantities that are valid for the current difficulty
        let totalQtyForCurrentDifficulty = 0;
        item.difficultyQuantities.forEach((diffQty) => {
            if (isDifficultyValid(diffQty.difficultyLevels, currentDifficulty)) {
                totalQtyForCurrentDifficulty += diffQty.qty;
            }
        });

        // Only show the item once with the total quantity for current difficulty
        if (totalQtyForCurrentDifficulty > 0) {
            const tooltipSpan = document.createElement('span');
            tooltipSpan.className = 'difficulty-qty difficulty-valid';
            tooltipSpan.dataset.difficultyLevel = currentDifficulty;
            tooltipSpan.textContent = item.name;

            const qtySup = document.createElement('sup');
            qtySup.textContent = `x${totalQtyForCurrentDifficulty}`;
            tooltipSpan.appendChild(qtySup);

            tooltip.appendChild(tooltipSpan);
        }
    });

    iconMarker.appendChild(tooltip);
    iconPin.appendChild(iconMarker);

    return iconPin;
}

/**
 * Creates an icon marker tag element for items in a room tab.
 * Generates the complete structure with all item icon pins, room number, and room title.
 * @param roomTab - The room tab data.
 * @param currentDifficulty - The currently selected difficulty level.
 * @returns The created icon marker tag element.
 */
export function createItemIconMarkerTag(
    roomTab: RoomTabData,
    currentDifficulty: string,
): HTMLElement {
    const tag = document.createElement('div');
    tag.className = 'icon-marker-tag';
    tag.dataset.room = roomTab.roomId;

    // Add room number element
    if (roomTab.roomNumber !== null) {
        const roomNumberSpan = document.createElement('span');
        roomNumberSpan.className = 'icon-marker-room-number';
        roomNumberSpan.textContent = roomTab.roomNumber.toString();
        tag.appendChild(roomNumberSpan);
    }

    // Add all item icon pins (grouped by type)
    roomTab.itemGroups.forEach((itemGroup) => {
        const iconPin = createItemIconPin(itemGroup, currentDifficulty);
        tag.appendChild(iconPin);
    });

    // Add room title
    const roomTitle = document.createElement('span');
    roomTitle.className = 'icon-marker-room-title';
    roomTitle.textContent = roomTab.roomName;
    tag.appendChild(roomTitle);

    // Add shadow icon marker ONLY for empty rooms (no items)
    if (!roomTab.hasItems) {
        const shadowMarker = document.createElement('i');
        shadowMarker.className = 'icon-marker shadow-icon-marker';
        const shadowIcon = document.createElement('i');
        shadowIcon.className = 'fa';
        shadowMarker.appendChild(shadowIcon);
        tag.appendChild(shadowMarker);
    }

    return tag;
}

/**
 * Creates an icon marker tag element for biohazards in a room tab.
 * Generates the complete structure with all biohazard icon pins, room number, and room title.
 * @param roomTab - The room tab data.
 * @returns The created icon marker tag element.
 */
export function createBiohazardIconMarkerTag(roomTab: RoomTabData): HTMLElement {
    const tag = document.createElement('div');
    tag.className = 'icon-marker-tag';
    tag.dataset.room = roomTab.roomId;

    // Add room number element
    if (roomTab.roomNumber !== null) {
        const roomNumberSpan = document.createElement('span');
        roomNumberSpan.className = 'icon-marker-room-number';
        roomNumberSpan.textContent = roomTab.roomNumber.toString();
        tag.appendChild(roomNumberSpan);
    }

    // Add all biohazard icon pins (grouped by type)
    roomTab.biohazardGroups.forEach((biohazardGroup) => {
        const iconPin = createBiohazardIconPin(biohazardGroup);
        tag.appendChild(iconPin);
    });

    // Add room title
    const roomTitle = document.createElement('span');
    roomTitle.className = 'icon-marker-room-title';
    roomTitle.textContent = roomTab.roomName;
    tag.appendChild(roomTitle);

    // Add shadow icon marker ONLY for empty rooms (no biohazards)
    if (!roomTab.hasBiohazards) {
        const shadowMarker = document.createElement('i');
        shadowMarker.className = 'icon-marker shadow-icon-marker';
        const shadowIcon = document.createElement('i');
        shadowIcon.className = 'fa';
        shadowMarker.appendChild(shadowIcon);
        tag.appendChild(shadowMarker);
    }

    return tag;
}

/**
 * @file Presenter for item list items in the keymenu.
 * @description Creates DOM elements for individual items in the keymenu items list.
 * Matches the exact HTML structure from the original jQuery implementation.
 */
import { ProcessedItemData } from '../processors/itemsListProcessor';

/**
 * Converts a type name to kebab-case for CSS class names.
 * @param type - The type to convert (e.g., "ItemBox").
 * @returns The kebab-cased name (e.g., "item-box").
 */
function toKebabCase(type: string): string {
    // Handle special cases first
    if (type === 'ItemBox') return 'item-box';
    if (type === 'FirstAid') return 'first-aid-spray';
    if (type === 'SelfDefense') return 'self-defense';
    if (type === 'InkRibbon') return 'ink-ribbon';
    if (type === 'DoorKey') return 'door-key';
    if (type === 'ItemOfInterest') return 'item-of-interest';
    if (type === 'PersonOfInterest') return 'person-of-interest';
    if (type === 'GreenHerb') return 'green-herb';
    if (type === 'RedHerb') return 'red-herb';
    if (type === 'BlueHerb') return 'blue-herb';
    if (type === 'MixedHerbs') return 'mixed-herbs';

    // Default: lowercase
    return type.toLowerCase();
}

/**
 * Creates the icon group structure for an item type.
 * Different item types have different icon structures.
 * @param type - The item type.
 * @returns The icon group element or null for simple icon items.
 */
function createIconGroup(type: string): HTMLElement | null {
    const iconGroup = document.createElement('div');
    iconGroup.className = 'icon-group fa-stack fa-fw';

    switch (type) {
        case 'Typewriter': {
            // 3-layer: circle, print, stop-circle-o
            const circle = document.createElement('i');
            circle.className = 'fa fa-circle fa-stack-1x';
            const print = document.createElement('i');
            print.className = 'fa fa-print fa-stack-2x';
            const overlay = document.createElement('i');
            overlay.className = 'fa fa-stop-circle-o fa-stack-1x';
            iconGroup.appendChild(circle);
            iconGroup.appendChild(print);
            iconGroup.appendChild(overlay);
            return iconGroup;
        }
        case 'ItemBox':
        case 'Kerosene':
        case 'FirstAid':
        case 'Ammunition':
            // These use simple fa-2x icons, not icon groups
            return null;
        case 'Map': {
            // 2-layer: map, map-marker (inverse)
            const map = document.createElement('i');
            map.className = 'fa fa-map fa-stack-2x';
            const marker = document.createElement('i');
            marker.className = 'fa fa-map-marker fa-stack-1x fa-inverse';
            iconGroup.appendChild(map);
            iconGroup.appendChild(marker);
            return iconGroup;
        }
        case 'GreenHerb':
        case 'RedHerb':
        case 'BlueHerb':
        case 'MixedHerbs': {
            // 2-layer: leaf (rotated/flipped), leaf (inverse)
            const leaf1 = document.createElement('i');
            leaf1.className = 'fa fa-leaf fa-stack-2x fa-flip-horizontal fa-rotate-90';
            const leaf2 = document.createElement('i');
            leaf2.className = 'fa fa-leaf fa-stack-1x fa-inverse';
            iconGroup.appendChild(leaf1);
            iconGroup.appendChild(leaf2);
            return iconGroup;
        }
        case 'SelfDefense': {
            // 2-layer: shield, bolt (inverse)
            const shield = document.createElement('i');
            shield.className = 'fa fa-shield fa-stack-2x';
            const bolt = document.createElement('i');
            bolt.className = 'fa fa-bolt fa-stack-1x fa-inverse';
            iconGroup.appendChild(shield);
            iconGroup.appendChild(bolt);
            return iconGroup;
        }
        case 'InkRibbon': {
            // 3-layer: circle, print, stop-circle-o (stack-3x for overlay)
            const circle = document.createElement('i');
            circle.className = 'fa fa-circle fa-stack-1x';
            const print = document.createElement('i');
            print.className = 'fa fa-print fa-stack-2x';
            const overlay = document.createElement('i');
            overlay.className = 'fa fa-stop-circle-o fa-stack-3x';
            iconGroup.appendChild(circle);
            iconGroup.appendChild(print);
            iconGroup.appendChild(overlay);
            return iconGroup;
        }
        case 'DoorKey': {
            // 2-layer: unlock-alt, key (flipped)
            const unlock = document.createElement('i');
            unlock.className = 'fa fa-unlock-alt fa-stack-2x';
            const key = document.createElement('i');
            key.className = 'fa fa-key fa-stack-1x fa-flip-vertical';
            iconGroup.appendChild(unlock);
            iconGroup.appendChild(key);
            return iconGroup;
        }
        case 'Document': {
            // 2-layer: file-text, search (inverse)
            const fileText = document.createElement('i');
            fileText.className = 'fa fa-file-text fa-stack-2x';
            const search = document.createElement('i');
            search.className = 'fa fa-search fa-stack-1x fa-inverse';
            iconGroup.appendChild(fileText);
            iconGroup.appendChild(search);
            return iconGroup;
        }
        case 'ItemOfInterest': {
            // 2-layer: cubes, info-circle (inverse)
            const cubes = document.createElement('i');
            cubes.className = 'fa fa-cubes fa-stack-2x';
            const info = document.createElement('i');
            info.className = 'fa fa-info-circle fa-stack-1x fa-inverse';
            iconGroup.appendChild(cubes);
            iconGroup.appendChild(info);
            return iconGroup;
        }
        case 'PersonOfInterest': {
            // 2-layer: users, user (inverse)
            const users = document.createElement('i');
            users.className = 'fa fa-users fa-stack-2x';
            const user = document.createElement('i');
            user.className = 'fa fa-user fa-stack-2x fa-inverse';
            iconGroup.appendChild(users);
            iconGroup.appendChild(user);
            return iconGroup;
        }
        case 'Weapon': {
            // 2-layer: bullseye, crosshairs (inverse)
            const bullseye = document.createElement('i');
            bullseye.className = 'fa fa-bullseye fa-stack-2x';
            const crosshairs = document.createElement('i');
            crosshairs.className = 'fa fa-crosshairs fa-stack-1x fa-inverse';
            iconGroup.appendChild(bullseye);
            iconGroup.appendChild(crosshairs);
            return iconGroup;
        }
        default:
            return null;
    }
}

/**
 * Creates a simple icon element for item types that don't use icon groups.
 * @param type - The item type.
 * @returns The simple icon element or null if type uses icon group.
 */
function createSimpleIcon(type: string): HTMLElement | null {
    const icon = document.createElement('i');

    switch (type) {
        case 'ItemBox':
            icon.className = 'fa fa-archive fa-fw fa-2x';
            return icon;
        case 'Kerosene':
            icon.className = 'fa fa-fire fa-fw fa-2x';
            return icon;
        case 'FirstAid':
            icon.className = 'fa fa-heartbeat fa-2x';
            return icon;
        case 'Ammunition':
            icon.className = 'fa fa-server fa-rotate-90 fa-2x fa-fw';
            return icon;
        default:
            return null;
    }
}

/**
 * Gets the filter key icon class for an item type.
 * @param type - The item type.
 * @returns The FontAwesome icon class for the filter key.
 */
function getFilterKeyIcon(type: string): string {
    switch (type) {
        case 'Typewriter':
            return 'fa-bookmark';
        case 'ItemBox':
            return 'fa-square';
        case 'Kerosene':
            return 'fa-window-close';
        case 'Map':
            return 'fa-square';
        case 'GreenHerb':
        case 'RedHerb':
        case 'BlueHerb':
        case 'MixedHerbs':
            return 'fa-leaf';
        case 'FirstAid':
            return 'fa-plus-circle';
        case 'SelfDefense':
            return 'fa-shield';
        case 'InkRibbon':
            return 'fa-stop-circle-o';
        case 'DoorKey':
            return 'fa-key';
        case 'Document':
            return 'fa-file-text';
        case 'ItemOfInterest':
            return 'fa-cube';
        case 'PersonOfInterest':
            return 'fa-user';
        case 'Ammunition':
            return 'fa-bullseye';
        case 'Weapon':
            return 'fa-crosshairs';
        default:
            return 'fa-cube';
    }
}

/**
 * Creates a list item element for an item in the keymenu.
 * Generates the exact HTML structure required by the original jQuery implementation.
 * @param item - The processed item data.
 * @returns The created list item element.
 */
export function createItemListItem(item: ProcessedItemData): HTMLElement {
    const kebabType = toKebabCase(item.type);
    const filterIcon = getFilterKeyIcon(item.type);

    // Create main list item container
    const listItem = document.createElement('div');
    listItem.className = `list-group-item key-${kebabType} list-group-inactive`;

    // Add icon group or simple icon
    const iconGroup = createIconGroup(item.type);
    if (iconGroup) {
        listItem.appendChild(iconGroup);
    } else {
        const simpleIcon = createSimpleIcon(item.type);
        if (simpleIcon) {
            listItem.appendChild(simpleIcon);
        }
    }

    // Add non-breaking space
    listItem.appendChild(document.createTextNode('\u00A0'));

    // Add item display name
    const nameText = document.createTextNode(item.displayName);
    listItem.appendChild(nameText);

    // Add space after name
    listItem.appendChild(document.createTextNode(' '));

    // Add function if applicable (only for Typewriter, ItemBox, Kerosene)
    if (item.showFunction && item.function) {
        const functionElement = document.createElement('small');
        functionElement.textContent = `(${item.function})`;
        listItem.appendChild(functionElement);

        // Add space after function
        listItem.appendChild(document.createTextNode(' '));
    }

    // Create filter key icon with required attributes
    const filterKey = document.createElement('i');
    filterKey.className = `fa ${filterIcon} fa-fw key-alt filter-key filter-inactive`;
    filterKey.dataset.key = item.type;

    listItem.appendChild(filterKey);

    return listItem;
}

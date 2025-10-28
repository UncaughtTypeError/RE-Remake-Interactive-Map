import { toTitleCase } from './formatUtils';

/**
 * Toggles classes on a NodeList of elements.
 * @param elements - The elements to toggle.
 * @param addClass - Class to add.
 * @param removeClass - Class to remove.
 */
export function toggleClass(elements: NodeListOf<Element>, addClass: string, removeClass: string) {
    elements.forEach((el) => {
        el.classList.remove(removeClass);
        el.classList.add(addClass);
    });
}

/**
 * Appends a grid hexagon element to the specified wrapper.
 * Creates a hexagonal grid item with optional classes, metadata, and child elements.
 *
 * @param wrapper - The parent HTML element to which the hexagon will be appended.
 * @param metaData - An object containing metadata for the hexagon.
 * @param metaData.key - A unique key for the hexagon, stored in the `data-key` attribute.
 * @param metaData.qty - The quantity to display inside the hexagon.
 * @param metaData.tooltip - Optional tooltip text for the hexagon. Defaults to the key if not provided.
 * @param classNames - An optional array of additional class names to add to the hexagon.
 * @param appendObjects - An optional array of HTML elements to append inside the hexagon's border.
 */
export function appendGridHex(
    wrapper: HTMLElement,
    metaData: {
        key: string;
        qty?: string | null | undefined;
        tooltip?: string | null | undefined;
    },
    classNames?: (string | null | undefined)[],
    appendObjects?: (HTMLElement | null | undefined)[],
) {
    const { key, qty, tooltip } = metaData;

    if (qty) {
        const qtyEl = document.createElement('span');
        qtyEl.classList.add('qty');
        qtyEl.textContent = qty;
        if (appendObjects) {
            appendObjects.push(qtyEl);
        } else {
            appendObjects = [qtyEl];
        }
    }

    const gridHex = document.createElement('div');
    gridHex.classList.add('grid-group-item', 'hexagon', 'hexagon-vertical');
    if (classNames && classNames.length) {
        classNames.forEach((className) => {
            if (className) gridHex.classList.add(className);
        });
    }
    gridHex.dataset.key = key;
    gridHex.innerHTML = `
        <div class="hexagon-lvl1">
            <div class="hexagon-lvl2"><div class="hexagon-border" data-tooltip="${toTitleCase(tooltip ?? key)}"></div></div>
        </div>
    `;
    wrapper.appendChild(gridHex);
    if (appendObjects && appendObjects.length) {
        appendObjects.forEach((obj) => {
            if (!obj) return;
            const border = gridHex.querySelector('.hexagon-border');
            if (border) border.appendChild(obj);
        });
    }
}

/**
 * Factory to create a qty updater for different contexts (e.g., items, biohazards).
 * @param threshold - Count threshold for 'has-qty' class (e.g., 2 for items, 0 for biohazards).
 * @returns A function to update the qty element.
 */
export function createQtyUpdater(
    threshold: number = 1,
): (qtyEl: HTMLElement | null, count: number) => void {
    return (qtyEl, count) => {
        if (qtyEl) {
            qtyEl.textContent = count > 0 ? count.toString() : '';
            qtyEl.classList.toggle('has-qty', count >= threshold);
            qtyEl.classList.toggle('not-qty', count < threshold);
        }
    };
}

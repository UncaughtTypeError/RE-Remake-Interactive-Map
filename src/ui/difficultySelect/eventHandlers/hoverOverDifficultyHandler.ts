/**
 * Handles mouseenter or mouseleave on difficulty select elements.
 * Adds and removes hover classes depending on how the pointer interacts with the element:
 * adds hover class to element and all elements before it,
 * removes hover class from element just left or all elements if leaving the wrapper entirely.
 * NOTE: both mouseenter and mouseleave events are required for the complete and intended functionality
 * @param element - The element.
 * @param event - The mouseenter or mouseleave event.
 */
export function handleMouseHoverDifficulty(element: HTMLElement, event: Event | MouseEvent): void {
    const parentWrapper = element.closest('.difficulty-select-wrapper');
    if (!parentWrapper) return;

    const items = Array.from(parentWrapper.querySelectorAll<HTMLElement>('.difficulty-select'));
    const fromIndex = items.indexOf(element);
    if (fromIndex === -1) return;

    const addHoverToSelfAndNext = () => {
        // apply to current and all following siblings
        for (let i = fromIndex; i < items.length; i++) {
            items[i].classList.add('toggle-mousehover');
        }
    };

    const removeAllHover = () => {
        items.forEach((el) => el.classList.remove('toggle-mousehover'));
    };

    if (event.type === 'mouseenter') {
        addHoverToSelfAndNext();
        return;
    }

    // mouseleave handling
    const related = (event as MouseEvent).relatedTarget as Element | null;

    // If pointer leaves the wrapper entirely, clear all
    if (!related || !parentWrapper.contains(related)) {
        removeAllHover();
        return;
    }

    // Determine if moving within the same wrapper and direction
    const toEl = related.closest('.difficulty-select') as HTMLElement | null;
    const sameWrapper = toEl && toEl.closest('.difficulty-select-wrapper') === parentWrapper;
    if (!sameWrapper) {
        // Leaving to somewhere outside the wrapper or to non-item; clear all
        removeAllHover();
        return;
    }

    const toIndex = items.indexOf(toEl!);
    if (toIndex === -1) {
        removeAllHover();
        return;
    }

    // Moving upward: remove hover only from the element just left
    if (toIndex < fromIndex) {
        element.classList.remove('toggle-mousehover');
    }
    // Moving downward: keep the element hovered (no-op)
}

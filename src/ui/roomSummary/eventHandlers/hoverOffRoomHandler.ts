/**
 * @file Handler for mouse leaving room elements.
 * @description Hides room summary and resets icon states.
 */

import { hideRoomSummary, resetRoomIcons, clearActiveIcons } from 'roomSummary/renderers/visibilityRenderer';
import { animateGears } from 'shared/renderers/gearsAnimatorRenderer';

/**
 * Handles mouseleave on room elements.
 * Hides the room summary panel and resets icon states.
 * @param element - The element.
 * @param event - The event (unused here).
 */
export function handleMouseLeaveRoom(element: HTMLElement, event: Event | MouseEvent): void {
    // Reset all room icons to inactive
    resetRoomIcons();

    // Hide room summary panel
    hideRoomSummary();

    // Clear active icon containers
    clearActiveIcons();

    // Trigger gears animation (200ms duration to match jQuery behavior)
    animateGears(200);
}

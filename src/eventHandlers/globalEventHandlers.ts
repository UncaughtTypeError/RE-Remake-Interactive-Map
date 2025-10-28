/**
 * @file Global event handler registry and delegation module.
 * @description Manages a centralized registry for click event handlers using event delegation for efficiency.
 * This module sets up a single document-level click listener (with debouncing) and delegates events to registered handlers
 * based on selectors. It supports dynamic registration of handlers and includes keyboard accessibility support.
 * Handlers are imported from component-specific modules to keep implementations decoupled.
 * Follows best practices for performance in large DOMs by avoiding multiple listeners.
 *
 * @module eventHandlers
 */
import { ClickHandler } from './types';

import { debounce } from 'src/utils';

import { safeRoomAudioPlayerHandlerTuples } from 'safeRoomAudioPlayer/eventHandlers';
import { themeSelectHandlerTuples } from 'themeSelect/eventHandlers';
import { difficultySelectHandlerTuples } from 'difficultySelect/eventHandlers';
import { roomDetailHandlerTuples } from 'roomDetail/eventHandlers';
import { roomSummaryHandlerTuples } from 'roomSummary/eventHandlers';

/**
 * Registry of click handlers.
 */
const eventHandlers: ClickHandler[] = [
    // Map tuples to registry objects
    ...safeRoomAudioPlayerHandlerTuples.map(([eventType, selector, handler]) => ({
        eventType,
        selector,
        handler,
    })),
    ...themeSelectHandlerTuples.map(([eventType, selector, handler]) => ({
        eventType,
        selector,
        handler,
    })),
    ...difficultySelectHandlerTuples.map(([eventType, selector, handler]) => ({
        eventType,
        selector,
        handler,
    })),
    ...roomDetailHandlerTuples.map(([eventType, selector, handler]) => ({
        eventType,
        selector,
        handler,
    })),
    ...roomSummaryHandlerTuples.map(([eventType, selector, handler]) => ({
        eventType,
        selector,
        handler,
    })),
    {
        eventType: 'click',
        selector: '.specific-action',
        handler: (element: HTMLElement, event: Event) => {
            // Example handler for specific elements
            const action = element.dataset.action;
            const target = document.querySelector('#action-output') as HTMLElement | null;
            if (target) {
                target.textContent = `Performed action: ${action || 'unknown'}`;
            }
        },
    },
    // Add more handlers as needed
];

/**
 * Registers a new click handler dynamically.
 * Allows adding handlers at runtime without modifying the core registry.
 *
 * @param eventType - The event type (e.g., 'click', 'mouseover').
 * @param selector - The CSS selector for elements to handle (e.g., '[data-room]').
 * @param handler - The handler function to execute when the selector matches.
 */
export function registerHandler(
    eventType: string,
    selector: string,
    handler: (element: HTMLElement, event: Event) => void | Promise<void>,
): void {
    eventHandlers.push({ eventType, selector, handler });
}
/**
 * Centralized click event handler with delegation.
 * Iterates through the registry to find matching selectors using event delegation (via closest()).
 * Executes the first matching handler and stops to prevent multiple executions.
 *
 * @param event - The click event triggered on the document.
 */
function handleGlobalEvent(event: Event): void {
    const matchingHandlers = eventHandlers.filter((h) => h.eventType === event.type);
    for (const { selector, handler } of matchingHandlers) {
        const target = (event.target as Element).closest(selector);
        if (target) {
            handler(target as HTMLElement, event);
            break; // Stop after first match
        }
    }
}

/**
 * Attaches bubbling events (e.g., click, mouseover, mouseout) to the document for delegation.
 * Uses debounce to prevent rapid firing. Run on app init.
 */
function attachDelegatedBubblingEvents(): void {
    const bubblingEvents = ['click', 'mouseover', 'mouseout']; // Define bubbling type
    bubblingEvents.forEach((eventType) => {
        document.addEventListener(eventType, debounce(handleGlobalEvent, 200));
    });
}

/**
 * Attaches non-bubbling events (e.g., mouseenter, mouseleave) directly to matching elements based on the registry.
 * Applies debounce to handlers for performance. Run on app init; re-run for dynamic DOM changes or use MutationObserver.
 */
function attachDirectNonBubblingEvents(): void {
    const nonBubblingEvents = ['mouseenter', 'mouseleave']; // Define non-bubbling types
    const matchingHandlers = eventHandlers.filter((h) => nonBubblingEvents.includes(h.eventType));
    for (const { eventType, selector, handler } of matchingHandlers) {
        document.querySelectorAll(selector).forEach((el) => {
            el.addEventListener(
                eventType,
                debounce((event) => handler(el as HTMLElement, event), 200),
            );
        });
    }
}

/**
 * Initializes all global event listeners for the application.
 * Sets up delegated bubbling events, direct non-bubbling events, and keyboard support for accessibility (Enter/Space keys on matching elements).
 * Uses debouncing for performance on rapid events.
 */
export function initializeGlobalEventListeners(): void {
    // Bubbling events (click, mouseover, mouseout): Attach via delegation
    attachDelegatedBubblingEvents();

    // Non-bubbling events (mouseenter, mouseleave): Attach directly
    attachDirectNonBubblingEvents();

    // Add keyboard support for accessibility
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const target = event.target as Element;
            // Dynamically generate the combined selector string from the registry automatically updating keyboard support
            const allSupportedSelectors = eventHandlers.map((h) => h.selector).join(', ');
            if (target.matches(allSupportedSelectors)) {
                debounce(handleGlobalEvent, 200);
            }
        }
    });
}

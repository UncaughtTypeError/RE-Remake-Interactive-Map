/**
 * @file Barrel file for room summary event handlers.
 * @description Exports all event handlers for convenient import in event handler registry.
 */
import { handleMouseOverRoom } from './hoverOverRoomHandler';

/**
 * Type for handler tuples: [eventType, selector, handler function].
 */
type HandlerTuple = [
    string,
    string,
    (element: HTMLElement, event: Event | MouseEvent) => void | Promise<void>,
];

/**
 * Exported array of handler tuples.
 * Each tuple pairs a selector with its event type and handler for atomic maintenance.
 * Update/add/remove here to eliminate registry mismatches
 * and keep registry free of implementation details.
 */
export const roomSummaryHandlerTuples: HandlerTuple[] = [
    ['mouseover', '[data-room]', handleMouseOverRoom],
];

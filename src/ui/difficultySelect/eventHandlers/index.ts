/**
 * @file Barrel file for difficulty select event handlers.
 * @description Exports all event handlers for convenient import in event handler registry.
 */
import { handleSetDifficulty } from './setDifficultyHandler';
import { handleMouseHoverDifficulty } from './hoverOverDifficultyHandler';

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
export const difficultySelectHandlerTuples: HandlerTuple[] = [
    ['click', '.difficulty-select', handleSetDifficulty],
    ['mouseenter', '.difficulty-select', handleMouseHoverDifficulty],
    ['mouseleave', '.difficulty-select', handleMouseHoverDifficulty],
];

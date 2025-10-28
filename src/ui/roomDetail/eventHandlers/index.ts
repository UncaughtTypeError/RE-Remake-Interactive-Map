/**
 * @file Barrel file for room detail event handlers.
 * @description Exports all event handlers for convenient import in event handler registry.
 */
import { handleOpenRoomDetail } from './openRoomDetailHandler';
import { handleCloseRoomDetail } from './closeRoomDetailHandler';
import { handleSwitchDetailTab } from './switchDetailTabHandler';
import { handleSwitchContentsTab } from './switchContentsTabHandler';
import { handleToggleContentsDisplayStyle } from './toggleContentsDisplayStyleHandler';

/**
 * Type for handler tuples: [eventType, selector, handler function].
 */
type HandlerTuple = [string, string, (element: HTMLElement, event: Event) => void | Promise<void>];

/**
 * Exported array of handler tuples.
 * Each tuple pairs a selector with its event type and handler for atomic maintenance.
 * Update/add/remove here to eliminate registry mismatches
 * and keep registry free of implementation details.
 */
export const roomDetailHandlerTuples: HandlerTuple[] = [
    ['click', '[data-room]', handleOpenRoomDetail],
    ['click', '.room-detail-close', handleCloseRoomDetail],
    ['click', '.room-detail-tab', handleSwitchDetailTab],
    ['click', '.room-detail-contents-tab', handleSwitchContentsTab],
    ['click', '.trigger-tile', handleToggleContentsDisplayStyle],
];

/**
 * @file Barrel file for keymenu event handlers.
 * @description Exports all event handlers for convenient import in event handler registry.
 */
import { handleKeymenuSelect } from './keymenuSelectHandler';
import { handleKeymenuExpand } from './keymenuExpandHandler';
import { handleTabSwitch } from './tabSwitchHandler';
import { handleFilterToggle } from './filterToggleHandler';
import { handleToggleAllKeys } from './toggleAllKeysHandler';
import {
    handleDropdownTrigger,
    handleDropdownClose,
    handleIconTriggerItem,
} from './dropdownHandler';
import { handleRankingChange, handleRankingDropdownToggle } from './rankingHandler';
import {
    handleRoomMarkerHover,
    handleRoomMarkerLeave,
    handleRoomMarkerClick,
    handleRoomTabIconPinClick,
} from './roomTabsHandler';

/**
 * Type for handler tuples: [eventType, selector, handler function].
 */
type HandlerTuple = [
    string,
    string,
    (element: HTMLElement, event: Event | MouseEvent) => void | Promise<void>,
];

/**
 * Exported array of handler tuples for keymenu functionality.
 * Each tuple pairs a selector with its event type and handler for atomic maintenance.
 * Update/add/remove here to eliminate registry mismatches
 * and keep registry free of implementation details.
 */
export const keymenuHandlerTuples: HandlerTuple[] = [
    // Keymenu select toggle (show/hide keymenu)
    ['click', '.keymenu-select', handleKeymenuSelect],

    // Keymenu expand/collapse
    ['click', '.icon-trigger.toggle-state', handleKeymenuExpand],

    // Tab switching (Items/Biohazards vs Rooms)
    ['click', '.list-group-tab', handleTabSwitch],

    // Individual filter toggle
    ['click', '.keymenu .list-group-item', handleFilterToggle],

    // Toggle all keys
    ['click', '.trigger-keys', handleToggleAllKeys],

    // Dropdown triggers
    ['click', '#map-key-info', handleDropdownTrigger],
    ['click', '#door-lock-info', handleDropdownTrigger],
    ['click', '.dropdown-close', handleDropdownClose],
    ['click', '.icon-trigger-item', handleIconTriggerItem],

    // Ranking system
    ['click', '.ranking-select', handleRankingChange],
    ['click', '.ranking-dropdown-item', handleRankingChange],
    ['click', '.ranking-dropdown-select', handleRankingDropdownToggle],

    // Room tabs functionality
    ['mouseover', '#tab-rooms .icon-marker-tag', handleRoomMarkerHover],
    ['mouseleave', '#tab-rooms .icon-marker-tag', handleRoomMarkerLeave],
    ['click', '[data-room]', handleRoomMarkerClick],
    ['click', '#tab-rooms .icon-pin', handleRoomTabIconPinClick],
];

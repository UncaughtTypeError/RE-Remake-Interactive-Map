/**
 * @file Room summary orchestrator.
 * @description Coordinates all room summary renderers when hovering over a room.
 */

import { RoomDetailsData, DifficultyLevel } from 'src/data/types';
import { showRoomSummary, clearActiveIcons } from '../renderers/visibilityRenderer';
import { setRoomTitle } from '../renderers/roomTitleRenderer';
import {
    processIconMarkers,
    cloneActiveIcons,
    updateItemCounts,
    updateBiohazardCounts,
} from '../renderers/iconMarkersRenderer';
import { activateRoomFunctions } from '../renderers/roomFunctionsRenderer';
import { handleAccessControl } from '../renderers/accessControlRenderer';
import { handleExamineText } from '../renderers/examineTextRenderer';

/**
 * Renders room summary when hovering over a room.
 * Orchestrates all sub-renderers to populate the summary panel with API data.
 * @param room - The room data.
 * @param difficulty - The current difficulty level for filtering items/biohazards.
 */
export function renderRoomSummary(room: RoomDetailsData, difficulty: DifficultyLevel): void {
    // Clear previous active icons
    clearActiveIcons();

    // Show the summary panel
    showRoomSummary();

    // Set room title
    setRoomTitle(room);

    // Process and activate icon markers, get counts
    const { itemCount, biohazardCount } = processIconMarkers(room, difficulty);

    // Clone active icons to display containers
    cloneActiveIcons();

    // Update quantity displays
    updateItemCounts(itemCount);
    updateBiohazardCounts(biohazardCount);

    // Activate room functions (puzzle room, safe room, etc.)
    activateRoomFunctions(room);

    // Handle access control display
    handleAccessControl(room);

    // Handle examine text display
    handleExamineText(room);
}

/**
 * @file Room detail orchestrator.
 * @description Coordinates all room detail renderers when clicking on a room.
 */

import { RoomDetailsData } from 'src/data';

import { setState, getState, GlobalState } from 'src/state/globalState';

import { GlobalConstants } from 'src/constants';

import { toggleRoomState } from 'roomDetail/renderers/roomStateRenderer';
import { resetUI } from 'roomDetail/renderers/errorAndResetRenderer';
import { setRoomTitle } from 'roomDetail/renderers/roomTitleRenderer';
import { renderAdjoiningRooms } from 'roomDetail/renderers/adjoiningRoomsRenderer';
import { renderFeaturedMarkers } from 'roomDetail/renderers/featuredMarkersRenderer';
import { renderRoomIntel } from 'roomDetail/renderers/roomIntelRenderer';
import { setRoomThumbnail } from 'roomDetail/renderers/thumbnailRenderer';
import { activateRoomFunctions } from 'roomDetail/renderers/roomFunctionsRenderer';
import { handleAccessControl } from 'roomDetail/renderers/accessControlRenderer';
import { setThreatLevel } from 'roomDetail/renderers/threatLevelRenderer';
import { processItemsAndInteractables } from 'roomDetail/processors/itemProcessor';
import { processBiohazards } from 'roomDetail//processors/biohazardProcessor';
import { activateTemplates } from 'roomDetail/renderers/templatesRenderer';
import { cloneToDetailLists, cleanupActiveClasses } from 'roomDetail/renderers/detailListsRenderer';
import { handleNoneDetected } from 'roomDetail/renderers/noneDetectedHandler';
import { buildGrids } from 'roomDetail/renderers/gridsRenderer';
import { activateRoomDetails } from 'roomDetail/renderers/roomDetailsRenderer';

/**
 * Renders room details when clicking on a room.
 * Orchestrates all sub-renderers to populate the detail panel with API data.
 * @param difficulty - The current difficulty level to filter items/ biohazards. Defaults to the current global difficulty.
 */
export function renderRoomData(
    difficulty: GlobalState['difficulty'] = GlobalConstants.DEFAULT_DIFFICULTY_LEVEL,
): void {
    const room: RoomDetailsData = getState('roomData');

    // Set global state for current room
    setState('roomId', room.id as GlobalState['roomId']);
    setState('roomDetailActive', true as GlobalState['roomDetailActive']);

    // Toggle room state on map
    if (room.id !== 'unknown') toggleRoomState(room.id);

    // Reset UI elements and clear previous content
    resetUI(room);

    // Set room title
    setRoomTitle(room);

    // Render adjoining rooms list
    renderAdjoiningRooms(room);

    // Render featured markers (items/biohazards)
    renderFeaturedMarkers(room, difficulty);

    // Render room intelligence information
    renderRoomIntel(room);

    // Set room thumbnail image
    setRoomThumbnail(room);

    // Activate room functions (puzzle room, safe room, etc.)
    activateRoomFunctions(room);

    // Handle access control display
    handleAccessControl(room);

    // Set threat level display
    setThreatLevel(room, difficulty);

    // Process items and biohazards based on difficulty
    const itemsGroup = processItemsAndInteractables(room, difficulty);
    const biohazardsGroup = processBiohazards(room, difficulty);

    // Activate templates for items and biohazards
    activateTemplates(itemsGroup, biohazardsGroup);

    // Clone items to detail lists
    cloneToDetailLists();

    // Cleanup active classes from templates
    cleanupActiveClasses();

    // Handle "None Detected" messages for empty sections
    handleNoneDetected();

    // Build grid layouts
    buildGrids();

    // Activate room details panel
    activateRoomDetails();
}

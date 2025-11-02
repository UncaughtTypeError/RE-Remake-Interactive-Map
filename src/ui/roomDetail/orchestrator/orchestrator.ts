/**
 * @file Room detail orchestrator.
 * @description Coordinates all room detail renderers when clicking on a room.
 */

import { RoomDetailsData } from 'src/data';

import { setState, getState, GlobalState } from 'src/state/globalState';

import { GlobalConstants } from 'src/constants';

import { toggleRoomState } from 'roomDetail/renderers/roomStateRenderer';
import { resetUI } from 'roomDetail/renderers/errorAndResetRenderer';
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

    setState('roomId', room.id as GlobalState['roomId']);
    setState('roomDetailActive', true as GlobalState['roomDetailActive']);

    if (room.id !== 'unknown') toggleRoomState(room.id);

    resetUI(room);

    renderAdjoiningRooms(room);

    renderFeaturedMarkers(room, difficulty);

    renderRoomIntel(room);

    setRoomThumbnail(room);

    activateRoomFunctions(room);

    handleAccessControl(room);

    setThreatLevel(room, difficulty);

    const itemsGroup = processItemsAndInteractables(room, difficulty);
    const biohazardsGroup = processBiohazards(room, difficulty);

    activateTemplates(itemsGroup, biohazardsGroup);

    cloneToDetailLists();

    cleanupActiveClasses();

    handleNoneDetected();

    buildGrids();

    activateRoomDetails();
}

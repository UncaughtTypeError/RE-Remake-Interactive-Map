/**
 * @file Barrel file for audio select event handlers.
 * @description Exports all event handlers for convenient import in event handler registry.
 */
import { handleToggleMute, handlePlayPauseToggleAudio, handleSetAudioVolume } from './audioHandler';
import { handleMouseoverAudio, handleMouseoutAudio } from './hoverOverAudioHandler';

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
export const safeRoomAudioPlayerHandlerTuples: HandlerTuple[] = [
    ['click', '.toggle-mute', handleToggleMute],
    ['click', '.audio-play-pause-toggle', handlePlayPauseToggleAudio],
    ['click', '#audio-volume-up', handleSetAudioVolume],
    ['click', '#audio-volume-down', handleSetAudioVolume],
    ['mouseover', '.audio-toggle', handleMouseoverAudio],
    ['mouseout', '.audio-toggle', handleMouseoutAudio],
];

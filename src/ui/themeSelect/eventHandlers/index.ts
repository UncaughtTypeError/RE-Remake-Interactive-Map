/**
 * @file Barrel file for theme toggle event handlers.
 * @description Exports all event handlers for convenient import in event handler registry.
 */
import { HandlerTuple } from 'src/eventHandlers/types';
import {
    handleToggleTheme,
    handleMouseenterTheme,
    handleMouseleaveTheme,
} from './toggleThemeHandler';

/**
 * Exported array of handler tuples.
 * Each tuple pairs a selector with its event type and handler for atomic maintenance.
 * Update/add/remove here to eliminate registry mismatches
 * and keep registry free of implementation details.
 */
export const themeSelectHandlerTuples: HandlerTuple[] = [
    ['click', '.toggle-theme', handleToggleTheme],
    ['mouseenter', '.toggle-theme', handleMouseenterTheme],
    ['mouseleave', '.toggle-theme', handleMouseleaveTheme],
];

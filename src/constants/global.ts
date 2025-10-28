/**
 * @file Global app-wide constants for the Express API.
 * @description Defines readonly constants for app-wide defaults, such as difficulty levels for
 * client-side rendering (e.g., renderRoomData). Constants are namespaced and immutable via `as const`
 * for type safety and to prevent mutations. Import via `src/constants/index.ts` for use in client-side
 * rendering and state defaults.
 * Extend this file for additional global constants (e.g., default map, etc.).
 * @see {@link ../data/README.md} for data structure details.
 */
import { DifficultyLevel } from '../data/types';

export const GlobalConstants = {
    /**
     * Default difficulty level for client-side rendering or queries (e.g., in renderRoomData).
     */
    DEFAULT_DIFFICULTY_LEVEL: 'JV-lvl-very-easy' as DifficultyLevel,
    // Add other global constants here, e.g.:
    // DEFAULT_MAP_VIEW: 'mansionF1',
    // DEFAULT_ZOOM_LEVEL: 100,
} as const;

export type GlobalConstantKey = keyof typeof GlobalConstants;

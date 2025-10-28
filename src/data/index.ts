/**
 * @file Barrel file for static data exports.
 * @description Exports data and types for resources (items, rooms, biohazards) to simplify imports
 * across the application. Used by services (e.g., `src/services/itemsService.ts`) for querying and
 * filtering data. Data arrays are readonly due to `as const` for immutability and type safety.
 * @see {@link ./README.md} for data structure details.
 */
export * from './types';
export { itemsRoomData } from './items';
export { areaData } from './areas';
export { mapData } from './maps';
export { roomData } from './rooms';
export { biohazardsRoomData, starsRankingData } from './biohazards';

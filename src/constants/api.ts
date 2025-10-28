/**
 * @file API-related constants for the Express API.
 * @description Defines readonly constants for API configurations, such as base URLs for endpoints.
 * Constants are namespaced and immutable via `as const` for type safety and to prevent mutations.
 * Import via `src/constants/index.ts` for use in client-side fetching (e.g., fetch calls to the Express server) and services.
 * Extend this file for additional API constants (e.g., default query params, headers).
 * @see {@link ../data/README.md} for data structure details.
 */

export const ApiConstants = {
    /**
     * Base URL for API endpoints (e.g., used in client-side fetch requests).
     * Defaults to localhost for development; update for production/testing environments.
     */
    API_BASE_URL: 'http://localhost:3000',
} as const;

export type ApiConstantKey = keyof typeof ApiConstants;

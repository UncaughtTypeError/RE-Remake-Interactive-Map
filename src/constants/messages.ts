/**
 * @file Centralized error and validation messages for the Express API.
 * @description Defines readonly messages used across services, controllers, routes, and tests to ensure
 * consistency and avoid duplication. Messages are namespaced by category (e.g., validation, errors)
 * and immutable via `as const`. Import via `src/constants/index.ts` for use in error handling,
 * validation, and test assertions. Dynamic messages use `{subject}` as a placeholder for specific
 * resource names (e.g., 'IDs', 'Items').
 * @example
 * ```typescript
 * import { Messages } from '../constants';
 * throw new BadRequestError(Messages.validation.invalidQueryParameters);
 * ```
 * @see {@link ../data/README.md} for data structure details.
 */
export const Messages = {
    validation: {
        /**
         * Error message for invalid query parameters in API requests.
         */
        invalidQueryParameters: 'Invalid query parameters',
        /**
         * Error message for unrecognized query parameters in search requests.
         */
        unrecognizedQueryParameters: 'Unrecognized query parameters: {params}',
        /**
         * Error message for invalid ID format (must be alphanumeric with hyphens).
         */
        invalidIdFormat: 'Invalid {subject} ID format; must be alphanumeric with hyphens',
        /**
         * Error message for exceeding maximum allowed IDs (100).
         */
        tooManyIds: 'Too many IDs provided; maximum is 100',
        /**
         * Error message for exceeding maximum allowed IDs (100).
         */
        tooManyCodes: 'Too many codes provided; maximum is 100',
        /**
         * Error message for invalid comma-separated string inputs (e.g., ids, items, biohazards).
         */
        invalidCommaSeparatedString: '{subject} must be a comma-separated string',
        /**
         * Error message for invalid room ID format.
         */
        invalidRoomIdFormat: 'Invalid room ID format; must be alphanumeric with hyphens',
        /**
         * Error message for invalid map ID format.
         */
        invalidMapIdFormat: 'Invalid map ID format; must be alphanumeric with hyphens',
        /**
         * Error message for invalid adjoining room ID format.
         */
        invalidAdjoiningRoomIdFormat:
            'Invalid adjoining room ID format; must be alphanumeric with hyphens',
        /**
         * Error message for invalid difficulty level in search filters.
         */
        invalidDifficultyLevel: 'Invalid difficulty level',
        /**
         * Error message for invalid item type in search filters.
         */
        invalidItemType: 'Invalid item type',
        /**
         * Error message for invalid person in search filters.
         */
        invalidPerson: 'Invalid person',
        /**
         * Error message for invalid interactable in search filters.
         */
        invalidInteractable: 'Invalid interactable',
        /**
         * Error message for invalid item ID in search filters.
         */
        invalidItemId: 'Invalid item ID',
        /**
         * Error message for invalid biohazard code in search filters.
         */
        invalidBiohazardCode: 'Invalid biohazard code',
        /**
         * Error message for invalid room function in search filters.
         */
        invalidRoomFunction: 'Invalid room function',
        /**
         * Error message for invalid access control type in search filters.
         */
        invalidAccessKey: 'Invalid access control key',
        /**
         * Error message for invalid threat level in search filters.
         */
        invalidThreatLevel: 'Invalid threat level',
        /**
         * Error message for invalid number inputs (e.g., roomNumber).
         */
        invalidNumber: '{subject} must be a valid integer',
        /**
         * Error message for invalid string inputs (e.g., name, persons, interactables).
         */
        invalidString: '{subject} must be a string',
    },
    errors: {
        /**
         * Error message for when no provided IDs match any resources.
         */
        notFound: 'No IDs provided are recognized.',
        /**
         * Error message for rate limit exceeded.
         */
        rateLimitExceeded: 'Too many requests, please try again later.',
    },
} as const;

export type MessageKey = keyof typeof Messages.validation | keyof typeof Messages.errors;

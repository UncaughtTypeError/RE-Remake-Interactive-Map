/**
 * @file format.ts
 * @description Utility functions for string formatting in the vanilla TypeScript application.
 *
 * String Formatting Principles:
 * - Provides reusable functions for normalizing and formatting strings and integers, such as slugification for URLs or IDs.
 * - Leverages native JavaScript string and number methods for efficiency and simplicity, avoiding external libraries.
 * - Chosen for consistency in data processing (e.g., converting names to slugs), ensuring idempotency and predictability.
 * - Follows best practices: Immutable operations (returns new strings), type safety with TypeScript, and minimal overhead for performance.
 * - Standards: Adheres to ECMAScript string handling, Unicode-aware trimming/replacing, and common patterns in web application development (e.g., slugify for readability and comparison).
 * - Practices: DRY for repeated formatting logic, explicit error handling if extended, and modularity for easy import/export.
 */

/**
 * Converts a string to a slug format by lowercasing, trimming, removing invalid characters,
 * and replacing spaces or multiple dashes with a single dash.
 * Example: "West Wing North Corridor" -> "west-wing-north-corridor"
 * Example: "Keeper's Diary" -> "keepers-diary"
 * Example: "Map - Mansion F1" -> "map-mansion-f1"
 * @param str - The input string to slugify.
 * @returns The slugified string.
 */
export function slugifyString(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '') // Remove all non-alphanumeric characters
        .replace(/\s+/g, '-') // Replace spaces with a single dash
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}

/**
 * Reverts a slugified string to a readable format by capitalizing the first letters, trimming, and replacing hyphens with spaces.
 * Example: "low-moderate-risk" -> "Low Moderate Risk"
 * @param str - The input string to de-slugify.
 * @returns The de-slugified string.
 */
export function deSlugifyString(str: string): string {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Formats a camelCase or PascalCase string into a space-separated, title-cased string.
 * Example: "westWingNorthCorridor" -> "West Wing North Corridor"
 * @param str - The camelCase or PascalCase string to format.
 * @returns The title-cased, space-separated string.
 */
export function toTitleCase(str: string): string {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (c) => c.toUpperCase())
        .trim();
}

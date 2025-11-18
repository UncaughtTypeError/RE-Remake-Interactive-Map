/**
 * @file Helper functions for star icon rendering in keymenu components.
 * @description Provides utility functions for mapping S.T.A.R.S. rankings to FontAwesome icon classes.
 * Shared across multiple presenters (biohazard list items, icon marker tags, etc.).
 */

/**
 * Maps star rating values to FontAwesome icon classes for all 3 stars (including empty ones).
 * Used for tooltips where all 3 star positions need to be shown.
 * @param rating - The rating value ('0', '0Half', '1', '1Half', '2', '2Half', '3').
 * @returns Array of 3 icon class names for the star rating (without 'fa' prefix).
 */
export function getStarIconClasses(rating: string): string[] {
    const iconMap: Record<string, string[]> = {
        '0': ['fa-star-o', 'fa-star-o', 'fa-star-o'],
        '0Half': ['fa-star-half-o', 'fa-star-o', 'fa-star-o'],
        '1': ['fa-star', 'fa-star-o', 'fa-star-o'],
        '1Half': ['fa-star', 'fa-star-half-o', 'fa-star-o'],
        '2': ['fa-star', 'fa-star', 'fa-star-o'],
        '2Half': ['fa-star', 'fa-star', 'fa-star-half-o'],
        '3': ['fa-star', 'fa-star', 'fa-star'],
    };
    return iconMap[rating] || ['fa-star-o', 'fa-star-o', 'fa-star-o'];
}

/**
 * Maps star rating values to FontAwesome icon classes for only visible stars (no trailing empty stars).
 * Used for icon groups where only the actual rating stars should be displayed.
 * For rating "0", shows one empty star. For others, shows filled/half stars up to the rating.
 * @param rating - The rating value ('0', '0Half', '1', '1Half', '2', '2Half', '3').
 * @returns Array of icon class names for visible stars only (without 'fa' prefix).
 */
export function getVisibleStarIconClasses(rating: string): string[] {
    const iconMap: Record<string, string[]> = {
        '0': ['fa-star-o'], // One empty star for 0 rating
        '0Half': ['fa-star-half-o'], // One half star
        '1': ['fa-star'], // One full star
        '1Half': ['fa-star', 'fa-star-half-o'], // One full, one half
        '2': ['fa-star', 'fa-star'], // Two full stars
        '2Half': ['fa-star', 'fa-star', 'fa-star-half-o'], // Two full, one half
        '3': ['fa-star', 'fa-star', 'fa-star'], // Three full stars
    };
    return iconMap[rating] || ['fa-star-o'];
}

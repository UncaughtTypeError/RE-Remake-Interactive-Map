/**
 * @file Presenter for ranking items in the keymenu S.T.A.R.S. rankings.
 * @description Creates DOM elements for individual rankings in both the dropdown and display.
 */
import { ProcessedRankingData } from '../processors/rankingsProcessor';

/**
 * Maps star rating values to their corresponding icon classes.
 * @param rating - The rating string ('0', '0Half', '1', '1Half', '2', '2Half', '3')
 * @returns Array of 3 icon class names for the stars
 */
function getStarIcons(rating: string): string[] {
    const iconMap: Record<string, string[]> = {
        '0': ['fa-star-o', 'fa-star-o', 'fa-star-o'], // Eta: 0 stars
        '0Half': ['fa-star-half-o', 'fa-star-o', 'fa-star-o'], // Zeta: 0.5 stars
        '1': ['fa-star', 'fa-star-o', 'fa-star-o'], // Epsilon: 1 star
        '1Half': ['fa-star', 'fa-star-half-o', 'fa-star-o'], // Delta: 1.5 stars
        '2': ['fa-star', 'fa-star', 'fa-star-o'], // Gamma: 2 stars
        '2Half': ['fa-star', 'fa-star', 'fa-star-half-o'], // Beta: 2.5 stars
        '3': ['fa-star', 'fa-star', 'fa-star'], // Alpha: 3 stars
    };

    return iconMap[rating] || ['fa-star-o', 'fa-star-o', 'fa-star-o'];
}

/**
 * Creates a dropdown item element for a S.T.A.R.S. ranking.
 * Generates the correct HTML structure with stars-ranking-type class and star icons.
 * @param ranking - The processed ranking data.
 * @returns The created dropdown item element.
 */
export function createRankingDropdownItem(ranking: ProcessedRankingData): HTMLElement {
    const dropdownItem = document.createElement('div');
    dropdownItem.className = `stars-ranking-type ranking-dropdown-item ${ranking.rankingLowerCase} ranking-type-inactive`;
    dropdownItem.dataset.hazard = `${ranking.rankingLowerCase}-biohazards`;
    dropdownItem.dataset.ranking = ranking.rankingLowerCase;

    // Create the 3 star icons based on the ranking
    const starIcons = getStarIcons(ranking.ranking);
    starIcons.forEach((iconClass) => {
        const icon = document.createElement('i');
        icon.className = `fa ${iconClass}`;
        dropdownItem.appendChild(icon);
    });

    // Create ranking classification label span
    const label = document.createElement('span');
    label.className = 'classification';
    label.textContent = ranking.starsClassification;
    dropdownItem.appendChild(label);

    // Create Greek letter span (replaces pseudo-element ::after)
    const greekLetter = document.createElement('span');
    greekLetter.className = 'greek-letter';
    greekLetter.textContent = ranking.greeksClassification;
    dropdownItem.appendChild(greekLetter);

    return dropdownItem;
}

/**
 * Creates a display item element for a S.T.A.R.S. ranking (for .stars-ranking-display).
 * Similar to dropdown items but without the Greek letter element.
 * @param ranking - The processed ranking data.
 * @returns The created display item element.
 */
export function createRankingDisplayItem(ranking: ProcessedRankingData): HTMLElement {
    const displayItem = document.createElement('div');
    displayItem.className = `stars-ranking-type ranking-type-inactive ${ranking.rankingLowerCase}`;
    displayItem.dataset.hazard = `${ranking.rankingLowerCase}-biohazards`;
    displayItem.dataset.ranking = ranking.rankingLowerCase;

    // Create the 3 star icons based on the ranking
    const starIcons = getStarIcons(ranking.ranking);
    starIcons.forEach((iconClass) => {
        const icon = document.createElement('i');
        icon.className = `fa ${iconClass}`;
        displayItem.appendChild(icon);
    });

    // Create ranking classification label span (no Greek letter in display)
    const label = document.createElement('span');
    label.textContent = ranking.starsClassification;
    displayItem.appendChild(label);

    // Create Greek letter span (replaces pseudo-element ::after)
    const greekLetter = document.createElement('span');
    greekLetter.className = 'greek-letter';
    greekLetter.textContent = ranking.greeksClassification;
    displayItem.appendChild(greekLetter);

    return displayItem;
}

/**
 * Creates the default "All" option item for the ranking display.
 * @returns The created default option element.
 */
export function createDefaultRankingItem(): HTMLElement {
    const defaultItem = document.createElement('div');
    defaultItem.className = 'stars-ranking-type ranking-type-active';
    defaultItem.dataset.hazard = 'default-biohazards';
    defaultItem.dataset.ranking = 'default';

    // Create 3 empty star icons for the "All" option
    for (let i = 0; i < 3; i++) {
        const icon = document.createElement('i');
        icon.className = 'fa fa-star-o';
        defaultItem.appendChild(icon);
    }

    return defaultItem;
}

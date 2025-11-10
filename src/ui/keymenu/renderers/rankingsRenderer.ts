/**
 * @file Renderer for the keymenu S.T.A.R.S. rankings dropdown and display.
 * @description Renders the S.T.A.R.S. rankings dropdown and display in the keymenu by fetching data from API,
 * processing it, and creating DOM elements using presenters.
 */
import { fetchAllSTARSRankings } from 'src/client/api/starsRankingsApi';
import { processRankings } from '../processors/rankingsProcessor';
import {
    createRankingDropdownItem,
    createRankingDisplayItem,
    createDefaultRankingItem,
} from '../presenters/rankingItemPresenter';

/**
 * Renders the S.T.A.R.S. rankings dropdown in the keymenu.
 * Fetches rankings data from API, processes it (sorted by threat level),
 * and appends dropdown items to the container.
 * @param containerSelector - The CSS selector for the rankings dropdown container.
 * @returns Promise that resolves when rendering is complete.
 * @throws Error if the container is not found or API call fails.
 */
export async function renderRankingsDropdown(containerSelector: string): Promise<void> {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error(`Rankings dropdown container not found: ${containerSelector}`);
    }

    // Clear existing content
    container.innerHTML = '';

    try {
        // Fetch data from API
        const rankingsData = await fetchAllSTARSRankings();

        // Process data (sorts by threat level: Eta to Alpha)
        const processedRankings = processRankings(rankingsData);

        // Create and append DOM elements
        processedRankings.forEach((ranking) => {
            const dropdownItem = createRankingDropdownItem(ranking);
            container.appendChild(dropdownItem);
        });
    } catch (error) {
        console.error('Failed to render rankings dropdown:', error);
        container.innerHTML = '<div class="error-message">Failed to load rankings</div>';
        throw error;
    }
}

/**
 * Renders the S.T.A.R.S. rankings display in the keymenu.
 * Fetches rankings data from API, processes it, and appends display items to the container.
 * Includes the default "All" option as the first item.
 * @param containerSelector - The CSS selector for the rankings display container.
 * @returns Promise that resolves when rendering is complete.
 * @throws Error if the container is not found or API call fails.
 */
export async function renderRankingsDisplay(containerSelector: string): Promise<void> {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error(`Rankings display container not found: ${containerSelector}`);
    }

    // Clear existing content
    container.innerHTML = '';

    try {
        // Create and append the default "All" option first
        const defaultItem = createDefaultRankingItem();
        container.appendChild(defaultItem);

        // Fetch data from API
        const rankingsData = await fetchAllSTARSRankings();

        // Process data (sorts by threat level: Eta to Alpha)
        const processedRankings = processRankings(rankingsData);

        // Create and append display items
        processedRankings.forEach((ranking) => {
            const displayItem = createRankingDisplayItem(ranking);
            container.appendChild(displayItem);
        });
    } catch (error) {
        console.error('Failed to render rankings display:', error);
        container.innerHTML = '<div class="error-message">Failed to load rankings</div>';
        throw error;
    }
}

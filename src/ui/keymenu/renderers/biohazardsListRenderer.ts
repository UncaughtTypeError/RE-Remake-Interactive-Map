/**
 * @file Renderer for the keymenu biohazards list.
 * @description Renders the biohazards list in the keymenu by fetching data from API,
 * processing it, and creating DOM elements using presenters.
 */
import { fetchAllBiohazardsData } from 'src/client/api/biohazardsApi';
import { processBiohazardsList } from '../processors/biohazardsListProcessor';
import { createBiohazardListItem } from '../presenters/biohazardListItemPresenter';

/**
 * Renders the biohazards list in the keymenu.
 * Fetches biohazards data from API, processes it, and appends list items to the container.
 * @param containerSelector - The CSS selector for the biohazards list container.
 * @returns Promise that resolves when rendering is complete.
 * @throws Error if the container is not found or API call fails.
 */
export async function renderBiohazardsList(containerSelector: string): Promise<void> {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error(`Biohazards list container not found: ${containerSelector}`);
    }

    // Clear existing content
    container.innerHTML = '';

    try {
        // Fetch data from API
        const biohazardsData = await fetchAllBiohazardsData();

        // Process data
        const processedBiohazards = processBiohazardsList(biohazardsData);

        // Create and append DOM elements
        processedBiohazards.forEach((biohazard) => {
            const listItem = createBiohazardListItem(biohazard);
            container.appendChild(listItem);
        });
    } catch (error) {
        console.error('Failed to render biohazards list:', error);
        container.innerHTML = '<div class="error-message">Failed to load biohazards</div>';
        throw error;
    }
}

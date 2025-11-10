/**
 * @file Renderer for the keymenu items list.
 * @description Renders the items list in the keymenu by fetching data from API,
 * processing it, and creating DOM elements using presenters.
 */
import { fetchAllItemsData } from 'src/client/api/itemsApi';
import { fetchAllPersonsData } from 'src/client/api/personsApi';
import { processItemsList, processPersonsList } from '../processors/itemsListProcessor';
import { createItemListItem } from '../presenters/itemListItemPresenter';

/**
 * Renders the items list in the keymenu.
 * Fetches items and persons data from API, processes them, and appends list items to the container.
 * @param containerSelector - The CSS selector for the items list container.
 * @returns Promise that resolves when rendering is complete.
 * @throws Error if the container is not found or API call fails.
 */
export async function renderItemsList(containerSelector: string): Promise<void> {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error(`Items list container not found: ${containerSelector}`);
    }

    // Clear existing content
    container.innerHTML = '';

    try {
        // Fetch data from API (fetch both in parallel)
        const [itemsData, personsData] = await Promise.all([
            fetchAllItemsData(),
            fetchAllPersonsData(),
        ]);

        // Process data
        const processedItems = processItemsList(itemsData);
        const processedPersons = processPersonsList(personsData);

        // Combine both lists
        const allProcessedItems = [...processedItems, ...processedPersons];

        // Create and append DOM elements
        allProcessedItems.forEach((item) => {
            const listItem = createItemListItem(item);
            container.appendChild(listItem);
        });
    } catch (error) {
        console.error('Failed to render items list:', error);
        container.innerHTML = '<div class="error-message">Failed to load items</div>';
        throw error;
    }
}

/**
 * @file Keymenu orchestrator.
 * @description Coordinates all keymenu renderers to populate items, biohazards,
 * room tabs, and rankings dropdowns from API data.
 */

import { renderItemsList } from '../renderers/itemsListRenderer';
import { renderBiohazardsList } from '../renderers/biohazardsListRenderer';
import { renderRankingsDropdown, renderRankingsDisplay } from '../renderers/rankingsRenderer';
import { renderRoomTabs } from '../renderers/roomTabsRenderer';

/**
 * Renders all keymenu components by orchestrating multiple renderers.
 * Fetches data from APIs and populates the keymenu with dynamic content.
 * This replaces the hard-coded HTML that was previously cloned from templates.
 * @returns Promise that resolves when all renderers complete.
 */
export async function renderKeymenu(): Promise<void> {
    try {
        // Render all components in parallel for better performance
        await Promise.all([
            renderItemsList('.items .list-group'),
            renderBiohazardsList('.biohazards .list-group'),
            renderRankingsDropdown('.biohazards .dropdown-menu'),
            renderRankingsDisplay('.biohazards .stars-ranking-display'),
            renderRoomTabs(), // Renders both items and biohazards room tabs
        ]);

        console.log('Keymenu rendered successfully with API data');
    } catch (error) {
        console.error('Failed to render keymenu:', error);
        throw error;
    }
}

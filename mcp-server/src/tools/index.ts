/**
 * Tool registry - combines all tools from different categories
 */

import { ApiClient } from '../client.js';
import { createItemsTools } from './items.js';
import { createBiohazardsTools } from './biohazards.js';
import { createMapsTools } from './maps.js';

export function createAllTools(client: ApiClient) {
    return [
        ...createItemsTools(client),
        ...createBiohazardsTools(client),
        ...createMapsTools(client),
    ];
}

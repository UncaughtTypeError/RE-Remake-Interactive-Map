import { roomData, itemsRoomData, biohazardsRoomData } from 'src/data';
import 'src/css/diurnal.css';
import 'src/css/nocturnal.css';
import 'src/css/global.css';

declare global {
    interface Window {
        roomData: typeof import('./data').roomData;
        itemsRoomData: typeof import('./data').itemsRoomData;
        biohazardsRoomData: typeof import('./data').biohazardsRoomData;
    }
}

window.roomData = roomData;
window.itemsRoomData = itemsRoomData;
window.biohazardsRoomData = biohazardsRoomData;

import { loadPartialTemplates } from 'src/initializers/templateLoader';
import { initializeGlobalStartUpEvents } from 'src/initializers/globalStartupInitializer';
import { initializeGlobalEventListeners } from 'src/eventHandlers/globalEventHandlers';
import { initializeGlobalSubscriptions } from 'src/state/globalSubscriptions';

async function onDomReady() {
    await loadPartialTemplates();
    initializeGlobalEventListeners();
    initializeGlobalSubscriptions();
}

function onWindowLoad() {
    initializeGlobalStartUpEvents();
}

// Initialize on DOM ready, then after full load; listeners auto-removed
document.addEventListener('DOMContentLoaded', onDomReady, { once: true });
window.addEventListener('load', onWindowLoad, { once: true });

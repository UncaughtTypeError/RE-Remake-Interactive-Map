/**
 * @file Global state subscriptions module.
 * @description Sets up long-lived, app-wide subscriptions to state properties (e.g., 'difficulty').
 * Exports initializeGlobalSubscriptions to run once on app init, establishing reactive callbacks with conditional logic.
 * Subscriptions are global and always active; use flags in callbacks to control actions,
 * following the reactive philosophy: "State changes always notify; logic decides action".
 * Add new global subs here for centralized management.
 */
import { subscribeState, setState, getState } from './globalState';

import { renderRoomData } from 'roomDetail/orchestrator/orchestrator';
import { updateElementVisibility } from 'difficultySelect/renderers/elementVisibilityRenderer';
import { updateDifficultyTags } from 'difficultySelect/renderers/difficultyTagsRenderer';
import { renderRoomTabs } from 'keymenu/renderers/roomTabsRenderer';

/**
 * Initializes all global state subscriptions.
 * Called once on app startup; subscriptions are long-lived with conditional logic in callbacks.
 */
export function initializeGlobalSubscriptions(): void {
    // Difficulty subscription: Global, reactive UI updates
    subscribeState('difficulty', (difficulty) => {
        setState('activeCharacter', difficulty.startsWith('JV') ? 'JV' : 'CR');

        const isStartUp = getState('isStartUp');
        if (!isStartUp) {
            updateDifficultyTags(difficulty);
            updateElementVisibility(difficulty);
            // Re-render room tabs to show difficulty-filtered items/biohazards
            renderRoomTabs(difficulty).catch((error) =>
                console.error('Failed to re-render room tabs on difficulty change:', error),
            );
        }

        const isRoomDetailActive = getState('roomDetailActive');
        if (isRoomDetailActive) renderRoomData(difficulty);
    });

    subscribeState('isStartUp', (isStartUp) => {
        const difficulty = getState('difficulty');
        if (!isStartUp) {
            updateDifficultyTags(difficulty);
            updateElementVisibility(difficulty);
        }
    });

    // Add more global subs here, e.g.:
    // subscribeState('theme', (theme) => { /* Global theme updates */ });
}

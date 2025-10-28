import { setState } from 'src/state/globalState';

import { DifficultyLevelEnum } from 'src/data';

import { selectAndDisplayPhrase } from 'introOverlay/renderer/phraseRenderer';
import { handlePlayAudio } from 'safeRoomAudioPlayer/eventHandlers/audioHandler';
import { fadeOut, simulateClick, setAudioVolume } from 'src/utils';

/**
 * Initializes all global startup operations on app load.
 * Runs sequenced animations, audio setup, and simulated clicks for initial UI state and onload behavior.
 * Called once on DOMContentLoaded.
 */
export function initializeGlobalStartUpEvents(): void {
    // Welcome phrase overlay display
    selectAndDisplayPhrase();

    setTimeout(() => {
        const selectedPhrase = document.querySelector('.selected-phrase') as HTMLElement | null;
        if (selectedPhrase) {
            fadeOut(selectedPhrase, 500, () => {
                const welcomeOverlay = document.querySelector(
                    '.welcome-overlay',
                ) as HTMLElement | null;
                if (welcomeOverlay) fadeOut(welcomeOverlay, 500);
            });
        }
    }, 1000);

    // Autoplay Safe Room theme
    setTimeout(() => {
        const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement | null;
        const toDefault = true;
        if (audioPlayer) {
            setAudioVolume(audioPlayer, toDefault);
            handlePlayAudio();
        }
    }, 5000);

    // Set default difficulty
    setTimeout(() => {
        const difficultyElement = document.querySelector(
            `[data-difficulty-level="${DifficultyLevelEnum.JV_VERY_EASY}"]`,
        ) as HTMLElement | null;
        if (difficultyElement) simulateClick(difficultyElement);
        setState('isStartUp', false);
    }, 2200);

    // Open items filter menu
    setTimeout(() => {
        const itemsList = document.getElementById('items-list') as HTMLElement | null;
        if (itemsList) simulateClick(itemsList);
    }, 3000);

    // Enable typewriter icons on the map
    setTimeout(() => {
        const typewriterKey = document.querySelector(
            '.keymenu.items .key-typewriter',
        ) as HTMLElement | null;
        if (typewriterKey) simulateClick(typewriterKey);
    }, 4000);
}

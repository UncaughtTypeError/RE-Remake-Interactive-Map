import { fadeIn } from 'src/utils';

/**
 * Selects a random phrase and displays it with fade-in.
 */
export function selectAndDisplayPhrase(): void {
    const phrases = [
        'Overcome your fears and survive',
        'Enter the Survival Horror',
        'In the darkness lies your fears',
    ];

    const randomIndex = Math.floor(Math.random() * phrases.length);
    const selectedSpan = document.createElement('span');
    selectedSpan.textContent = phrases[randomIndex];

    const selectedPhrase = document.querySelector('.selected-phrase') as HTMLElement | null;
    if (selectedPhrase) {
        selectedPhrase.appendChild(selectedSpan);
        fadeIn(selectedSpan, 500);
        const parent = selectedSpan.parentElement;
        if (parent) fadeIn(parent, 500);
    }
}

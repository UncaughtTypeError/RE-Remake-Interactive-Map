import { GlobalState } from 'src/state/globalState';

/**
 * Updates visibility of elements based on difficulty level using fadeIn/fadeOut.
 * @param difficultyLvl - The difficulty level.
 */
export function updateElementVisibility(difficultyLvl: GlobalState['difficulty']): void {
    document
        .querySelectorAll('.icon-pin, .qty-indicator, .difficulty-qty, .difficulty-obj')
        .forEach((el) => {
            if ((el as HTMLElement).dataset.difficultyLevel?.includes(difficultyLvl)) {
                el.classList.remove('difficulty-invalid');
                el.classList.add('difficulty-valid');
            } else {
                el.classList.remove('difficulty-valid');
                el.classList.add('difficulty-invalid');
            }
        });
}

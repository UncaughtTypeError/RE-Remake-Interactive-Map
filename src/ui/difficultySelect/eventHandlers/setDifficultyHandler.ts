import { setState, GlobalState } from 'src/state/globalState';

import { animateCog } from 'difficultySelect/renderers/cogAnimatorRenderer';

/**
 * Handles clicks on difficulty select elements, updating state and UI.
 * @param element - The clicked difficulty select element.
 */
export function handleSetDifficulty(element: HTMLElement): void {
    const parentWrapper = element.closest('.difficulty-select-wrapper');
    if (!parentWrapper) return;

    /**
     * Deactivate all difficulty levels of the other character
     */
    const isJV = parentWrapper.classList.contains('JV-difficulty-select');
    const isCR = parentWrapper.classList.contains('CR-difficulty-select');

    const deactivatedDifficulty = isJV
        ? '.CR-difficulty-select'
        : isCR
          ? '.JV-difficulty-select'
          : null;
    if (deactivatedDifficulty) {
        const redundantDifficulties = document.querySelectorAll(
            `${deactivatedDifficulty} .difficulty-select.toggle-state`,
        );
        if (redundantDifficulties)
            redundantDifficulties.forEach((difficulty) =>
                difficulty.classList.remove('toggle-state'),
            );
    }

    // Remove any residual mouse hover effects
    document.querySelectorAll('.difficulty-select').forEach((difficulty) => {
        difficulty.classList.remove('toggle-mousehover');
    });

    let difficultyLvl = element.dataset.difficultyLevel as GlobalState['difficulty'];

    // Get all higher levels
    const prevAll = Array.from(parentWrapper.querySelectorAll('.difficulty-select')).slice(
        0,
        Array.from(parentWrapper.children).indexOf(element),
    );
    // Get all lower levels
    const nextAll = Array.from(parentWrapper.querySelectorAll('.difficulty-select')).slice(
        Array.from(parentWrapper.children).indexOf(element) + 1,
    );

    let animationDirection: 'forward' | 'backward' | null = null;

    if (!element.classList.contains('toggle-state')) {
        /**
         * Difficulty selected not currently active
         */
        element.classList.add('toggle-state');
        animationDirection = 'backward';
    } else if (
        /**
         * Difficulty selected is currently active but not the highest level
         */
        element.classList.contains('toggle-state') &&
        prevAll.some((el) => el.classList.contains('toggle-state'))
    ) {
        element.classList.add('toggle-state');
        animationDirection = 'forward';
    } else if (
        /**
         * Difficulty selected is currently active and is either the lowest level
         * (switch to other character's lowest level) or has a lower level to fallback to
         */
        element.classList.contains('toggle-state') &&
        !prevAll.some((el) => el.classList.contains('toggle-state'))
    ) {
        element.classList.toggle('toggle-state');
        const prevDifficultyLvl = (nextAll[0] as HTMLElement)?.dataset.difficultyLevel as
            | GlobalState['difficulty']
            | undefined;

        // Switch JV/CR logic
        let switchedLvl: GlobalState['difficulty'] | undefined;

        /**
         * Cases: if difficulty selected is the current difficulty
         * and that difficulty is already the lowest level
         * switch to other character's lowest difficulty
         *
         * Default: otherwise there is a difficulty level lower to
         * fallback to for the current active character
         */
        switch (difficultyLvl) {
            case 'JV-lvl-very-easy':
                document
                    .querySelector('.CR-difficulty-select .lvl-very-easy')
                    ?.classList.toggle('toggle-state');
                switchedLvl = 'CR-lvl-very-easy';
                break;
            case 'CR-lvl-very-easy':
                document
                    .querySelector('.JV-difficulty-select .lvl-very-easy')
                    ?.classList.toggle('toggle-state');
                switchedLvl = 'JV-lvl-very-easy';
                break;
            default:
                switchedLvl = prevDifficultyLvl;
        }
        animationDirection = 'forward';
        difficultyLvl = switchedLvl || difficultyLvl;
    }

    if (animationDirection) {
        animateCog(animationDirection);
    }

    // Activate all lower levels
    nextAll.forEach((el) => el.classList.add('toggle-state'));
    // Deactivate all higher levels
    prevAll.forEach((el) => el.classList.remove('toggle-state'));

    // Update global state
    setState('difficulty', difficultyLvl);
}

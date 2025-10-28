import { GlobalState } from 'src/state/globalState';

/**
 * Updates difficulty tags active/inactive classes.
 * @param difficultyLvl - The difficulty level.
 */
export function updateDifficultyTags(difficultyLvl: GlobalState['difficulty']): void {
    document.querySelectorAll('.difficulty-tag').forEach((el) => {
        el.classList.remove('difficulty-tag-active');
        el.classList.add('difficulty-tag-inactive');
    });
    document
        .querySelectorAll(`.difficulty-tag-wrapper [data-difficulty-level*="${difficultyLvl}"]`)
        .forEach((el) => {
            el.classList.remove('difficulty-tag-inactive');
            el.classList.add('difficulty-tag-active');
        });
}

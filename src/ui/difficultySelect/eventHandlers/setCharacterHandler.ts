/**
 * Handles clicks on character select.
 * @param element - The clicked character element.
 */
export function handleSetCharacter(element: HTMLElement): void {
    document.querySelectorAll('.character-select').forEach((el) => {
        el.classList.remove('character-active');
        el.classList.add('character-inactive');
    });
    const parent = element.parentElement;
    if (parent) {
        parent.classList.remove('character-inactive');
        parent.classList.add('character-active');
    }
}

// TODO : set state with selected character
// TODO : subscribe difficulty selection to character and set default difficulty

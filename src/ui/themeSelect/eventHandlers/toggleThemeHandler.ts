import { setState } from 'src/state/globalState';

/**
 * Handles click on theme toggle elements.
 * Toggles between diurnal and nocturnal themes, updating body classes and button state.
 * Sets global state for theme reactivity.
 * @param element - The clicked theme toggle element.
 */
export function handleToggleTheme(element: HTMLElement): void {
    const body = document.body;
    const isDiurnal = element.classList.contains('toggle-diurnal');

    if (isDiurnal) {
        body.classList.remove('diurnal-theme');
        body.classList.add('nocturnal-theme');
        element.classList.remove('fa-toggle-off', 'toggle-diurnal');
        element.classList.add('fa-toggle-on', 'toggle-nocturnal');

        setState('theme', 'nocturnal');
    } else {
        body.classList.remove('nocturnal-theme');
        body.classList.add('diurnal-theme');
        element.classList.remove('fa-toggle-on', 'toggle-nocturnal');
        element.classList.add('fa-toggle-off', 'toggle-diurnal');

        setState('theme', 'diurnal');
    }
}

/**
 * Handles mouseenter on theme toggle elements.
 * Adds 'kill-transitions' class to body to disable transitions.
 * @param element - The hovered over element.
 */
export function handleMouseenterTheme(element: HTMLElement): void {
    document.body.classList.add('kill-transitions');
}

/**
 * Handles mouseleave on theme toggle elements.
 * Removes 'kill-transitions' class from body.
 * @param element - The hovered out element.
 */
export function handleMouseleaveTheme(element: HTMLElement): void {
    document.body.classList.remove('kill-transitions');
}

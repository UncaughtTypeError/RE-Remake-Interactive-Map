/**
 * Handles mouseover on audio-toggle elements.
 * Toggles audio UI active/inactive based on toggle state.
 * @param element - The hovered element.
 */
export function handleMouseoverAudio(element: HTMLElement): void {
    const audioUI = document.getElementById('audio-ui') as HTMLElement | null;
    if (audioUI) {
        if (element.classList.contains('toggle-state')) {
            audioUI.classList.remove('audio-ui-active');
            audioUI.classList.add('audio-ui-inactive');
        } else {
            audioUI.classList.remove('audio-ui-inactive');
            audioUI.classList.add('audio-ui-active');
        }
    }
}

/**
 * Handles mouseout on audio-toggle elements.
 * Sets audio UI to inactive.
 * @param element - The element.
 */
export function handleMouseoutAudio(element: HTMLElement): void {
    const audioUI = document.getElementById('audio-ui') as HTMLElement | null;
    if (audioUI) {
        audioUI.classList.remove('audio-ui-active');
        audioUI.classList.add('audio-ui-inactive');
    }
}

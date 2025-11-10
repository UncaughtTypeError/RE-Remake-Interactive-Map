/**
 * Animates the gears in the specified panel by adding spinning classes to their elements.
 * Optionally, the animation can be stopped after a specified timeout.
 *
 * @param handedness - Which gears panel to animate: 'left' for bottom-left, 'right' for bottom-right.
 * @param timeout - The duration (in milliseconds) for which the gears should spin.
 * If not provided, the default duration is 5000 milliseconds.
 */
export function animateGears(handedness: 'left' | 'right', timeout?: number): void {
    const panelClass = handedness === 'left' ? '.gears-panel.bottom-left' : '.gears-panel.bottom-right';
    const gearsPanel = document.querySelector(panelClass) as HTMLElement | null;
    if (gearsPanel) {
        const fa2x = gearsPanel.querySelector('.fa-2x') as HTMLElement | null;
        const fa3x = gearsPanel.querySelector('.fa-3x') as HTMLElement | null;
        if (fa2x) fa2x.classList.add('fa-spin');
        if (fa3x) fa3x.classList.add('fa-spin-backwards');
        setTimeout(() => {
            if (fa2x) fa2x.classList.remove('fa-spin');
            if (fa3x) fa3x.classList.remove('fa-spin-backwards');
        }, timeout ?? 5000);
    }
}

/**
 * Stops the gears animation by removing the spinning classes from their elements.
 *
 * @param handedness - Which gears panel to stop: 'left' for bottom-left, 'right' for bottom-right.
 */
export function stopGearsAnimation(handedness: 'left' | 'right'): void {
    const panelClass = handedness === 'left' ? '.gears-panel.bottom-left' : '.gears-panel.bottom-right';
    const gearsPanel = document.querySelector(panelClass) as HTMLElement | null;
    if (gearsPanel) {
        const fa2x = gearsPanel.querySelector('.fa-2x') as HTMLElement | null;
        const fa3x = gearsPanel.querySelector('.fa-3x') as HTMLElement | null;
        if (fa2x) fa2x.classList.remove('fa-spin');
        if (fa3x) fa3x.classList.remove('fa-spin-backwards');
    }
}

/**
 * Animates the cog icon in the specified direction.
 * @param direction - 'forward' for spin or 'backward' for spin-backwards.
 */
export function animateCog(direction: 'forward' | 'backward'): void {
    const cog = document.querySelector('.options-panel .fa-cog') as HTMLElement | null;
    if (cog) {
        const className = direction === 'forward' ? 'fa-spin' : 'fa-spin-backwards';
        cog.classList.add(className);
        setTimeout(() => cog.classList.remove(className), 300);
    }
}

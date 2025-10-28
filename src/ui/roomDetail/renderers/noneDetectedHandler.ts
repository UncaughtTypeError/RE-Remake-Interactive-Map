/**
 * Handles 'none-detected' state for detail lists.
 */
export function handleNoneDetected() {
    document.querySelectorAll('.room-detail-list').forEach((list) => {
        const activeItems = list.querySelectorAll('.list-group-active').length;
        const hasNoneDetected = list.classList.contains('none-detected');
        const defaultEl = list.querySelector('.default') as HTMLElement | null;
        if (activeItems === 0 && !hasNoneDetected) {
            if (defaultEl) {
                defaultEl.classList.remove('list-default-inactive');
                defaultEl.classList.add('list-default-active');
            }
            list.classList.add('none-detected');
        } else if (activeItems > 0 && hasNoneDetected) {
            if (defaultEl) {
                defaultEl.classList.remove('list-default-active');
                defaultEl.classList.add('list-default-inactive');
            }
            list.classList.remove('none-detected');
        }
    });
}

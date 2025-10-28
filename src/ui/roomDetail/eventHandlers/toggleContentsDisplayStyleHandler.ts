/**
 * Handles click on trigger tiles, toggling states.
 * @param element - The clicked tile element.
 * @param event - The event (unused here).
 */
export function handleToggleContentsDisplayStyle(element: HTMLElement, event: Event): void {
    const displayStyle = element.dataset.displayStyle;
    const activeTab: HTMLElement | null = document.querySelector('.trigger-tile.toggle-state');

    if (activeTab?.dataset.displayStyle === displayStyle) return;

    // Reset tabs
    document.querySelectorAll('.trigger-tile').forEach((el) => el.classList.toggle('toggle-state'));
    document
        .querySelectorAll('.room-detail-contents')
        .forEach((el) => el.classList.remove('toggle-state'));

    const tabsToActivate = document.querySelectorAll(
        `.room-detail-contents[data-display-style="${displayStyle}"]`,
    );
    tabsToActivate.forEach((tab) => {
        tab.classList.add('toggle-state');
    });
}

/**
 * Handles click on room detail wrapper toggle, toggling states and icons.
 * @param element - The clicked toggle element.
 * @param event - The event (unused here).
 */
export function handleSwitchContentsTab(element: HTMLElement, event: Event): void {
    const contentsType = element.dataset.contentsType;
    const activeTab: HTMLElement | null = document.querySelector(
        '.room-detail-contents-tab.toggle-state',
    );

    if (activeTab?.dataset.contentsType === contentsType) return;

    // Reset tabs
    document.querySelectorAll('.room-detail-contents-tab .toggle-room-list').forEach((el) => {
        el.classList.toggle('toggle-state');
        el.classList.toggle('fa-dot-circle-o');
        el.classList.toggle('fa-circle-o');
    });
    document
        .querySelectorAll('.room-detail-contents-tab')
        .forEach((el) => el.classList.toggle('toggle-state'));
    document
        .querySelectorAll('.room-detail-contents-wrapper')
        .forEach((el) => el.classList.remove('toggle-state'));

    const tabsToActivate = document.querySelector(
        `.room-detail-contents-wrapper[data-contents-type="${contentsType}"]`,
    );
    if (tabsToActivate) {
        tabsToActivate.classList.add('toggle-state');
    }
}

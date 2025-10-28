/**
 * Handles click on room detail tabs, toggling active states and showing corresponding content.
 * @param element - The clicked tab element.
 * @param event - The event (unused here).
 */
export function handleSwitchDetailTab(element: HTMLElement, event: Event): void {
    const detailType = element.dataset.detailType;
    const activeTab: HTMLElement | null = document.querySelector(
        '.room-detail-tab-content.toggle-state',
    );

    if (activeTab?.dataset.detailType === detailType) return;

    // Reset tabs
    document
        .querySelectorAll('.room-detail-tab-content')
        .forEach((el) => el.classList.remove('toggle-state'));
    document.querySelectorAll('.toggle-detail-tab').forEach((el) => {
        el.classList.remove('toggle-state', 'fa-dot-circle-o');
        el.classList.add('fa-circle-o');
    });
    document
        .querySelectorAll('.room-detail-tab')
        .forEach((el) => el.classList.remove('toggle-state'));

    // Activate the clicked tab
    element.classList.add('toggle-state');

    // Toggle icon on the clicked tab
    const toggleIcon = element.querySelector('.toggle-detail-tab') as HTMLElement | null;
    if (toggleIcon) {
        toggleIcon.classList.toggle('toggle-state');
        toggleIcon.classList.toggle('fa-dot-circle-o');
        toggleIcon.classList.toggle('fa-circle-o');
    }

    const tabsToActivate = document.querySelector(
        `.room-detail-tab-content[data-detail-type="${detailType}"]`,
    );
    if (tabsToActivate) {
        tabsToActivate.classList.add('toggle-state');
    }
}

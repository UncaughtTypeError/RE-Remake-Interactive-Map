/**
 * Handles clicking on .list-group-tab to switch between Items/Biohazards and Rooms tabs
 * @param element - The clicked list-group-tab element
 */
export function handleTabSwitch(element: HTMLElement): void {
    // Toggle icons for all tabs
    document.querySelectorAll('.list-group-tab .toggle-group-tab').forEach((icon) => {
        icon.classList.toggle('fa-dot-circle-o');
        icon.classList.toggle('fa-circle-o');
    });

    // Toggle active state for all tabs
    document.querySelectorAll('.list-group-tab').forEach((tab) => {
        tab.classList.toggle('toggle-state');
    });

    // Toggle visibility of tab content
    document.querySelectorAll('.list-group-tab-content').forEach((content) => {
        content.classList.toggle('toggle-state');
    });
}

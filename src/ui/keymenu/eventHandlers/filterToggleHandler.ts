/**
 * Handles clicking on .keymenu .list-group-item to toggle individual item/biohazard filter
 * @param element - The clicked list-group-item element
 */
export function handleFilterToggle(element: HTMLElement): void {
    const filterKey = element.querySelector('.filter-key');
    if (!filterKey) return;

    const dataKey = filterKey.getAttribute('data-key');

    // Toggle filter state
    if (filterKey.classList.contains('filter-inactive')) {
        filterKey.classList.remove('filter-inactive');
        filterKey.classList.add('filter-active');
    } else {
        filterKey.classList.remove('filter-active');
        filterKey.classList.add('filter-inactive');
    }

    // Toggle all icon pins with matching data-icon-id
    document.querySelectorAll('.icon-pin').forEach((pin) => {
        const iconId = pin.getAttribute('data-icon-id');
        if (iconId === dataKey) {
            if (pin.classList.contains('map-marker-inactive')) {
                pin.classList.remove('map-marker-inactive');
                pin.classList.add('map-marker-active');
            } else if (pin.classList.contains('map-marker-active')) {
                pin.classList.remove('map-marker-active');
                pin.classList.add('map-marker-inactive');
            }
        }
    });
}

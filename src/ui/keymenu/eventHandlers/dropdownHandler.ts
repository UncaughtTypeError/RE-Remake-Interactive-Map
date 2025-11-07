/**
 * Handles clicking on dropdown trigger elements (#map-key-info, #door-lock-info)
 * @param element - The clicked dropdown trigger element
 */
export function handleDropdownTrigger(element: HTMLElement): void {
    if (element.classList.contains('toggle-state')) {
        // Close all dropdowns
        document.querySelectorAll('.icon-trigger').forEach((trigger) => {
            trigger.classList.remove('toggle-state');
        });
        document.querySelectorAll('.icon-trigger-dropdown').forEach((dropdown) => {
            dropdown.classList.remove('toggle-state');
        });
    } else {
        // Close all dropdowns first
        document.querySelectorAll('.icon-trigger').forEach((trigger) => {
            trigger.classList.remove('toggle-state');
        });
        document.querySelectorAll('.icon-trigger-dropdown').forEach((dropdown) => {
            dropdown.classList.remove('toggle-state');
        });

        // Open this dropdown
        element.classList.toggle('toggle-state');
        const nextDropdown = element.nextElementSibling;
        if (nextDropdown) {
            nextDropdown.classList.toggle('toggle-state');
        }
    }
}

/**
 * Handles clicking on dropdown close button
 * @param element - The clicked dropdown-close element
 */
export function handleDropdownClose(element: HTMLElement): void {
    document.querySelectorAll('.icon-trigger').forEach((trigger) => {
        trigger.classList.remove('toggle-state');
    });
    document.querySelectorAll('.icon-trigger-dropdown').forEach((dropdown) => {
        dropdown.classList.remove('toggle-state');
    });
}

/**
 * Handles clicking on icon-trigger-item to filter locked doors
 * @param element - The clicked icon-trigger-item element
 */
export function handleIconTriggerItem(element: HTMLElement): void {
    const dataDoorKey = element.getAttribute('data-door-key');

    if (element.classList.contains('toggle-state')) {
        // Remove filter
        element.classList.remove('toggle-state');
        document.querySelectorAll('.door-locked').forEach((door) => {
            const dataLocked = door.getAttribute('data-locked');
            if (dataLocked === dataDoorKey && dataDoorKey) {
                door.classList.remove(dataDoorKey);
            }
        });
    } else {
        // Apply filter
        element.classList.add('toggle-state');
        document.querySelectorAll('.door-locked').forEach((door) => {
            const dataLocked = door.getAttribute('data-locked');
            if (dataLocked === dataDoorKey && dataDoorKey) {
                door.classList.add(dataDoorKey);
            }
        });
    }
}

/**
 * Handles interactions with room tabs within keymenus
 */

/**
 * Handles mouseover on room marker tags to trigger map room hover
 * @param element - The icon-marker-tag element being hovered
 */
export function handleRoomMarkerHover(element: HTMLElement): void {
    const roomMarkerAttr = element.getAttribute('data-room')?.replace(/[']/g, '');
    if (!roomMarkerAttr) return;

    // Trigger mouseover on the corresponding room on the map
    const roomElements = document.querySelectorAll(`.${roomMarkerAttr}`);
    roomElements.forEach((room) => {
        const mouseoverEvent = new MouseEvent('mouseover', { bubbles: true, cancelable: true });
        room.dispatchEvent(mouseoverEvent);
    });
}

/**
 * Handles mouseleave on room marker tags to trigger map room unhover
 * @param element - The icon-marker-tag element being left
 */
export function handleRoomMarkerLeave(element: HTMLElement): void {
    const roomMarkerAttr = element.getAttribute('data-room')?.replace(/[']/g, '');
    if (!roomMarkerAttr) return;

    // Trigger mouseleave on the corresponding room on the map
    const roomElements = document.querySelectorAll(`.${roomMarkerAttr}`);
    roomElements.forEach((room) => {
        const mouseleaveEvent = new MouseEvent('mouseleave', { bubbles: true, cancelable: true });
        room.dispatchEvent(mouseleaveEvent);
    });
}

/**
 * Handles clicks on room marker tags to trigger map room click
 * @param element - The element with data-room attribute being clicked
 */
export function handleRoomMarkerClick(element: HTMLElement): void {
    const roomMarkerAttr = element.getAttribute('data-room')?.replace(/[']/g, '');
    if (!roomMarkerAttr) return;

    // Trigger click on the corresponding room on the map
    const roomElements = document.querySelectorAll(`.${roomMarkerAttr}`);
    roomElements.forEach((room) => {
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        room.dispatchEvent(clickEvent);
    });
}

/**
 * Handles clicks on icon pins within room tabs
 * @param element - The icon-pin element being clicked
 */
export function handleRoomTabIconPinClick(element: HTMLElement): void {
    const parent = element.parentElement;
    if (!parent) return;

    const roomMarkerAttr = parent.getAttribute('data-room')?.replace(/[']/g, '');
    const roomMarkerKey = element.className.split(' ')[0];

    // Toggle this pin's state
    if (element.classList.contains('map-marker-inactive')) {
        element.classList.remove('map-marker-inactive');
        element.classList.add('map-marker-active');
    } else {
        element.classList.remove('map-marker-active');
        element.classList.add('map-marker-inactive');
    }

    if (!roomMarkerAttr) return;

    // Find corresponding map markers
    const mapRoom = document.querySelector(`.${roomMarkerAttr}`);
    if (!mapRoom) return;

    const mapMarkers = mapRoom.querySelectorAll(`.${roomMarkerKey}`);

    // Handle item-of-interest markers with tooltips specially
    const hasTooltip = Array.from(mapMarkers).some(
        (marker) =>
            marker.classList.contains('item-of-interest') &&
            marker.querySelector('.icon-marker-tooltip'),
    );

    if (hasTooltip) {
        const roomMarkerToolTip = element.querySelector('.icon-marker-tooltip')?.textContent || '';
        mapMarkers.forEach((marker) => {
            const markerTooltip = marker.querySelector('.icon-marker-tooltip')?.textContent || '';
            if (markerTooltip === roomMarkerToolTip) {
                if (marker.classList.contains('map-marker-inactive')) {
                    marker.classList.remove('map-marker-inactive');
                    marker.classList.add('map-marker-active');
                } else {
                    marker.classList.remove('map-marker-active');
                    marker.classList.add('map-marker-inactive');
                }
            }
        });
    } else {
        // Toggle all markers with this key in this room
        mapMarkers.forEach((marker) => {
            if (marker.classList.contains('map-marker-inactive')) {
                marker.classList.remove('map-marker-inactive');
                marker.classList.add('map-marker-active');
            } else {
                marker.classList.remove('map-marker-active');
                marker.classList.add('map-marker-inactive');
            }
        });
    }
}

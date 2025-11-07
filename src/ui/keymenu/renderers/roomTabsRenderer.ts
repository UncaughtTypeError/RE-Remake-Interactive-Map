/**
 * Renders room tabs within keymenus by cloning icon marker tags
 * and setting up the necessary data attributes.
 * This should be called after the keymenu templates are loaded.
 */
export function renderRoomTabs(): void {
    // Clone all icon-marker-tag elements into both items and biohazards room tabs
    document.querySelectorAll('.icon-marker-tag').forEach((tag) => {
        const itemsRoomTab = document.querySelector('.items #tab-rooms');
        const biohazardsRoomTab = document.querySelector('.biohazards #tab-rooms');

        if (itemsRoomTab) {
            const itemsClone = tag.cloneNode(true) as HTMLElement;
            itemsRoomTab.appendChild(itemsClone);
        }

        if (biohazardsRoomTab) {
            const biohazardsClone = tag.cloneNode(true) as HTMLElement;
            biohazardsRoomTab.appendChild(biohazardsClone);
        }
    });

    // Remove non-biohazard pins from biohazards room tab
    const biohazardsRoomTab = document.querySelector('.biohazards #tab-rooms');
    if (biohazardsRoomTab) {
        biohazardsRoomTab.querySelectorAll('.icon-pin:not(.biohazard-info)').forEach((pin) => {
            pin.remove();
        });
    }

    // Remove biohazard-info pins from items room tab
    const itemsRoomTab = document.querySelector('.items #tab-rooms');
    if (itemsRoomTab) {
        itemsRoomTab.querySelectorAll('.biohazard-info').forEach((pin) => {
            pin.remove();
        });
    }

    // Add shadow icon markers and set data-room attributes
    document.querySelectorAll('#tab-rooms .icon-marker-tag').forEach((tag) => {
        // Append shadow icon marker if not already present
        if (!tag.querySelector('.shadow-icon-marker')) {
            const shadowMarker = document.createElement('i');
            shadowMarker.className = 'icon-marker shadow-icon-marker';
            shadowMarker.innerHTML = '<i class="fa"></i>';
            tag.appendChild(shadowMarker);
        }

        // Set data-room attribute based on room title
        const roomTitleElement = tag.querySelector('.icon-marker-room-title');
        if (roomTitleElement) {
            const roomMarkerTitle = roomTitleElement.textContent
                ?.toLowerCase()
                .split(' ')
                .join('-');
            if (roomMarkerTitle) {
                tag.setAttribute('data-room', roomMarkerTitle);
            }
        }
    });
}

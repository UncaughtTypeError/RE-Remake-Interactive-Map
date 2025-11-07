/**
 * Handles clicking on .trigger-keys (#items-toggle-keys, #biohazard-toggle-keys) to toggle all filters
 * @param element - The clicked trigger-keys element
 */
export function handleToggleAllKeys(element: HTMLElement): void {
    const triggerID = element.id;
    const icon = element.querySelector('.fa');
    if (!icon) return;

    if (icon.classList.contains('keys-inactive')) {
        // Activate all keys
        icon.classList.remove('keys-inactive');
        icon.classList.add('keys-active');
        icon.classList.remove('fa-circle-o');
        icon.classList.add('fa-dot-circle-o');

        if (triggerID === 'biohazard-toggle-keys') {
            // Activate all biohazard filters
            const biohazardFilters = document.querySelectorAll(
                '.biohazards .list-group-item .filter-key',
            );
            biohazardFilters.forEach((filterKey) => {
                if (filterKey.classList.contains('filter-inactive')) {
                    (filterKey.closest('.list-group-item') as HTMLElement)?.click();
                }
            });
            document
                .querySelectorAll('.biohazards .icon-pin, .icon-markers .icon-pin.biohazard')
                .forEach((pin) => {
                    pin.classList.remove('map-marker-inactive');
                    pin.classList.add('map-marker-active');
                });
        } else if (triggerID === 'items-toggle-keys') {
            // Activate all item filters
            const itemFilters = document.querySelectorAll('.items .list-group-item .filter-key');
            itemFilters.forEach((filterKey) => {
                if (filterKey.classList.contains('filter-inactive')) {
                    (filterKey.closest('.list-group-item') as HTMLElement)?.click();
                }
            });
            document.querySelectorAll('.items .icon-pin').forEach((pin) => {
                pin.classList.remove('map-marker-inactive');
                pin.classList.add('map-marker-active');
            });
            document.querySelectorAll('.icon-markers .icon-pin:not(.biohazard)').forEach((pin) => {
                pin.classList.remove('map-marker-inactive');
                pin.classList.add('map-marker-active');
            });
        }

        // Reset ranking display
        document.querySelectorAll('.stars-ranking-type').forEach((type) => {
            type.classList.remove('ranking-type-active');
            type.classList.add('ranking-type-inactive');
        });
        const defaultBiohazards = document.querySelector('[data-hazard="default-biohazards"]');
        if (defaultBiohazards) {
            defaultBiohazards.classList.remove('ranking-type-inactive');
            defaultBiohazards.classList.add('ranking-type-active');
        }
    } else {
        // Deactivate all keys
        icon.classList.remove('keys-active');
        icon.classList.add('keys-inactive');
        icon.classList.remove('fa-dot-circle-o');
        icon.classList.add('fa-circle-o');

        if (triggerID === 'biohazard-toggle-keys') {
            // Deactivate all biohazard filters
            const biohazardFilters = document.querySelectorAll(
                '.biohazards .list-group-item .filter-key',
            );
            biohazardFilters.forEach((filterKey) => {
                if (filterKey.classList.contains('filter-active')) {
                    (filterKey.closest('.list-group-item') as HTMLElement)?.click();
                }
            });
            document
                .querySelectorAll('.biohazards .icon-pin, .icon-markers .icon-pin.biohazard')
                .forEach((pin) => {
                    pin.classList.remove('map-marker-active');
                    pin.classList.add('map-marker-inactive');
                });
        } else if (triggerID === 'items-toggle-keys') {
            // Deactivate all item filters
            const itemFilters = document.querySelectorAll('.items .list-group-item .filter-key');
            itemFilters.forEach((filterKey) => {
                if (filterKey.classList.contains('filter-active')) {
                    (filterKey.closest('.list-group-item') as HTMLElement)?.click();
                }
            });
            document.querySelectorAll('.items .icon-pin').forEach((pin) => {
                pin.classList.remove('map-marker-active');
                pin.classList.add('map-marker-inactive');
            });
            document.querySelectorAll('.icon-markers .icon-pin:not(.biohazard)').forEach((pin) => {
                pin.classList.remove('map-marker-active');
                pin.classList.add('map-marker-inactive');
            });
        }

        // Reset ranking display
        document.querySelectorAll('.stars-ranking-type').forEach((type) => {
            type.classList.remove('ranking-type-active');
            type.classList.add('ranking-type-inactive');
        });
        const defaultBiohazards = document.querySelector('[data-hazard="default-biohazards"]');
        if (defaultBiohazards) {
            defaultBiohazards.classList.remove('ranking-type-inactive');
            defaultBiohazards.classList.add('ranking-type-active');
        }
    }
}

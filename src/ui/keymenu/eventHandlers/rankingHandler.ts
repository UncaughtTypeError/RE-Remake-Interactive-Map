/**
 * Helper function to filter biohazards by ranking
 */
function rankingSelect(ranking: string): void {
    document.querySelectorAll('.biohazards .list-group-item .filter-key').forEach((filterKey) => {
        const filterRanking = filterKey.getAttribute('data-ranking');
        const isActive = filterKey.classList.contains('filter-active');
        const matchesRanking = filterRanking === ranking;

        if (!isActive && matchesRanking) {
            // Activate this filter
            (filterKey.closest('.list-group-item') as HTMLElement)?.click();
        } else if (isActive && !matchesRanking) {
            // Deactivate this filter
            (filterKey.closest('.list-group-item') as HTMLElement)?.click();
        }
    });
}

/**
 * Handles clicking on ranking increment/decrement buttons or dropdown items
 * @param element - The clicked ranking control element
 */
export function handleRankingChange(element: HTMLElement): void {
    // Turn off toggle-all-keys if active
    const biohazardToggleKeys = document.querySelector('#biohazard-toggle-keys .keys-active');
    if (biohazardToggleKeys) {
        (biohazardToggleKeys.closest('#biohazard-toggle-keys') as HTMLElement)?.click();
    }

    const activeRanking = document.querySelector('.ranking-type-active');
    const dataRanking = activeRanking?.getAttribute('data-ranking') || 'default';

    if (element.classList.contains('ranking-increment')) {
        // Increment ranking (towards alpha)
        const rankingOrder = [
            'default',
            'eta',
            'zeta',
            'epsilon',
            'delta',
            'gamma',
            'beta',
            'alpha',
        ];
        const currentIndex = rankingOrder.indexOf(dataRanking);
        const nextIndex = (currentIndex + 1) % rankingOrder.length;
        const nextRanking = rankingOrder[nextIndex];

        // Update active ranking
        document.querySelectorAll('.stars-ranking-type').forEach((type) => {
            type.classList.remove('ranking-type-active');
            type.classList.add('ranking-type-inactive');
        });
        document.querySelectorAll(`[data-hazard="${nextRanking}-biohazards"]`).forEach((type) => {
            type.classList.remove('ranking-type-inactive');
            type.classList.add('ranking-type-active');
        });

        rankingSelect(nextRanking);
    } else if (element.classList.contains('ranking-decrement')) {
        // Decrement ranking (towards eta)
        const rankingOrder = [
            'eta',
            'default',
            'alpha',
            'beta',
            'gamma',
            'delta',
            'epsilon',
            'zeta',
        ];
        const currentIndex = rankingOrder.indexOf(dataRanking);
        const nextIndex = (currentIndex + 1) % rankingOrder.length;
        const nextRanking = rankingOrder[nextIndex];

        // Update active ranking
        document.querySelectorAll('.stars-ranking-type').forEach((type) => {
            type.classList.remove('ranking-type-active');
            type.classList.add('ranking-type-inactive');
        });
        document.querySelectorAll(`[data-hazard="${nextRanking}-biohazards"]`).forEach((type) => {
            type.classList.remove('ranking-type-inactive');
            type.classList.add('ranking-type-active');
        });

        rankingSelect(nextRanking);
    } else if (element.classList.contains('ranking-dropdown-item')) {
        // Direct selection from dropdown
        const selectedRanking = element.getAttribute('data-ranking') || 'default';

        // Update active ranking
        document.querySelectorAll('.stars-ranking-type').forEach((type) => {
            type.classList.remove('ranking-type-active');
            type.classList.add('ranking-type-inactive');
        });

        // Update both dropdown and display
        element.classList.remove('ranking-type-inactive');
        element.classList.add('ranking-type-active');

        document
            .querySelectorAll(
                `.stars-ranking-display .stars-ranking-type[data-ranking="${selectedRanking}"]`,
            )
            .forEach((type) => {
                type.classList.remove('ranking-type-inactive');
                type.classList.add('ranking-type-active');
            });

        rankingSelect(selectedRanking);
    }
}

/**
 * Handles clicking on ranking dropdown toggle
 * @param element - The clicked ranking-dropdown-select element
 */
export function handleRankingDropdownToggle(element: HTMLElement): void {
    const dropdown = document.querySelector('.stars-ranking-dropdown');
    if (!dropdown) return;

    if (element.classList.contains('dropdown-inactive')) {
        element.classList.remove('dropdown-inactive');
        element.classList.add('dropdown-active');
        element.classList.remove('fa-caret-down');
        element.classList.add('fa-caret-up');
        dropdown.classList.add('toggle-state');
    } else if (element.classList.contains('dropdown-active')) {
        element.classList.remove('dropdown-active');
        element.classList.add('dropdown-inactive');
        element.classList.remove('fa-caret-up');
        element.classList.add('fa-caret-down');
        dropdown.classList.remove('toggle-state');
    }
}

/**
 * Clones active templates to detail lists.
 */
export function cloneToDetailLists() {
    const biohazardsDetail = document.querySelector(
        '.room-detail-list-biohazards',
    ) as HTMLElement | null;
    if (biohazardsDetail) {
        document.querySelectorAll('.active-biohazard').forEach((template) => {
            const clone = template.cloneNode(true) as HTMLElement;
            biohazardsDetail.appendChild(clone);
        });
    }

    const itemsDetail = document.querySelector('.room-detail-list-items') as HTMLElement | null;
    if (itemsDetail) {
        document.querySelectorAll('.active-item').forEach((template) => {
            const clone = template.cloneNode(true) as HTMLElement;
            itemsDetail.appendChild(clone);
        });
    }
}

/**
 * Cleans up temporary active classes from shadow templates.
 */
export function cleanupActiveClasses() {
    document
        .querySelectorAll('.active-biohazard')
        .forEach((el) => el.classList.remove('active-biohazard'));
    document.querySelectorAll('.active-item').forEach((el) => el.classList.remove('active-item'));
}

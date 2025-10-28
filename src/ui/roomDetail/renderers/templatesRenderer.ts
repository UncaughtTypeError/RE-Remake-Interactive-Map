import { ItemGroup, BiohazardGroup } from 'roomDetail/types/types';
import { createQtyUpdater, slugifyString } from 'src/utils';

/**
 * Activates templates for items and biohazards based on groups.
 * @param itemsGroup - The grouped items.
 * @param biohazardsGroup - The grouped biohazards.
 */
export function activateTemplates(
    itemsGroup: Map<string, ItemGroup>,
    biohazardsGroup: Map<string, BiohazardGroup>,
) {
    document.querySelectorAll('.list-group-item').forEach((el) => {
        el.classList.remove('list-group-active');
        el.classList.add('list-group-inactive');
    });

    const itemQtyUpdater = createQtyUpdater(2); // threshold for items
    const bioQtyUpdater = createQtyUpdater(0); // threshold for biohazards

    // Activate item templates
    itemsGroup.forEach((group, type) => {
        const template = document.querySelector(
            `.room-detail-shadow-items .list-group-item[data-type="${type}"]`,
        ) as HTMLElement | null;
        if (template) {
            template.classList.remove('list-group-inactive');
            template.classList.add('list-group-active');
            const qtyEl = template.querySelector('.difficulty-qty-summary') as HTMLElement | null;
            itemQtyUpdater(qtyEl, group.count);

            let infoWrapper = template.querySelector('.icon-info-wrapper') as HTMLElement | null;
            if (!infoWrapper) {
                infoWrapper = document.createElement('div');
                infoWrapper.classList.add('icon-info-wrapper');
                template.querySelector('.key-alt')?.after(infoWrapper);
            }
            infoWrapper.innerHTML = '';
            group.items.forEach((item) => {
                // Duplicate prevention checks
                const existingSpan = infoWrapper!.querySelector(
                    `[data-item-name="${slugifyString(item.name)}"]`,
                );
                if (existingSpan) return;

                const span = document.createElement('span');
                span.classList.add('icon-info');
                span.setAttribute('data-item-name', slugifyString(item.name));
                span.textContent = item.name;
                console.log({ item });

                // Display uses if relevant
                if (item.uses && item.uses > 1) {
                    const spanUsesQty = document.createElement('span');
                    spanUsesQty.classList.add('uses-qty');
                    spanUsesQty.textContent = ` (Uses x${item.uses})`;
                    spanUsesQty.setAttribute('data-group-qty', item.uses.toString());
                    span.appendChild(spanUsesQty);
                }

                // Display item group quantity if relevant
                if (item.qty > 1) {
                    const spanGroupQty = document.createElement('span');
                    spanGroupQty.classList.add('group-qty');
                    spanGroupQty.textContent = ` x${item.qty}`;
                    spanGroupQty.setAttribute('data-group-qty', item.qty.toString());
                    span.appendChild(spanGroupQty);
                }

                // Display item quantity if relevant
                if (item.qtyItems) {
                    const spanItemQty = document.createElement('span');
                    spanItemQty.classList.add('item-qty');
                    spanItemQty.textContent = ` (x${item.qtyItems})`;
                    spanItemQty.setAttribute('data-item-qty', item.qtyItems.toString());
                    span.appendChild(spanItemQty);
                }

                infoWrapper!.appendChild(span);
            });
            template.classList.add('active-item');
        }
    });

    // Activate biohazard templates
    biohazardsGroup.forEach((group, code) => {
        const template = document.querySelector(
            `.room-detail-shadow-biohazards .list-group-item[data-code="${code}"]`,
        ) as HTMLElement | null;
        if (template) {
            template.classList.remove('list-group-inactive');
            template.classList.add('list-group-active');
            const qtyEl = template.querySelector('.difficulty-qty-summary') as HTMLElement | null;
            bioQtyUpdater(qtyEl, group.qty);

            if (group.isAmbush) {
                let infoWrapper = template.querySelector(
                    '.icon-info-wrapper',
                ) as HTMLElement | null;
                if (!infoWrapper) {
                    infoWrapper = document.createElement('div');
                    infoWrapper.classList.add('icon-info-wrapper');
                    template.querySelector('.key-alt')?.after(infoWrapper);
                }
                infoWrapper.innerHTML = '';

                const span = document.createElement('span');
                span.classList.add('icon-info');
                span.textContent = 'Ambush threat';

                const alertTag = document.createElement('span');
                alertTag.classList.add('alert-tag');
                alertTag.textContent = 'Alert';

                span!.appendChild(alertTag);
                infoWrapper!.appendChild(span);
            }
            template.classList.add('active-biohazard');
        }
    });
}

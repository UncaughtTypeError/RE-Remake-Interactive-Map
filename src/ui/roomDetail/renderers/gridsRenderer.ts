import { appendGridHex } from 'src/utils';

/**
 * Builds grid views for items and biohazards.
 */
export function buildGrids() {
    // Build grid for items
    document.querySelectorAll('.items.room-detail-list .list-group-item').forEach((listItem) => {
        const keyAlt = listItem.querySelector('.key-alt') as HTMLElement | null;
        if (!keyAlt) return;
        const gridKey = keyAlt.dataset.key || '';

        const metaData = {
            key: gridKey,
            qty: null as string | null, // Unique items are split out, no qty is displayed for single items
            tooltip: gridKey,
        };

        const splitItems = listItem.querySelectorAll('.icon-info');

        const gridGroupWrapper = document.querySelector(
            '.items.grid-group-wrapper',
        ) as HTMLElement | null;

        if (gridGroupWrapper) {
            splitItems.forEach((item) => {
                metaData.qty =
                    (item.querySelector('.group-qty') as HTMLElement)?.dataset.groupQty || null;
                const cssClass = (item as HTMLElement).dataset.itemName;
                appendGridHex(gridGroupWrapper, metaData, [cssClass], []);
            });
        }
    });

    // Build grid for biohazards
    document
        .querySelectorAll('.biohazards.room-detail-list .list-group-item')
        .forEach((listItem) => {
            const keyAlt = listItem.querySelector('.key-alt') as HTMLElement | null;
            if (!keyAlt) return;
            const gridRanking = keyAlt.dataset.ranking || '';
            const gridKey = keyAlt.dataset.key || '';
            const gridQty = listItem.querySelector('.qty')?.textContent;

            const gridVenomous = listItem
                .querySelector('.biohazard-venomous')
                ?.cloneNode(true) as HTMLElement | null;
            const gridBiohazardInfo = listItem
                .querySelector('.biohazard-info')
                ?.cloneNode(true) as HTMLElement | null;

            const metaData = {
                key: gridKey,
                qty: gridQty,
                tooltip: gridBiohazardInfo?.dataset.info,
            };

            const gridGroupWrapper = document.querySelector(
                '.biohazards.grid-group-wrapper',
            ) as HTMLElement | null;

            if (gridGroupWrapper) {
                appendGridHex(
                    gridGroupWrapper,
                    metaData,
                    [gridRanking],
                    [gridBiohazardInfo, gridVenomous],
                );
            }
        });
}

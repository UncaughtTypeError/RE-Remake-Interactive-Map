import { RoomDetailsData, DifficultyLevel, STARSRanking } from 'src/data';
import { fadeIn } from 'src/utils';

/**
 * Internal map from STARSRanking to CSS class.
 */
const STAR_CLASS_MAP: Record<STARSRanking, `star-${0 | 1 | 2 | 3}${'' | '-half'}`> = {
    '0': 'star-0',
    '0Half': 'star-0-half',
    '1': 'star-1',
    '1Half': 'star-1-half',
    '2': 'star-2',
    '2Half': 'star-2-half',
    '3': 'star-3',
};

/**
 * Maps a STARSRanking to its CSS class.
 * @example toStarClass('2Half') // 'star-2-half'
 * @example toStarClass('3') // 'star-3'
 */
export function toStarRankingClass(rank: STARSRanking): string {
    return STAR_CLASS_MAP[rank];
}

/**
 * Container: Renders featured markers for items and biohazards with fade-in animation.
 * @param room - The room data.
 * @param difficulty - The current difficulty level.
 */
export function renderFeaturedMarkers(room: RoomDetailsData, difficulty: DifficultyLevel) {
    const featuredMarkers = document.querySelector('.room-featured-markers') as HTMLElement | null;
    if (featuredMarkers) {
        const markersContainer = featuredMarkers.querySelector(
            '.featured-icon-markers',
        ) as HTMLElement | null;
        if (markersContainer) {
            // Hide all elements initially
            Array.from(markersContainer.children).forEach((child) => {
                const el = child as HTMLElement;
                el.classList.add('hide');
                el.style.opacity = '0';
            });

            // For items and interactables
            const featuredItems = [
                ...room.roomDetails.items,
                ...room.roomDetails.interactables,
            ].filter((item) => item.isFeatured && item.difficultyLevel.includes(difficulty));

            featuredItems.forEach((item) => {
                if (item.isFeatured && item.difficultyLevel.includes(difficulty)) {
                    const itemType = item.type;
                    const element = markersContainer.querySelector(
                        `[data-feature-item-id="${itemType}"]`,
                    ) as HTMLElement | null;
                    if (element) {
                        // Update tooltip
                        const tooltip = element.querySelector(
                            '.icon-marker-tooltip',
                        ) as HTMLElement | null;
                        if (tooltip) {
                            tooltip.innerHTML = '';
                            const span = document.createElement('span');
                            span.textContent = item.name;
                            tooltip.appendChild(span);
                        }
                        // Fade in
                        fadeIn(element, 500);
                        element.classList.remove('hide');
                    }
                }
            });

            // For biohazards
            room.roomDetails.biohazards.forEach((bio) => {
                if (bio.isFeatured && bio.difficultyLevel.includes(difficulty)) {
                    const element = markersContainer.querySelector(
                        '.featured-biohazard',
                    ) as HTMLElement | null;
                    if (element) {
                        element.setAttribute('data-code', bio.code.toLowerCase());
                        element.classList.add(toStarRankingClass(bio.starsRanking.ranking));

                        // Update tooltip
                        const tooltip = element.querySelector(
                            '.icon-marker-tooltip',
                        ) as HTMLElement | null;
                        if (tooltip) {
                            tooltip.innerHTML = '';
                            const span = document.createElement('span');
                            span.textContent = bio.name;
                            tooltip.appendChild(span);
                        }
                        // Fade in
                        fadeIn(element, 500);
                        element.classList.remove('hide');
                    }
                }
            });
        }
    }
}

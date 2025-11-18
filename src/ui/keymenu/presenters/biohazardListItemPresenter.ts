/**
 * @file Presenter for biohazard list items in the keymenu.
 * @description Creates DOM elements for individual biohazards in the keymenu biohazards list.
 */
import { ProcessedBiohazardData } from '../processors/biohazardsListProcessor';
import { STARSRanking } from 'src/data';
import { getStarIconClasses, getVisibleStarIconClasses } from '../helpers/starIconHelpers';

/**
 * Maps S.T.A.R.S. ranking to star class name for CSS.
 * @param ranking - The S.T.A.R.S. ranking value.
 * @returns The star class name (e.g., "star-0", "star-1Half").
 */
function getStarClassName(ranking: STARSRanking): string {
    return `star-${ranking}`;
}

/**
 * Converts a name to kebab-case for CSS class names.
 * @param name - The name to convert (e.g., "Fountain Plant").
 * @returns The kebab-cased name (e.g., "fountain-plant").
 */
function toKebabCase(name: string): string {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

/**
 * Creates a list item element for a biohazard in the keymenu.
 * Generates the exact HTML structure required by the original jQuery implementation.
 * @param biohazard - The processed biohazard data.
 * @returns The created list item element.
 */
export function createBiohazardListItem(biohazard: ProcessedBiohazardData): HTMLElement {
    const kebabName = toKebabCase(biohazard.name);
    const rankingLowercase = biohazard.starsClassification.toLowerCase();
    const starClassName = getStarClassName(biohazard.starsRanking);

    // Create main list item container
    const listItem = document.createElement('div');
    listItem.className = `list-group-item key-${kebabName} list-group-inactive`;
    listItem.dataset.biohazardId = biohazard.id;
    listItem.dataset.biohazardCode = biohazard.code;

    // Create icon group with star icons (only visible stars, no empty ones)
    const iconGroup = document.createElement('div');
    iconGroup.className = 'icon-group fa-stack fa-fw';

    // Get only visible star icon classes (excludes empty stars)
    const visibleStarIconClasses = getVisibleStarIconClasses(biohazard.starsRanking);
    visibleStarIconClasses.forEach((iconClass) => {
        const starIcon = document.createElement('i');
        starIcon.className = `fa ${iconClass} fa-stack-1x fa-inverse`;
        iconGroup.appendChild(starIcon);
    });

    // Create info icon
    const infoIcon = document.createElement('i');
    infoIcon.className = 'fa fa-info-circle biohazard-info';
    infoIcon.dataset.info = kebabName;

    // Create text node for biohazard name (direct text, not wrapped)
    const nameText = document.createTextNode(` ${biohazard.name} `);

    // Create filter key icon with all required attributes
    const filterKey = document.createElement('i');
    filterKey.className = `fa fa-exclamation-triangle fa-fw key-alt filter-key ${starClassName} filter-inactive`;
    filterKey.dataset.ranking = rankingLowercase;
    filterKey.dataset.key = biohazard.code;

    // Create icon marker tooltip with star rating
    const tooltip = document.createElement('div');
    tooltip.className = `icon-marker-tooltip ${rankingLowercase}`;

    const tooltipName = document.createElement('div');
    tooltipName.textContent = biohazard.name + ' ';

    // Add biohazard code
    const codeSmall = document.createElement('small');
    codeSmall.textContent = biohazard.code;
    tooltipName.appendChild(codeSmall);

    tooltip.appendChild(tooltipName);

    // Add 3 star icons based on ranking
    const starIconClasses = getStarIconClasses(biohazard.starsRanking);
    starIconClasses.forEach((iconClass) => {
        const starIcon = document.createElement('i');
        starIcon.className = `fa ${iconClass}`;
        tooltip.appendChild(starIcon);
    });

    // Assemble the list item in correct order
    listItem.appendChild(iconGroup);
    listItem.appendChild(infoIcon);
    listItem.appendChild(nameText);
    listItem.appendChild(filterKey);
    listItem.appendChild(tooltip);

    return listItem;
}

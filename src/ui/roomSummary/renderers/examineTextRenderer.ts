/**
 * @file Examine text renderer for room summary component.
 * @description Renders room examine/overview text excerpt from API data.
 */

import { RoomDetailsData } from 'src/data/types';

/**
 * Handles examine text display from API room data.
 * @param room - The room data.
 */
export function handleExamineText(room: RoomDetailsData): void {
    const examineOverviewEl = document.querySelector<HTMLElement>(
        '.room-info-wrapper .room-examine-overview',
    );
    if (!examineOverviewEl) return;

    // Get examine text from API data
    const examineText = room.intel.examineText;

    if (examineText && examineText.trim() !== '') {
        examineOverviewEl.textContent = examineText;
        examineOverviewEl.classList.add('excerpt-active');
        examineOverviewEl.classList.remove('excerpt-inactive');
    } else {
        examineOverviewEl.textContent = '';
        examineOverviewEl.classList.add('excerpt-inactive');
        examineOverviewEl.classList.remove('excerpt-active');
    }
}

/**
 * @file Threat level renderer for room summary component.
 * @description Sets the threat level display based on difficulty and room data.
 */

import { RoomDetailsData, RoomThreatLevelEnum, DifficultyLevel } from 'src/data/types';
import { deSlugifyString } from 'src/utils';

/**
 * Sets the threat level display, including label and icon.
 * @param room - The room data.
 * @param difficulty - The current difficulty level.
 */
export function setThreatLevel(room: RoomDetailsData, difficulty: DifficultyLevel): void {
    const riskEntry = room.overview.risk.find((entry) =>
        entry.difficultyLevel.includes(difficulty),
    );
    const threatLevel = riskEntry?.threatLevel ?? RoomThreatLevelEnum.UNKNOWN;

    document
        .querySelectorAll('.room-summary-wrapper .room-threat-level')
        .forEach((roomThreatLevelEl) => {
            const threatLevelEl = roomThreatLevelEl as HTMLElement;
            threatLevelEl.dataset.threatLevel = threatLevel;

            const roomThreatLabel = threatLevelEl.querySelector(
                '.room-threat-label',
            ) as HTMLElement | null;
            if (roomThreatLabel) {
                roomThreatLabel.textContent = deSlugifyString(threatLevel);
            }

            const threatIcon = threatLevelEl.querySelector(
                '.room-threat-icon',
            ) as HTMLElement | null;
            if (threatIcon) {
                threatIcon.classList.remove('fa-exclamation', 'fa-question', 'fa-check');
                if (threatLevel === RoomThreatLevelEnum.CLEAR) {
                    threatIcon.classList.add('fa-check');
                } else if (threatLevel === RoomThreatLevelEnum.UNKNOWN) {
                    threatIcon.classList.add('fa-question');
                } else {
                    threatIcon.classList.add('fa-exclamation');
                }
            }
        });
}

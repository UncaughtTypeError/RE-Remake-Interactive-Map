/**
 * @file Access control renderer for room summary component.
 * @description Renders access control information (required keys, etc.) from API data.
 */

import { RoomDetailsData, AccessTypeEnum, AccessKeyEnum } from 'src/data/types';
import { toTitleCase } from 'src/utils';
import { getState } from 'src/state/globalState';

/**
 * Handles access control display and toggles related classes.
 * Simplified version for room summary (no padlock toggle).
 * @param room - The room data.
 */
export function handleAccessControl(room: RoomDetailsData): void {
    const accessControlEl = document.querySelector<HTMLElement>(
        '.room-info-wrapper .access-control',
    );
    const requiredAccessEl = document.querySelector<HTMLElement>(
        '.room-info-wrapper .required-to-access',
    );
    const lockIcon = document.querySelector<HTMLElement>('.room-info-wrapper .fa-lock');

    if (!accessControlEl || !requiredAccessEl) return;

    const accessControl = room.overview.accessControl;

    if (accessControl.accessType === AccessTypeEnum.NONE) {
        // No access control required
        requiredAccessEl.textContent = '';
        accessControlEl.classList.remove('access-control-active');
        accessControlEl.classList.add('access-control-inactive');

        if (lockIcon) {
            lockIcon.classList.remove('access-control-valid');
            lockIcon.classList.add('access-control-invalid');
        }
    } else {
        // Access control required
        const accessKey = accessControl.accessKey;
        const accessType = accessControl.accessType;
        let requiredToAccess = null;

        if (Array.isArray(accessKey)) {
            const activeCharacter = getState('activeCharacter');
            requiredToAccess = accessKey.find((key) => key.character === activeCharacter)!.key;
        } else if (accessKey !== AccessKeyEnum.NONE) {
            requiredToAccess = accessKey;
        } else {
            requiredToAccess = accessType;
        }

        if (requiredToAccess) {
            requiredAccessEl.textContent = toTitleCase(requiredToAccess);
            accessControlEl.classList.remove('access-control-inactive');
            accessControlEl.classList.add('access-control-active');

            if (lockIcon) {
                lockIcon.classList.remove('access-control-invalid');
                lockIcon.classList.add('access-control-valid');
            }
        }
    }
}

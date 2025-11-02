/**
 * @file Access control renderer for room summary component.
 * @description Renders access control information (required keys, etc.) from API data.
 */

import { RoomDetailsData, AccessType, AccessTypeEnum, AccessKeyEnum } from 'src/data/types';
import { toTitleCase } from 'src/utils';
import { getState } from 'src/state/globalState';

/**
 * Handles access control display and toggles related classes.
 * Simplified version for room summary (no padlock toggle).
 * @param room - The room data.
 */
export function handleAccessControl(room: RoomDetailsData): void {
    const accessControlEl = document.querySelector<HTMLElement>(
        '.room-summary-wrapper .access-control',
    );
    const requiredAccessEl = document.querySelector<HTMLElement>(
        '.room-summary-wrapper .required-to-access',
    );
    const accessKeyTypeEl = document.querySelector<HTMLElement>(
        '.room-summary-wrapper .access-key-type',
    );
    const lockIcon = document.querySelector<HTMLElement>('.room-summary-wrapper .fa-lock');

    if (!accessControlEl || !requiredAccessEl || !accessKeyTypeEl) return;

    const accessControl = room.overview.accessControl;

    if (accessControl.accessType === AccessTypeEnum.NONE) {
        // No access control required
        requiredAccessEl.textContent = '';
        accessKeyTypeEl.innerHTML = '';
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

        // Icon map based on accessType
        const accessIconMap: Record<AccessType, string> = {
            none: '', // no icon
            key: 'fa-key',
            oneWay: 'fa-sign-out',
            limitedUse: 'fa-exclamation-circle',
            blocked: 'fa-ban',
            puzzle: 'fa-puzzle-piece',
        };

        const iconClass = accessIconMap[accessType];
        if (iconClass) {
            accessKeyTypeEl.innerHTML = '';
            const iconEl = document.createElement('i');
            iconEl.classList.add(iconClass, 'fa');
            accessKeyTypeEl.appendChild(iconEl);
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

import { getState } from 'src/state/globalState';
import { RoomDetailsData, AccessType, AccessTypeEnum, AccessKeyEnum } from 'src/data';
import { toTitleCase, toggleClass } from 'src/utils';

/**
 * Handles access control display and toggles related classes.
 * @param room - The room data.
 */
export function handleAccessControl(room: RoomDetailsData) {
    const accessControl = room.overview.accessControl;

    const accessControlEls = document.querySelectorAll('.access-control');
    const requiredToAccessEls = document.querySelectorAll('.required-to-access');
    const carryPadlockEls = document.querySelectorAll('.carry-padlock');
    const accessKeyTypeEls = document.querySelectorAll('.access-key-type');

    if (accessControl.accessType === AccessTypeEnum.NONE) {
        requiredToAccessEls.forEach((el) => {
            el.innerHTML = '';
        });
        toggleClass(accessControlEls, 'access-control-inactive', 'access-control-active');
        carryPadlockEls.forEach((el) => el.classList.remove('toggle-state'));
        accessKeyTypeEls.forEach((el) => (el.innerHTML = ' '));
    } else {
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
            accessKeyTypeEls.forEach((el) => (el.innerHTML = ''));
            accessKeyTypeEls.forEach((el) => {
                const iconEl = document.createElement('i');
                iconEl.classList.add(iconClass, 'fa');
                el.appendChild(iconEl);
            });
        }

        if (requiredToAccess) {
            requiredToAccessEls.forEach((el) => {
                el.textContent = toTitleCase(requiredToAccess);
            });
            toggleClass(accessControlEls, 'access-control-active', 'access-control-inactive');
            carryPadlockEls.forEach((el) => el.classList.add('toggle-state'));
        }
    }
}

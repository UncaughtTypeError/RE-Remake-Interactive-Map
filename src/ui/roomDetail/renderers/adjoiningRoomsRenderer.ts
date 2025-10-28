import { getState } from 'src/state/globalState';
import { AdjoiningRoom, AccessControl, AccessKeyEnum, AccessType, RoomDetailsData } from 'src/data';
import { toTitleCase } from 'src/utils';

/**
 * Presenter: Creates a <ul> list of adjoining rooms from data (pure function, no side effects, no DOM queries).
 * @param adjoiningRooms - Array of adjoining room objects.
 * @param accessIconMap - Map of access types to icon classes.
 * @returns The populated <ul> element ready to append.
 */
export function createAdjoiningRoomsList(
    adjoiningRooms: AdjoiningRoom[],
    accessIconMap: Record<AccessType, string>,
): HTMLUListElement {
    const ul = document.createElement('ul');
    adjoiningRooms.forEach((adjRoom) => {
        const li = document.createElement('li');
        li.classList.add('adjoining-room', 'room');
        li.dataset.room = adjRoom.id;
        li.textContent = toTitleCase(adjRoom.id.replace(/-/g, ' '));

        // Determine access name and icon
        const { accessKey, accessType } = adjRoom.accessControl as AccessControl;
        if (accessType !== 'none') {
            let accessName: string;
            if (accessKey === AccessKeyEnum.NONE) {
                accessName = toTitleCase(accessType);
            } else {
                let characterAccessKey;
                if (Array.isArray(accessKey)) {
                    const activeCharacter = getState('activeCharacter');
                    characterAccessKey = accessKey.find(
                        (key) => key.character === activeCharacter,
                    )!.key;
                } else {
                    characterAccessKey = accessKey;
                }
                accessName = toTitleCase(characterAccessKey);
            }

            if (accessName) {
                const supEl = document.createElement('sup');
                supEl.textContent = accessName;

                const iconClass = accessIconMap[accessType];
                if (iconClass) {
                    const iconEl = document.createElement('i');
                    iconEl.classList.add(iconClass, 'fa');
                    supEl.appendChild(iconEl);
                }

                li.appendChild(supEl);
            }
        }

        ul.appendChild(li);
    });
    return ul;
}

/**
 * Container: Renders adjoining rooms by querying DOM, clearing, and appending the presenter's output.
 * @param room - The room data.
 */
export function renderAdjoiningRooms(room: RoomDetailsData) {
    // Icon map based on accessType
    const accessIconMap: Record<AccessType, string> = {
        none: '', // no icon
        key: 'fa-key',
        oneWay: 'fa-sign-out',
        limitedUse: 'fa-exclamation-circle',
        blocked: 'fa-ban',
        puzzle: 'fa-puzzle-piece',
    };

    const adjoiningRoomsEl = document.querySelector('.adjoining-rooms ul') as HTMLElement | null;
    if (adjoiningRoomsEl) {
        adjoiningRoomsEl.innerHTML = ''; // Clear existing
        const list = createAdjoiningRoomsList(room.adjoiningRooms, accessIconMap); // Call presenter
        adjoiningRoomsEl.appendChild(list); // Append result
    }
}

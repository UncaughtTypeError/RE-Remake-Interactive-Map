import { RoomDetailsData } from 'src/data';

/**
 * Sets the room thumbnail with a random delay for loading effect.
 * @param room - The room data.
 */
export function setRoomThumbnail(room: RoomDetailsData) {
    const roomThumbnail = document.querySelector('.room-thumbnail') as HTMLElement | null;
    if (roomThumbnail) {
        roomThumbnail.style.removeProperty('background-image');
        roomThumbnail.id = 'fetching-img-data';
        if (room.thumbnailSrc) {
            const timeout = Math.floor(Math.random() * (2000 - 500 + 1)) + 500; // Random timeout between 0.5s and 2s
            setTimeout(() => {
                roomThumbnail.id = room.id;
                roomThumbnail.style.backgroundImage = `url(${room.thumbnailSrc})`;
            }, timeout);
        } else {
            roomThumbnail.id = 'unknown-room';
        }
    }
}

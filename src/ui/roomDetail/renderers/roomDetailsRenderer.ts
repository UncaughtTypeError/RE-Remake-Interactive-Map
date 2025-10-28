/**
 * Activates room detail sections by toggling classes.
 */
export function activateRoomDetails() {
    const roomDetailWrapper = document.querySelector('.room-detail-wrapper') as HTMLElement | null;
    if (roomDetailWrapper) {
        roomDetailWrapper.classList.remove('room-detail-inactive');
        roomDetailWrapper.classList.add('room-detail-active');
    }

    document.querySelectorAll('.difficulty-tag').forEach((el) => {
        el.classList.remove('room-detail-inactive');
        el.classList.add('room-detail-active');
    });

    const roomInfoWrapper = document.querySelector('.room-info-wrapper') as HTMLElement | null;
    if (roomInfoWrapper) {
        roomInfoWrapper.classList.remove('room-detail-inactive');
        roomInfoWrapper.classList.add('room-detail-active');
    }
}

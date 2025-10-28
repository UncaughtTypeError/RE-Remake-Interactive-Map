import { RoomDetailsData } from 'src/data';

/**
 * Renders room intel sections like examine, quote, and info.
 * @param room - The room data.
 */
export function renderRoomIntel(room: RoomDetailsData) {
    const roomExamine = document.querySelector('.room-examine') as HTMLElement | null;
    if (roomExamine) {
        roomExamine.textContent = room.intel.examineText;
    }

    // Helper to handle quote/info sections (composition for repetition)
    const handleIntelSection = (selector: string, text: string | null, cite: string | null) => {
        const section = document.querySelector(selector) as HTMLElement | null;
        if (section) {
            if (text) {
                const q = section.querySelector('q') as HTMLElement | null;
                if (q) q.textContent = text;
                const citeEl = section.querySelector('cite') as HTMLElement | null;
                if (citeEl) citeEl.textContent = cite || '';
                section.classList.remove('intel-inactive');
                section.classList.add('intel-active');
            } else {
                section.classList.remove('intel-active');
                section.classList.add('intel-inactive');
            }
        }
    };

    handleIntelSection('.room-quote', room.intel.quote.text, room.intel.quote.cite);
    handleIntelSection('.room-info', room.intel.info.text, room.intel.info.cite);
}

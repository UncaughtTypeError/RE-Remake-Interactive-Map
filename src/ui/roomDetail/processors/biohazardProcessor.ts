import { DifficultyLevel, RoomDetailsData } from '../../../data';
import { BiohazardGroup } from 'roomDetail/types/types';

/**
 * Processes biohazards into a grouped map.
 * @param room - The room data.
 * @param difficulty - The current difficulty level.
 * @returns The grouped biohazards map.
 */
export function processBiohazards(
    room: RoomDetailsData,
    difficulty: DifficultyLevel,
): Map<string, BiohazardGroup> {
    const biohazardsGroup = new Map<string, BiohazardGroup>();
    room.roomDetails.biohazards.forEach((bio) => {
        if (bio.difficultyLevel.includes(difficulty)) {
            const code = bio.code;
            if (!biohazardsGroup.has(code)) {
                biohazardsGroup.set(code, { qty: 0, isAmbush: false });
            }
            const group = biohazardsGroup.get(code)!;
            group.qty += bio.qty;
            if (!group.isAmbush && bio.ambush) {
                group.isAmbush = true;
            }
        }
    });
    return biohazardsGroup;
}

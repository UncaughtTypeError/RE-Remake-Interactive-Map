/**
 * @file Static in-memory data for maps.
 * @description Defines the `mapData` array of {@link MapData} objects, representing maps (e.g.,
 * Mansion F1) used by services for querying and filtering. Each map includes an array of room IDs.
 * Uses `as const` for immutability and precise type inference (e.g., `roomIds` as literal).
 * Suitable for endpoints like `GET /api/maps/maps`.
 * @see {@link ./README.md} for data structure details.
 */
import { MapData } from '.';

export const mapData: ReadonlyArray<MapData> = [
    {
        id: 'mansionF1',
        map: 'Mansion F1',
        areaId: 'mansion',
        roomIds: [
            'greenhouse',
            'tigerStatueRoom',
            'westWingNorthCorridor',
            'westWingStoreroom',
            'clinic',
            'westWingNorthEastCorridor',
            'westWingNorthWestCorridor',
            'keepersRoom',
            'bar',
            'teaRoomCorridor',
            'diningRoomF1',
            'cemetery',
            'mainHallF1',
            'exhibitionRoomF1',
            'drawingRoom',
            'hiddenPassage',
            'hiddenCloset',
            'eastWingEastCorridor',
            'eastWingNorthEastCorridor',
            'bathroom',
            'outdoorBoiler',
            'suspendedCeilingRoom',
            'parlour',
            'gallery',
            'eastWingNorthWestCorridor',
            'study',
            'eastWingNorthCorridorF1',
            'eastWingStoreroom',
            'outdoorCorridor',
        ],
    },
] as const;

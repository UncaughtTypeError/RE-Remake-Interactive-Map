/**
 * @file Static in-memory data for areas.
 * @description Defines the `areaData` array of {@link AreaData} objects, representing areas (e.g.,
 * Mansion, Courtyard) used by services for querying and filtering. Each area includes an array of map IDs.
 * Uses `as const` for immutability and precise type inference (e.g., `mapIds` as literal).
 * Suitable for endpoints like `GET /api/maps/areas`.
 * @see {@link ./README.md} for data structure details.
 */
import { AreaData } from './types';

export const areaData: ReadonlyArray<AreaData> = [
    {
        id: 'mansion',
        area: 'Mansion',
        mapIds: ['mansionF1', 'mansionF2', 'mansionF3', 'mansionB1'],
    },
    {
        id: 'courtyard',
        area: 'Courtyard',
        mapIds: ['courtyardF1', 'courtyardB1', 'courtyardB2', 'heliport'],
    },
    {
        id: 'guardhouseResidence',
        area: 'Guardhouse Residence',
        mapIds: ['residenceF1', 'aquaRingB1', 'aquaRingB2'],
    },
    {
        id: 'altar',
        area: 'Altar',
        mapIds: ['altarB1', 'altarB2'],
    },
    {
        id: 'undergroundLaboratory',
        area: 'Underground Laboratory',
        mapIds: ['laboratoryB1', 'laboratoryB2', 'laboratoryB3', 'laboratoryB4'],
    },
] as const;

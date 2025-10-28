/**
 * @file Unit tests for mapsService.
 * @description Tests service methods for fetching and searching areas, maps, and rooms from static in-memory data.
 * Ensures correct handling of valid inputs, partial matches, and error conditions. Follows AAA style and conventions,
 * using Jest for assertions.
 * @see {@link ../../services/mapsService.ts}
 * @see {@link ../../data/areas.ts}
 * @see {@link ../../data/maps.ts}
 * @see {@link ../../data/rooms.ts}
 */
import * as mapsService from '../../../services/mapsService';
import { NotFoundError, BadRequestError } from '../../../errors/customErrors';
import { Messages } from '../../../constants';

import { areaData, mapData, roomData, RoomSearchFilters } from '../../../data';

describe('mapsService', () => {
    describe('getAllAreas', () => {
        it('should return all areas', async () => {
            const result = await mapsService.getAllAreas();
            expect(result.length).toBe(areaData.length);
            expect(result).toEqual(areaData);
        });
    });

    describe('getAreasByIds', () => {
        it('should return all found areas and no unrecognized IDs', async () => {
            const ids = ['mansion', 'courtyard'];
            const result = await mapsService.getAreasByIds(ids);
            expect(result.foundAreas.length).toBe(2);
            expect(result.unrecognizedIds.length).toBe(0);
            expect(result.foundAreas[0].id).toBe('mansion');
        });

        it('should return partial found areas and unrecognized IDs', async () => {
            const ids = ['mansion', 'invalid-id'];
            const result = await mapsService.getAreasByIds(ids);
            expect(result.foundAreas.length).toBe(1);
            expect(result.unrecognizedIds).toEqual(['invalid-id']);
        });

        it('should handle duplicate IDs by returning unique areas', async () => {
            const ids = ['mansion', 'mansion'];
            const result = await mapsService.getAreasByIds(ids);
            expect(result.foundAreas.length).toBe(1);
            expect(result.foundAreas[0].id).toBe('mansion');
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should return all areas if no IDs provided', async () => {
            const result = await mapsService.getAreasByIds([]);
            expect(result.foundAreas.length).toBe(areaData.length);
            expect(result.unrecognizedIds).toEqual([]);
            expect(result.foundAreas).toEqual(areaData);
        });

        it('should throw NotFoundError if no areas found', async () => {
            const ids = ['invalid1', 'invalid2'];
            await expect(mapsService.getAreasByIds(ids)).rejects.toThrow(NotFoundError);
            await expect(mapsService.getAreasByIds(ids)).rejects.toThrow(Messages.errors.notFound);
        });

        it('should throw BadRequestError for too many IDs', async () => {
            const ids = Array(101).fill('mansion');
            await expect(mapsService.getAreasByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(mapsService.getAreasByIds(ids)).rejects.toThrow(
                Messages.validation.tooManyIds,
            );
        });

        it('should throw BadRequestError for invalid ID format', async () => {
            const ids = ['mansion', 'invalid@id'];
            await expect(mapsService.getAreasByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(mapsService.getAreasByIds(ids)).rejects.toThrow(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('getAllMaps', () => {
        it('should return all maps', async () => {
            const result = await mapsService.getAllMaps();
            expect(result.length).toBe(mapData.length);
            expect(result).toEqual(mapData);
        });
    });

    describe('getMapsByIds', () => {
        it('should return all found maps and no unrecognized IDs', async () => {
            const ids = ['mansionF1'];
            const result = await mapsService.getMapsByIds(ids);
            expect(result.foundMaps.length).toBe(1);
            expect(result.unrecognizedIds.length).toBe(0);
            expect(result.foundMaps[0].id).toBe('mansionF1');
        });

        it('should return partial found maps and unrecognized IDs', async () => {
            const ids = ['mansionF1', 'invalid-id'];
            const result = await mapsService.getMapsByIds(ids);
            expect(result.foundMaps.length).toBe(1);
            expect(result.unrecognizedIds).toEqual(['invalid-id']);
        });

        it('should handle duplicate IDs by returning unique maps', async () => {
            const ids = ['mansionF1', 'mansionF1'];
            const result = await mapsService.getMapsByIds(ids);
            expect(result.foundMaps.length).toBe(1);
            expect(result.foundMaps[0].id).toBe('mansionF1');
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should return all maps if no IDs provided', async () => {
            const result = await mapsService.getMapsByIds([]);
            expect(result.foundMaps.length).toBe(mapData.length);
            expect(result.unrecognizedIds).toEqual([]);
            expect(result.foundMaps).toEqual(mapData);
        });

        it('should throw NotFoundError if no maps found', async () => {
            const ids = ['invalid1', 'invalid2'];
            await expect(mapsService.getMapsByIds(ids)).rejects.toThrow(NotFoundError);
            await expect(mapsService.getMapsByIds(ids)).rejects.toThrow(Messages.errors.notFound);
        });

        it('should throw BadRequestError for too many IDs', async () => {
            const ids = Array(101).fill('mansionF1');
            await expect(mapsService.getMapsByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(mapsService.getMapsByIds(ids)).rejects.toThrow(
                Messages.validation.tooManyIds,
            );
        });

        it('should throw BadRequestError for invalid ID format', async () => {
            const ids = ['mansionF1', 'invalid@id'];
            await expect(mapsService.getMapsByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(mapsService.getMapsByIds(ids)).rejects.toThrow(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('getAllRooms', () => {
        it('should return all rooms', async () => {
            const result = await mapsService.getAllRooms();
            expect(result.length).toBe(roomData.length);
            expect(result).toEqual(roomData);
        });
    });

    describe('getRoomsByIds', () => {
        it('should return all found rooms and no unrecognized IDs', async () => {
            const ids = ['keepersRoom'];
            const result = await mapsService.getRoomsByIds(ids);
            expect(result.foundRooms.length).toBe(1);
            expect(result.unrecognizedIds.length).toBe(0);
            expect(result.foundRooms[0].id).toBe('keepersRoom');
        });

        it('should return partial found rooms and unrecognized IDs', async () => {
            const ids = ['keepersRoom', 'invalid-id'];
            const result = await mapsService.getRoomsByIds(ids);
            expect(result.foundRooms.length).toBe(1);
            expect(result.unrecognizedIds).toEqual(['invalid-id']);
        });

        it('should handle duplicate IDs by returning unique rooms', async () => {
            const ids = ['keepersRoom', 'keepersRoom'];
            const result = await mapsService.getRoomsByIds(ids);
            expect(result.foundRooms.length).toBe(1);
            expect(result.foundRooms[0].id).toBe('keepersRoom');
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should return all rooms if no IDs provided', async () => {
            const result = await mapsService.getRoomsByIds([]);
            expect(result.foundRooms.length).toBe(roomData.length);
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should throw NotFoundError if no rooms found', async () => {
            const ids = ['invalid1', 'invalid2'];
            await expect(mapsService.getRoomsByIds(ids)).rejects.toThrow(NotFoundError);
            await expect(mapsService.getRoomsByIds(ids)).rejects.toThrow(Messages.errors.notFound);
        });

        it('should throw BadRequestError for too many IDs', async () => {
            const ids = Array(101).fill('keepersRoom');
            await expect(mapsService.getRoomsByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(mapsService.getRoomsByIds(ids)).rejects.toThrow(
                Messages.validation.tooManyIds,
            );
        });

        it('should throw BadRequestError for invalid ID format', async () => {
            const ids = ['keepersRoom', 'invalid@id'];
            await expect(mapsService.getRoomsByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(mapsService.getRoomsByIds(ids)).rejects.toThrow(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('searchRooms', () => {
        it('should return filtered rooms by map', async () => {
            const filters = { map: 'mansionF1' };
            const result = await mapsService.searchRooms(filters as RoomSearchFilters);
            expect(result).toBeInstanceOf(Array);
            expect(result.every((room) => room.mapId === 'mansionF1')).toBe(true);
        });

        it('should return filtered rooms by items', async () => {
            const filters = { items: ['batteryPack'] };
            const result = await mapsService.searchRooms(filters as RoomSearchFilters);
            expect(result).toBeInstanceOf(Array);
            expect(result.every((room) => room.detailList.items.includes('batteryPack'))).toBe(
                true,
            );
        });

        it('should return empty array for no matches', async () => {
            const filters = { map: 'nonexistent' };
            const result = await mapsService.searchRooms(filters as RoomSearchFilters);
            expect(result).toEqual([]);
        });

        it('should throw BadRequestError for invalid map ID format', async () => {
            const filters = { map: 'invalid@map' };
            await expect(mapsService.searchRooms(filters as RoomSearchFilters)).rejects.toThrow(
                BadRequestError,
            );
            await expect(mapsService.searchRooms(filters as RoomSearchFilters)).rejects.toThrow(
                Messages.validation.invalidMapIdFormat,
            );
        });

        it('should throw BadRequestError for invalid room number', async () => {
            const filters = { roomNumber: 'invalid' } as any;
            await expect(mapsService.searchRooms(filters)).rejects.toThrow(BadRequestError);
            await expect(mapsService.searchRooms(filters)).rejects.toThrow(
                Messages.validation.invalidNumber.replace('{subject}', 'Room'),
            );
        });
    });
});

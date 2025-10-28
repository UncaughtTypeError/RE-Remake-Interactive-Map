/**
 * @file Integration tests for map-related routes.
 * @description Tests the full API stack for fetching and searching areas, maps, and rooms using Supertest.
 * Ensures correct handling of valid requests, partial matches, and error conditions. Follows AAA style and conventions,
 * using Jest and Supertest. Excludes rate-limiting tests (429) due to express-rate-limit
 * MemoryStore issues in Jest/Supertest.
 * @see {@link ../../routes/mapsRoutes.ts}
 * @see {@link ../../controllers/mapsController.ts}
 * @see {@link ../../services/mapsService.ts}
 */
import request from 'supertest';
import express from 'express';
import mapsRouter from '../../routes/mapsRoutes';
import { errorHandler } from '../../middleware/errorHandler';
import { Messages } from '../../constants';

import { areaData, mapData, roomData } from '../../data';

// Note: Rate limiting tests (429 responses) are not included due to persistent state
// issues with express-rate-limit's MemoryStore in Jest/Supertest. See
// docs/rate-limiting-test-challenges.md for details and manual testing instructions.

const app = express();
app.use(express.json());
app.use('/api/maps', mapsRouter);
app.use(errorHandler);

describe('Maps Routes', () => {
    describe('GET /api/maps/areas/all', () => {
        it('should return all areas', async () => {
            const response = await request(app).get('/api/maps/areas/all');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(areaData.length);
            expect(response.body).toEqual(areaData);
        });
    });

    describe('GET /api/maps/areas?ids=...', () => {
        it('should return all found areas and no unrecognized IDs', async () => {
            const response = await request(app).get('/api/maps/areas?ids=mansion,courtyard');
            expect(response.status).toBe(200);
            expect(response.body.foundAreas.length).toBe(2);
            expect(response.body.unrecognizedIds.length).toBe(0);
        });

        it('should return partial found areas and unrecognized IDs', async () => {
            const response = await request(app).get('/api/maps/areas?ids=mansion,invalid');
            expect(response.status).toBe(200);
            expect(response.body.foundAreas.length).toBe(1);
            expect(response.body.unrecognizedIds).toEqual(['invalid']);
        });

        it('should return all areas if no IDs provided', async () => {
            const response = await request(app).get('/api/maps/areas');
            expect(response.status).toBe(200);
            expect(response.body.foundAreas.length).toBe(areaData.length);
            expect(response.body.unrecognizedIds).toEqual([]);
        });

        it('should return 404 if no areas found', async () => {
            const response = await request(app).get('/api/maps/areas?ids=invalid1,invalid2');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Messages.errors.notFound);
        });

        it('should return 400 for invalid ID format', async () => {
            const response = await request(app).get('/api/maps/areas?ids=invalid@id');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('GET /api/maps/maps/all', () => {
        it('should return all maps', async () => {
            const response = await request(app).get('/api/maps/maps/all');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(mapData.length);
            expect(response.body).toEqual(mapData);
        });
    });

    describe('GET /api/maps/maps?ids=...', () => {
        it('should return all found maps and no unrecognized IDs', async () => {
            const response = await request(app).get('/api/maps/maps?ids=mansionF1');
            expect(response.status).toBe(200);
            expect(response.body.foundMaps.length).toBe(1);
            expect(response.body.unrecognizedIds.length).toBe(0);
        });

        it('should return partial found maps and unrecognized IDs', async () => {
            const response = await request(app).get('/api/maps/maps?ids=mansionF1,invalid');
            expect(response.status).toBe(200);
            expect(response.body.foundMaps.length).toBe(1);
            expect(response.body.unrecognizedIds).toEqual(['invalid']);
        });

        it('should return all maps if no IDs provided', async () => {
            const response = await request(app).get('/api/maps/maps');
            expect(response.status).toBe(200);
            expect(response.body.foundMaps.length).toBe(mapData.length);
            expect(response.body.unrecognizedIds).toEqual([]);
        });

        it('should return 404 if no maps found', async () => {
            const response = await request(app).get('/api/maps/maps?ids=invalid1,invalid2');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Messages.errors.notFound);
        });

        it('should return 400 for invalid ID format', async () => {
            const response = await request(app).get('/api/maps/maps?ids=invalid@id');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('GET /api/maps/rooms/all', () => {
        it('should return all rooms', async () => {
            const response = await request(app).get('/api/maps/rooms/all');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(roomData.length);
            expect(response.body).toEqual(roomData);
        });
    });

    describe('GET /api/maps/rooms?ids=...', () => {
        it('should return all found rooms and no unrecognized IDs', async () => {
            const response = await request(app).get('/api/maps/rooms?ids=keepersRoom,diningRoomF1');
            expect(response.status).toBe(200);
            expect(response.body.foundRooms.length).toBe(2);
            expect(response.body.unrecognizedIds.length).toBe(0);
        });

        it('should return partial found rooms and unrecognized IDs', async () => {
            const response = await request(app).get('/api/maps/rooms?ids=keepersRoom,invalid');
            expect(response.status).toBe(200);
            expect(response.body.foundRooms.length).toBe(1);
            expect(response.body.unrecognizedIds).toEqual(['invalid']);
        });

        it('should return all rooms if no IDs provided', async () => {
            const response = await request(app).get('/api/maps/rooms');
            expect(response.status).toBe(200);
            expect(response.body.foundRooms.length).toBe(roomData.length);
            expect(response.body.unrecognizedIds).toEqual([]);
        });

        it('should return 404 if no rooms found', async () => {
            const response = await request(app).get('/api/maps/rooms?ids=invalid1,invalid2');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Messages.errors.notFound);
        });

        it('should return 400 for invalid ID format', async () => {
            const response = await request(app).get('/api/maps/rooms?ids=invalid@id');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('GET /api/maps/rooms/search', () => {
        it('should return filtered rooms by map', async () => {
            const response = await request(app).get('/api/maps/rooms/search?map=mansionF1');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(
                roomData.filter((room) => room.mapId === 'mansionF1').length,
            );
            expect(response.body.every((room: any) => room.mapId === 'mansionF1')).toBe(true);
        });

        it('should return empty array for no matches', async () => {
            const response = await request(app).get('/api/maps/rooms/search?map=nonexistent');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should return 400 for invalid map ID format', async () => {
            const response = await request(app).get('/api/maps/rooms/search?map=invalid@map');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(Messages.validation.invalidMapIdFormat);
        });

        it('should return 400 for invalid room number', async () => {
            const response = await request(app).get('/api/maps/rooms/search?roomNumber=invalid');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.invalidNumber.replace('{subject}', 'Room number'),
            );
        });

        it('should return 400 for unrecognized query parameters', async () => {
            const response = await request(app).get('/api/maps/rooms/search?invalidParam=invalid');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.unrecognizedQueryParameters.replace('{params}', 'invalidParam'),
            );
        });
    });
});

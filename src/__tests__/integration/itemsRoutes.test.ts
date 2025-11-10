/**
 * @file Integration tests for item-related routes.
 * @description Tests the full API stack for fetching and searching items using Supertest.
 * Ensures correct handling of valid requests, partial matches, and error conditions. Follows AAA style and conventions,
 * using Jest and Supertest. Excludes rate-limiting tests (429) due to express-rate-limit
 * MemoryStore issues in Jest/Supertest.
 * @see {@link ../../routes/itemsRoutes.ts}
 * @see {@link ../../controllers/itemsController.ts}
 * @see {@link ../../services/itemsService.ts}
 */
import request from 'supertest';
import express from 'express';
import itemsRouter from '../../routes/itemsRoutes';
import { errorHandler } from '../../middleware/errorHandler';
import { Messages } from '../../constants';

import { itemsRoomData } from '../../data';

// Note: Rate limiting tests (429 responses) are not included due to persistent state
// issues with express-rate-limit's MemoryStore in Jest/Supertest. See
// docs/rate-limiting-test-challenges.md for details and manual testing instructions.

const app = express();
app.use(express.json());
app.use('/api/items', itemsRouter);
app.use(errorHandler);

describe('Items Routes', () => {
    describe('GET /api/items/rooms/all', () => {
        it('should return all items room data', async () => {
            const response = await request(app).get('/api/items/rooms/all');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(itemsRoomData.length);
            expect(response.body).toEqual(itemsRoomData);
        });
    });

    describe('GET /api/items/rooms?ids=...', () => {
        it('should return all found items and no unrecognized IDs', async () => {
            const response = await request(app).get(
                '/api/items/rooms?ids=selfDefenseJV-keepersRoom,document-keepersRoom',
            );
            expect(response.status).toBe(200);
            expect(response.body.foundItems.length).toBe(2);
            expect(response.body.unrecognizedIds.length).toBe(0);
        });

        it('should return partial found items and unrecognized IDs', async () => {
            const response = await request(app).get(
                '/api/items/rooms?ids=selfDefenseJV-keepersRoom,invalid,document-keepersRoom',
            );
            expect(response.status).toBe(200);
            expect(response.body.foundItems.length).toBe(2);
            expect(response.body.unrecognizedIds).toEqual(['invalid']);
        });

        it('should return all items if no IDs provided', async () => {
            const response = await request(app).get('/api/items/rooms');
            expect(response.status).toBe(200);
            expect(response.body.foundItems.length).toBe(itemsRoomData.length);
            expect(response.body.unrecognizedIds).toEqual([]);
        });

        it('should return 404 if no items found', async () => {
            const response = await request(app).get('/api/items/rooms?ids=invalid1,invalid2');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Messages.errors.notFound);
        });

        it('should return 400 for invalid ID format', async () => {
            const response = await request(app).get('/api/items/rooms?ids=invalid@id');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('GET /api/items/rooms/search', () => {
        it('should return filtered items by room', async () => {
            const response = await request(app).get('/api/items/rooms/search?room=keepersRoom');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(
                itemsRoomData.filter((item) => item.map.roomId === 'keepersRoom').length,
            );
            expect(response.body.every((item: any) => item.map.roomId === 'keepersRoom')).toBe(
                true,
            );
        });

        it('should return filtered items by type', async () => {
            const response = await request(app).get('/api/items/rooms/search?type=SelfDefense');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.every((item: any) => item.type === 'SelfDefense')).toBe(true);
        });

        it('should return empty array for no matches', async () => {
            const response = await request(app).get('/api/items/rooms/search?room=nonexistent');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should return 400 for invalid room ID format', async () => {
            const response = await request(app).get('/api/items/rooms/search?room=invalid@room');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(Messages.validation.invalidRoomIdFormat);
        });

        it('should return 400 for invalid difficulty', async () => {
            const response = await request(app).get('/api/items/rooms/search?difficulty=invalid');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(Messages.validation.invalidDifficultyLevel);
        });

        it('should return 400 for unrecognized query parameters', async () => {
            const response = await request(app).get('/api/items/rooms/search?invalidParam=invalid');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.unrecognizedQueryParameters.replace('{params}', 'invalidParam'),
            );
        });
    });
});

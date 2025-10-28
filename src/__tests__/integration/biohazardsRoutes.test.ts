/**
 * @file Integration tests for biohazard-related routes.
 * @description Tests the full API stack for fetching and searching biohazards using Supertest.
 * Ensures correct handling of valid requests, partial matches, and error conditions. Follows AAA style and conventions,
 * using Jest and Supertest. Excludes rate-limiting tests (429) due to express-rate-limit
 * MemoryStore issues in Jest/Supertest.
 * @see {@link ../../routes/biohazardsRoutes.ts}
 * @see {@link ../../controllers/biohazardsController.ts}
 * @see {@link ../../services/biohazardsService.ts}
 */
import request from 'supertest';
import express from 'express';
import biohazardsRouter from '../../routes/biohazardsRoutes';
import { errorHandler } from '../../middleware/errorHandler';
import { Messages } from '../../constants';

import { biohazardsRoomData, starsRankingData, BiohazardCode } from '../../data';

// Note: Rate limiting tests (429 responses) are not included due to persistent state
// issues with express-rate-limit's MemoryStore in Jest/Supertest. See
// docs/rate-limiting-test-challenges.md for details and manual testing instructions.

const app = express();
app.use(express.json());
app.use('/api/biohazards', biohazardsRouter);
app.use(errorHandler);

describe('Biohazards Routes', () => {
    describe('GET /api/biohazards/all', () => {
        it('should return all biohazards', async () => {
            const response = await request(app).get('/api/biohazards/all');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(biohazardsRoomData.length);
            expect(response.body).toEqual(biohazardsRoomData);
        });
    });

    describe('GET /api/biohazards?ids=...', () => {
        it('should return all found biohazards and no unrecognized IDs', async () => {
            const response = await request(app).get(
                '/api/biohazards?ids=zombie1-keepersRoom,zombie2-keepersRoom',
            );
            expect(response.status).toBe(200);
            expect(response.body.foundBiohazards.length).toBe(2);
            expect(response.body.unrecognizedIds.length).toBe(0);
        });

        it('should return partial found biohazards and unrecognized IDs', async () => {
            const response = await request(app).get(
                '/api/biohazards?ids=zombie1-keepersRoom,invalid',
            );
            expect(response.status).toBe(200);
            expect(response.body.foundBiohazards.length).toBe(1);
            expect(response.body.unrecognizedIds).toEqual(['invalid']);
        });

        it('should return all biohazards if no IDs provided', async () => {
            const response = await request(app).get('/api/biohazards');
            expect(response.status).toBe(200);
            expect(response.body.foundBiohazards.length).toBe(biohazardsRoomData.length);
            expect(response.body.unrecognizedIds).toEqual([]);
        });

        it('should return 404 if no biohazards found', async () => {
            const response = await request(app).get('/api/biohazards?ids=invalid1,invalid2');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Messages.errors.notFound);
        });

        it('should return 400 for invalid ID format', async () => {
            const response = await request(app).get('/api/biohazards?ids=invalid@id');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('GET /api/biohazards/stars-rankings?codes=...', () => {
        it('should return all found rankings and no unrecognized codes', async () => {
            const response = await request(app).get('/api/biohazards/stars-rankings?codes=Zb,Cr');
            expect(response.status).toBe(200);
            expect(response.body.foundRankings.length).toBe(2);
            expect(response.body.unrecognizedCodes.length).toBe(0);
        });

        it('should return partial found rankings and unrecognized codes', async () => {
            const response = await request(app).get(
                '/api/biohazards/stars-rankings?codes=Zb,invalid',
            );
            expect(response.status).toBe(200);
            expect(response.body.foundRankings.length).toBe(1);
            expect(response.body.unrecognizedCodes).toEqual(['invalid']);
        });

        it('should return all rankings if no codes provided', async () => {
            const codes: BiohazardCode[] = [];
            starsRankingData.map((ranking) =>
                ranking.biohazardCodes.forEach((code: BiohazardCode) => codes.push(code)),
            );
            const response = await request(app).get('/api/biohazards/stars-rankings');
            expect(response.status).toBe(200);
            expect(response.body.foundRankings.length).toBe(codes.length);
            expect(response.body.unrecognizedCodes).toEqual([]);
        });

        it('should return 404 if no rankings found', async () => {
            const response = await request(app).get(
                '/api/biohazards/stars-rankings?codes=invalid1,invalid2',
            );
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Messages.errors.notFound);
        });

        it('should return 400 for invalid code format', async () => {
            const response = await request(app).get(
                '/api/biohazards/stars-rankings?codes=invalid@code',
            );
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.invalidIdFormat.replace('{subject}', 'codes'),
            );
        });
    });

    describe('GET /api/biohazards/search', () => {
        it('should return filtered biohazards by room', async () => {
            const response = await request(app).get('/api/biohazards/search?room=keepersRoom');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(
                biohazardsRoomData.filter((biohazard) => biohazard.map.roomId === 'keepersRoom')
                    .length,
            );
            expect(
                response.body.every((biohazard: any) => biohazard.map.roomId === 'keepersRoom'),
            ).toBe(true);
        });

        it('should return filtered biohazards by code', async () => {
            const response = await request(app).get('/api/biohazards/search?code=Zb');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.every((biohazard: any) => biohazard.code === 'Zb')).toBe(true);
        });

        it('should return empty array for no matches', async () => {
            const response = await request(app).get('/api/biohazards/search?room=nonexistent');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should return 400 for invalid room ID format', async () => {
            const response = await request(app).get('/api/biohazards/search?room=invalid@room');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(Messages.validation.invalidRoomIdFormat);
        });

        it('should return 400 for invalid biohazard code', async () => {
            const response = await request(app).get('/api/biohazards/search?code=invalid');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(Messages.validation.invalidBiohazardCode);
        });

        it('should return 400 for unrecognized query parameters', async () => {
            const response = await request(app).get('/api/biohazards/search?invalidParam=invalid');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.unrecognizedQueryParameters.replace('{params}', 'invalidParam'),
            );
        });
    });
});

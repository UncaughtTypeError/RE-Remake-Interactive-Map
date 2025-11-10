/**
 * @file Integration tests for person-related routes.
 * @description Tests the full API stack for fetching persons using Supertest.
 * Ensures correct handling of valid requests, partial matches, and error conditions. Follows AAA style and conventions,
 * using Jest and Supertest. Excludes rate-limiting tests (429) due to express-rate-limit
 * MemoryStore issues in Jest/Supertest.
 * @see {@link ../../routes/personsRoutes.ts}
 * @see {@link ../../controllers/personsController.ts}
 * @see {@link ../../services/personsService.ts}
 */
import request from 'supertest';
import express from 'express';
import personsRouter from '../../routes/personsRoutes';
import { errorHandler } from '../../middleware/errorHandler';
import { Messages } from '../../constants';

import { personsData } from '../../data';

// Note: Rate limiting tests (429 responses) are not included due to persistent state
// issues with express-rate-limit's MemoryStore in Jest/Supertest. See
// docs/rate-limiting-test-challenges.md for details and manual testing instructions.

const app = express();
app.use(express.json());
app.use('/api/persons', personsRouter);
app.use(errorHandler);

describe('Persons Routes', () => {
    describe('GET /api/persons/all', () => {
        it('should return all persons base data', async () => {
            const response = await request(app).get('/api/persons/all');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(personsData.length);
            expect(response.body).toEqual(personsData);
        });
    });

    describe('GET /api/persons?ids=...', () => {
        it('should return all found persons and no unrecognized IDs', async () => {
            const response = await request(app).get('/api/persons?ids=jillValentine,barryBurton');
            expect(response.status).toBe(200);
            expect(response.body.foundPersons.length).toBe(2);
            expect(response.body.unrecognizedIds.length).toBe(0);
        });

        it('should return partial found persons and unrecognized IDs', async () => {
            const response = await request(app).get(
                '/api/persons?ids=jillValentine,invalid,barryBurton',
            );
            expect(response.status).toBe(200);
            expect(response.body.foundPersons.length).toBe(2);
            expect(response.body.unrecognizedIds).toEqual(['invalid']);
        });

        it('should return all persons if no IDs provided', async () => {
            const response = await request(app).get('/api/persons');
            expect(response.status).toBe(200);
            expect(response.body.foundPersons.length).toBe(personsData.length);
            expect(response.body.unrecognizedIds).toEqual([]);
        });

        it('should return 404 if no persons found', async () => {
            const response = await request(app).get('/api/persons?ids=invalid1,invalid2');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Messages.errors.notFound);
        });

        it('should return 400 for invalid ID format', async () => {
            const response = await request(app).get('/api/persons?ids=invalid@id');
            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });
});

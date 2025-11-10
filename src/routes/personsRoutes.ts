/**
 * @file Route definitions for person-related API endpoints.
 * @description Sets up Express routes for fetching persons, including validation and rate limiting middleware.
 * Routes map to controllers in {@link ../controllers/personsController.ts} for business logic. Uses centralized messages
 * from {@link ../constants/messages.ts} for error responses and validators from {@link ../utils/validators.ts} for
 * input validation. Rate limiting is applied via `express-rate-limit` to prevent abuse.
 * @see {@link ../data/README.md} for data structure details.
 * @see {@link ../openapi.yaml} for API specification.
 */
import 'dotenv/config';
import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as personsController from '../controllers/personsController';
import { Messages } from '../constants/messages';
import { idsValidator } from '../utils';

const router: Router = express.Router();

// Rate limit: max 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: Messages.errors.rateLimitExceeded },
});

/**
 * GET /api/persons/all
 * @description Retrieves all persons base data without filters. Uses {@link personsController.getAllPersonsData} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of persons base data on success.
 */
router.get('/all', limiter, personsController.getAllPersonsData);

/**
 * GET /api/persons
 * @description Retrieves persons base data by IDs (query param: ids=comma-separated). If no IDs, returns all base data.
 * Uses {@link idsValidator} for input validation and {@link personsController.getPersonsDataByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found persons and unrecognized IDs; 400 for invalid IDs; 404 if no persons found.
 */
router.get('/', limiter, [idsValidator], personsController.getPersonsDataByIds);

export default router;

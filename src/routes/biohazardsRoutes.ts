/**
 * @file Route definitions for biohazard-related API endpoints.
 * @description Sets up Express routes for fetching and searching biohazards, including validation and rate limiting middleware.
 * Routes map to controllers in {@link ../controllers/biohazardsController.ts} for business logic. Uses centralized messages
 * from {@link ../constants/messages.ts} for error responses and validators from {@link ../utils/validators.ts} for
 * input validation. Rate limiting is applied via `express-rate-limit` to prevent abuse. The `/test-error` route is
 * conditional for debugging purposes.
 * @see {@link ../data/README.md} for data structure details.
 * @see {@link ../openapi.yaml} for API specification.
 */
import 'dotenv/config';
import express, { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import * as biohazardsController from '../controllers/biohazardsController';
import { Messages } from '../constants/messages';
import {
    idsValidator,
    codesValidator,
    roomValidator,
    difficultyValidator,
    codeValidator,
    nameValidator,
    restrictSearchQueryParams,
} from '../utils';

import { BiohazardSearchFiltersEnum } from '../data';

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
 * GET /api/biohazards/all
 * @description Retrieves all biohazards without filters. Uses {@link biohazardsController.getAllBiohazards} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of biohazards on success.
 */
router.get('/all', limiter, biohazardsController.getAllBiohazards);

/**
 * GET /api/biohazards
 * @description Retrieves biohazards by IDs (query param: ids=comma-separated). If no IDs, returns all biohazards.
 * Uses {@link idsValidator} for input validation and {@link biohazardsController.getBiohazardsByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found biohazards and unrecognized IDs; 400 for invalid IDs; 404 if no biohazards found.
 */
router.get('/', limiter, [idsValidator], biohazardsController.getBiohazardsByIds);

/**
 * GET /api/biohazards/stars-rankings
 * @description Retrieves S.T.A.R.S. rankings by codes (query param: codes=comma-separated). If no codes, returns all rankings.
 * Uses {@link codesValidator} for input validation and {@link biohazardsController.getSTARSRankingByCodes} for logic.
 * Rate limiting applied.
 * @returns 200 with found rankings and unrecognized codes; 400 for invalid codes; 404 if no rankings found.
 */
router.get(
    '/stars-rankings',
    limiter,
    [codesValidator],
    biohazardsController.getSTARSRankingByCodes,
);

/**
 * GET /api/biohazards/search
 * @description Searches and filters biohazards by room, difficulty, code or name (query params).
 * Uses validators ({@link restrictSearchQueryParams}, {@link difficultyValidator}, {@link codeValidator}, etc.) for input and
 * {@link biohazardsController.searchBiohazards} for logic. Rate limiting applied.
 * @returns 200 with filtered biohazards; 400 for invalid query parameters.
 */
router.get(
    '/search',
    limiter,
    [
        restrictSearchQueryParams(Object.values(BiohazardSearchFiltersEnum)),
        roomValidator,
        difficultyValidator,
        codeValidator,
        nameValidator,
    ],
    biohazardsController.searchBiohazards,
);

// Test route to simulate an error
if (process.env.DEBUG_MODE === 'true') {
    /**
     * GET /api/biohazards/test-error
     * @description Debug route to simulate an error (throws a test error). Available only when DEBUG_MODE=true.
     * @returns 500 with internal server error.
     */
    router.get('/test-error', async (req: Request, res: Response) => {
        throw new Error('Test error');
    });
}

export default router;

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
 * GET /api/biohazards/all (BASE DATA)
 * @description Retrieves all biohazards base data without filters. Uses {@link biohazardsController.getAllBiohazardsData} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of biohazards base data on success.
 */
router.get('/all', limiter, biohazardsController.getAllBiohazardsData);

/**
 * GET /api/biohazards (BASE DATA)
 * @description Retrieves biohazards base data by IDs (query param: ids=comma-separated). If no IDs, returns all base data.
 * Uses {@link idsValidator} for input validation and {@link biohazardsController.getBiohazardsDataByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found biohazards and unrecognized IDs; 400 for invalid IDs; 404 if no biohazards found.
 */
router.get('/', limiter, [idsValidator], biohazardsController.getBiohazardsDataByIds);

/**
 * GET /api/biohazards/rooms/all (ROOM DATA)
 * @description Retrieves all biohazards room data without filters. Uses {@link biohazardsController.getAllBiohazardsRoomData} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of biohazards room data on success.
 */
router.get('/rooms/all', limiter, biohazardsController.getAllBiohazardsRoomData);

/**
 * GET /api/biohazards/rooms (ROOM DATA)
 * @description Retrieves biohazards room data by IDs (query param: ids=comma-separated). If no IDs, returns all room data.
 * Uses {@link idsValidator} for input validation and {@link biohazardsController.getBiohazardsRoomDataByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found biohazards and unrecognized IDs; 400 for invalid IDs; 404 if no biohazards found.
 */
router.get('/rooms', limiter, [idsValidator], biohazardsController.getBiohazardsRoomDataByIds);

/**
 * GET /api/biohazards/stars-rankings/all
 * @description Retrieves all S.T.A.R.S. rankings without filters. Uses {@link biohazardsController.getAllSTARSRankings} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of all S.T.A.R.S. rankings on success.
 */
router.get('/stars-rankings/all', limiter, biohazardsController.getAllSTARSRankings);

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
 * GET /api/biohazards/search (BASE DATA)
 * @description Searches and filters biohazards base data by code or name (query params).
 * Uses validators ({@link restrictSearchQueryParams}, {@link codeValidator}, {@link nameValidator}) for input and
 * {@link biohazardsController.searchBiohazardsData} for logic. Rate limiting applied.
 * @returns 200 with filtered biohazards; 400 for invalid query parameters.
 */
router.get(
    '/search',
    limiter,
    [
        restrictSearchQueryParams(Object.values(BiohazardSearchFiltersEnum)),
        codeValidator,
        nameValidator,
    ],
    biohazardsController.searchBiohazardsData,
);

/**
 * GET /api/biohazards/rooms/search (ROOM DATA)
 * @description Searches and filters biohazards room data by room, difficulty, code or name (query params).
 * Uses validators ({@link restrictSearchQueryParams}, {@link roomValidator}, {@link difficultyValidator}, {@link codeValidator}, etc.) for input and
 * {@link biohazardsController.searchBiohazardsRoomData} for logic. Rate limiting applied.
 * @returns 200 with filtered biohazards room data; 400 for invalid query parameters.
 */
router.get(
    '/rooms/search',
    limiter,
    [
        restrictSearchQueryParams(Object.values(BiohazardSearchFiltersEnum)),
        roomValidator,
        difficultyValidator,
        codeValidator,
        nameValidator,
    ],
    biohazardsController.searchBiohazardsRoomData,
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

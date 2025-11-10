/**
 * @file Route definitions for item-related API endpoints.
 * @description Sets up Express routes for fetching and searching items, including validation and rate limiting middleware.
 * Routes map to controllers in {@link ../controllers/itemsController.ts} for business logic. Uses centralized messages
 * from {@link ../constants/messages.ts} for error responses and validators from {@link ../utils/validators.ts} for
 * input validation. Rate limiting is applied via `express-rate-limit` to prevent abuse. The `/test-error` route is
 * conditional for debugging purposes. Supports both base data and room data endpoints.
 * @see {@link ../data/README.md} for data structure details.
 * @see {@link ../openapi.yaml} for API specification.
 */
import 'dotenv/config';
import express, { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import * as itemsController from '../controllers/itemsController';
import { Messages } from '../constants/messages';
import {
    idsValidator,
    roomValidator,
    difficultyValidator,
    typeValidator,
    nameValidator,
    restrictSearchQueryParams,
} from '../utils';

import { ItemSearchFiltersEnum } from '../data';

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
 * GET /api/items/all (BASE DATA)
 * @description Retrieves all items base data without filters. Uses {@link itemsController.getAllItemsData} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of items base data on success.
 */
router.get('/all', limiter, itemsController.getAllItemsData);

/**
 * GET /api/items (BASE DATA)
 * @description Retrieves items base data by IDs (query param: ids=comma-separated). If no IDs, returns all base data.
 * Uses {@link idsValidator} for input validation and {@link itemsController.getItemsDataByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found items and unrecognized IDs; 400 for invalid IDs; 404 if no items found.
 */
router.get('/', limiter, [idsValidator], itemsController.getItemsDataByIds);

/**
 * GET /api/items/rooms/all (ROOM DATA)
 * @description Retrieves all items room data without filters. Uses {@link itemsController.getAllItemsRoomData} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of items room data on success.
 */
router.get('/rooms/all', limiter, itemsController.getAllItemsRoomData);

/**
 * GET /api/items/rooms (ROOM DATA)
 * @description Retrieves items room data by IDs (query param: ids=comma-separated). If no IDs, returns all room data.
 * Uses {@link idsValidator} for input validation and {@link itemsController.getItemsRoomDataByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found items and unrecognized IDs; 400 for invalid IDs; 404 if no items found.
 */
router.get('/rooms', limiter, [idsValidator], itemsController.getItemsRoomDataByIds);

/**
 * GET /api/items/search (BASE DATA)
 * @description Searches and filters items base data by type or name (query params).
 * Uses validators ({@link restrictSearchQueryParams}, {@link typeValidator}, {@link nameValidator}) for input and
 * {@link itemsController.searchItemsData} for logic. Rate limiting applied.
 * @returns 200 with filtered items; 400 for invalid query parameters.
 */
router.get(
    '/search',
    limiter,
    [restrictSearchQueryParams(['type', 'name']), typeValidator, nameValidator],
    itemsController.searchItemsData,
);

/**
 * GET /api/items/rooms/search (ROOM DATA)
 * @description Searches and filters items room data by room, difficulty, type, or name (query params).
 * Uses validators ({@link restrictSearchQueryParams}, {@link roomValidator}, {@link difficultyValidator}, {@link typeValidator}, etc.) for input and
 * {@link itemsController.searchItemsRoomData} for logic. Rate limiting applied.
 * @returns 200 with filtered items room data; 400 for invalid query parameters.
 */
router.get(
    '/rooms/search',
    limiter,
    [
        restrictSearchQueryParams(Object.values(ItemSearchFiltersEnum)),
        roomValidator,
        difficultyValidator,
        typeValidator,
        nameValidator,
    ],
    itemsController.searchItemsRoomData,
);

// Test route to simulate an error
if (process.env.DEBUG_MODE === 'true') {
    /**
     * GET /api/items/test-error
     * @description Debug route to simulate an error (throws a test error). Available only when DEBUG_MODE=true.
     * @returns 500 with internal server error.
     */
    router.get('/test-error', async (req: Request, res: Response) => {
        throw new Error('Test error');
    });
}

export default router;

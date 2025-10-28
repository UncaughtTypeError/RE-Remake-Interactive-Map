/**
 * @file Route definitions for item-related API endpoints.
 * @description Sets up Express routes for fetching and searching items, including validation and rate limiting middleware.
 * Routes map to controllers in {@link ../controllers/itemsController.ts} for business logic. Uses centralized messages
 * from {@link ../constants/messages.ts} for error responses and validators from {@link ../utils/validators.ts} for
 * input validation. Rate limiting is applied via `express-rate-limit` to prevent abuse. The `/test-error` route is
 * conditional for debugging purposes.
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
    message: { message: Messages.errors.rateLimitExceeded }, // Set to object for JSON
});

/**
 * GET /api/items/all
 * @description Retrieves all items without filters. Uses {@link itemsController.getAllItems} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of items on success.
 */
router.get('/all', limiter, itemsController.getAllItems);

/**
 * GET /api/items
 * @description Retrieves items by IDs (query param: ids=comma-separated). If no IDs, returns all items.
 * Uses {@link idsValidator} for input validation and {@link itemsController.getItemsByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found items and unrecognized IDs; 400 for invalid IDs; 404 if no items found.
 */
router.get('/', limiter, [idsValidator], itemsController.getItemsByIds);

/**
 * GET /api/items/search
 * @description Searches and filters items by room, difficulty, type, or name (query params).
 * Uses validators ({@link restrictSearchQueryParams}, {@link difficultyValidator}, {@link typeValidator}, etc.) for input and
 * {@link itemsController.searchItems} for logic. Rate limiting applied.
 * @returns 200 with filtered items; 400 for invalid query parameters.
 */
router.get(
    '/search',
    limiter,
    [
        restrictSearchQueryParams(Object.values(ItemSearchFiltersEnum)),
        roomValidator,
        difficultyValidator,
        typeValidator,
        nameValidator,
    ],
    itemsController.searchItems,
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

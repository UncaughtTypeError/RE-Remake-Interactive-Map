/**
 * @file Route definitions for map-related API endpoints.
 * @description Sets up Express routes for fetching and searching areas, maps, and rooms, including validation and rate limiting middleware.
 * Routes map to controllers in {@link ../controllers/mapsController.ts} for business logic. Uses centralized messages
 * from {@link ../constants/messages.ts} for error responses and validators from {@link ../utils/validators.ts} for
 * input validation. Rate limiting is applied via `express-rate-limit` to prevent abuse. The `/test-error` route is
 * conditional for debugging purposes.
 * @see {@link ../data/README.md} for data structure details.
 * @see {@link ../openapi.yaml} for API specification.
 */
import 'dotenv/config';
import express, { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import * as mapsController from '../controllers/mapsController';
import { Messages } from '../constants/messages';
import {
    idsValidator,
    mapValidator,
    itemValidator,
    biohazardValidator,
    personValidator,
    interactableValidator,
    roomFunctionValidator,
    adjoiningRoomValidator,
    accessKeyValidator,
    threatLevelValidator,
    roomNumberValidator,
    restrictSearchQueryParams,
} from '../utils';

import { RoomSearchFiltersEnum } from '../data';

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
 * GET /api/maps/areas/all
 * @description Retrieves all areas without filters. Uses {@link mapsController.getAllAreas} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of areas on success.
 */
router.get('/areas/all', limiter, mapsController.getAllAreas);

/**
 * GET /api/maps/areas
 * @description Retrieves areas by IDs (query param: ids=comma-separated). If no IDs, returns all areas.
 * Uses {@link idsValidator} for input validation and {@link mapsController.getAreasByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found areas and unrecognized IDs; 400 for invalid IDs; 404 if no areas found.
 */
router.get('/areas', limiter, [idsValidator], mapsController.getAreasByIds);

/**
 * GET /api/maps/maps/all
 * @description Retrieves all maps without filters. Uses {@link mapsController.getAllMaps} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of maps on success.
 */
router.get('/maps/all', limiter, mapsController.getAllMaps);

/**
 * GET /api/maps/maps
 * @description Retrieves maps by IDs (query param: ids=comma-separated). If no IDs, returns all maps.
 * Uses {@link idsValidator} for input validation and {@link mapsController.getMapsByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found maps and unrecognized IDs; 400 for invalid IDs; 404 if no maps found.
 */
router.get('/maps', limiter, [idsValidator], mapsController.getMapsByIds);

/**
 * GET /api/maps/rooms/all
 * @description Retrieves all rooms without filters. Uses {@link mapsController.getAllRooms} for logic.
 * Rate limiting applied to prevent excessive requests.
 * @returns 200 with array of rooms on success.
 */
router.get('/rooms/all', limiter, mapsController.getAllRooms);

/**
 * GET /api/maps/rooms
 * @description Retrieves rooms by IDs (query param: ids=comma-separated). If no IDs, returns all rooms.
 * Uses {@link idsValidator} for input validation and {@link mapsController.getRoomsByIds} for logic.
 * Rate limiting applied.
 * @returns 200 with found rooms and unrecognized IDs; 400 for invalid IDs; 404 if no rooms found.
 */
router.get('/rooms', limiter, [idsValidator], mapsController.getRoomsByIds);

/**
 * GET /api/maps/rooms/search
 * @description Searches and filters rooms by map, items, biohazards, persons, interactables,
 * roomFunction, adjoiningRoom, accessControl, threatLevel, or roomNumber (query params).
 * Uses validators ({@link restrictSearchQueryParams}, {@link mapValidator}, {@link itemValidator}, etc.) for input and
 * {@link mapsController.searchRooms} for logic. Rate limiting applied.
 * @returns 200 with filtered rooms; 400 for invalid query parameters.
 */
router.get(
    '/rooms/search',
    limiter,
    [
        restrictSearchQueryParams(Object.values(RoomSearchFiltersEnum)),
        mapValidator,
        itemValidator,
        biohazardValidator,
        personValidator,
        interactableValidator,
        roomFunctionValidator,
        adjoiningRoomValidator,
        accessKeyValidator,
        threatLevelValidator,
        roomNumberValidator,
    ],
    mapsController.searchRooms,
);

// Test route to simulate an error
if (process.env.DEBUG_MODE === 'true') {
    /**
     * GET /api/maps/test-error
     * @description Debug route to simulate an error (throws a test error). Available only when DEBUG_MODE=true.
     * @returns 500 with internal server error.
     */
    router.get('/test-error', async (req: Request, res: Response) => {
        throw new Error('Test error');
    });
}

export default router;

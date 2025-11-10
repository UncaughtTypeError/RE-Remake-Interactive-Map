/**
 * @file Controller layer for items-related API endpoints.
 * @description Handles HTTP requests for items, calling the appropriate service methods from
 * {@link ../services/itemsService.ts} and formatting responses. Uses `express-validator` for input
 * validation to ensure query parameters are safe and valid. Relies on Express 5's async error
 * handling to pass errors (e.g., NotFoundError, BadRequestError) to the error-handling middleware.
 * Supports endpoints for both base data and room data.
 * @see {@link ../services/itemsService.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as itemsService from '../services/itemsService';
import { BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

import { ItemData, ItemRoomData, ItemSearchFilters } from '../data';

/**
 * Handles GET request to retrieve all items base data.
 *
 * @description Fetches all items from {@link itemsService.getAllItemsData} and returns them as JSON.
 * Suitable for the `GET /api/items/all` endpoint. No query parameters are required.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of all items base data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/all
 * // Response: [{ id: 'typewriter', name: 'Typewriter', type: 'Typewriter', ... }, ...]
 * ```
 */
export const getAllItemsData = async (req: Request, res: Response): Promise<void> => {
    const items: ItemData[] = await itemsService.getAllItemsData();
    res.status(200).json(items);
};

/**
 * Handles GET request to retrieve items base data by their IDs.
 *
 * @description Fetches items matching the provided IDs from {@link itemsService.getItemsDataByIds}.
 * Expects a comma-separated list of IDs in the `ids` query parameter. If no IDs are provided,
 * returns all items wrapped in `{ foundItems: [], unrecognizedIds: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/items?ids=...` endpoint.
 *
 * @param req - Express request object with `ids` query parameter (e.g., 'typewriter,itemBox').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found items and unrecognized IDs.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format).
 * @throws {NotFoundError} If no provided IDs match any items.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items?ids=typewriter,itemBox
 * // Response: { foundItems: [{ id: 'typewriter', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getItemsDataByIds = async (req: Request, res: Response): Promise<void> => {
    // validate query parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(
            `${Messages.validation.invalidQueryParameters}: ${errors
                .array()
                .map((e) => e.msg)
                .join(', ')}`,
        );
    }

    const idsQuery = req.query.ids as string;
    const ids = idsQuery ? idsQuery.split(',').map((id) => id.trim()) : [];

    const items = await itemsService.getItemsDataByIds(ids);
    res.status(200).json(items);
};

/**
 * Handles GET request to retrieve all items room data.
 *
 * @description Fetches all items room data from {@link itemsService.getAllItemsRoomData} and returns them as JSON.
 * Suitable for the `GET /api/items/rooms` endpoint. No query parameters are required.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of all items room data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/rooms
 * // Response: [{ id: 'typewriter-diningRoomF1', itemId: 'typewriter', map: {...}, ... }, ...]
 * ```
 */
export const getAllItemsRoomData = async (req: Request, res: Response): Promise<void> => {
    const itemsRoomData: ItemRoomData[] = await itemsService.getAllItemsRoomData();
    res.status(200).json(itemsRoomData);
};

/**
 * Handles GET request to retrieve items room data by their IDs.
 *
 * @description Fetches items matching the provided IDs from {@link itemsService.getItemsRoomDataByIds}.
 * Expects a comma-separated list of IDs in the `ids` query parameter. If no IDs are provided,
 * returns all items wrapped in `{ foundItems: [], unrecognizedIds: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/items/rooms?ids=...` endpoint.
 *
 * @param req - Express request object with `ids` query parameter (e.g., 'typewriter-diningRoomF1,itemBox-diningRoomF1').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found items and unrecognized IDs.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format).
 * @throws {NotFoundError} If no provided IDs match any items.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/rooms?ids=typewriter-diningRoomF1,itemBox-diningRoomF1
 * // Response: { foundItems: [{ id: 'typewriter-diningRoomF1', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getItemsRoomDataByIds = async (req: Request, res: Response): Promise<void> => {
    // validate query parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(
            `${Messages.validation.invalidQueryParameters}: ${errors
                .array()
                .map((e) => e.msg)
                .join(', ')}`,
        );
    }

    const idsQuery = req.query.ids as string;
    const ids = idsQuery ? idsQuery.split(',').map((id) => id.trim()) : [];

    const items = await itemsService.getItemsRoomDataByIds(ids);
    res.status(200).json(items);
};

/**
 * Handles GET request to search and filter items base data based on criteria.
 *
 * @description Filters items using query parameters from {@link ItemSearchFilters} via
 * {@link itemsService.searchItemsData}. Supports filtering by type, name, and taxonomy.
 * Validates query parameters using `express-validator`. Suitable for the
 * `GET /api/items/search` endpoint with query parameters like `type=Typewriter&name=battery`.
 *
 * @param req - Express request object with query parameters matching {@link ItemSearchFilters}.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of filtered items.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid type).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/search?type=Typewriter
 * // Response: [{ id: 'typewriter', name: 'Typewriter', type: 'Typewriter', ... }]
 * ```
 */
export const searchItemsData = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(
            `${Messages.validation.invalidQueryParameters}: ${errors
                .array()
                .map((e) => e.msg)
                .join(', ')}`,
        );
    }

    const filters = req.query as ItemSearchFilters;
    const filtered = await itemsService.searchItemsData(filters);
    res.status(200).json(filtered);
};

/**
 * Handles GET request to search and filter items room data based on criteria.
 *
 * @description Filters items room data using query parameters from {@link ItemSearchFilters} via
 * {@link itemsService.searchItemsRoomData}. Supports filtering by room, difficulty, type, and name.
 * Validates query parameters using `express-validator`. Suitable for the
 * `GET /api/items/rooms/search` endpoint with query parameters like `room=diningRoomF1&type=Typewriter`.
 *
 * @param req - Express request object with query parameters matching {@link ItemSearchFilters}.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of filtered items room data.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid room ID).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/rooms/search?room=diningRoomF1
 * // Response: [{ id: 'typewriter-diningRoomF1', ... }, ...]
 * ```
 */
export const searchItemsRoomData = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(
            `${Messages.validation.invalidQueryParameters}: ${errors
                .array()
                .map((e) => e.msg)
                .join(', ')}`,
        );
    }

    const filters = req.query as ItemSearchFilters;
    const filtered = await itemsService.searchItemsRoomData(filters);
    res.status(200).json(filtered);
};

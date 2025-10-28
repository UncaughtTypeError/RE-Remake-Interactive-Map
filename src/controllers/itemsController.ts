/**
 * @file Controller layer for item-related API endpoints.
 * @description Handles HTTP requests for items, calling the appropriate service methods from
 * {@link ../services/itemsService.ts} and formatting responses. Uses `express-validator` for input
 * validation to ensure query parameters are safe and valid. Relies on Express 5's async error
 * handling to pass errors (e.g., NotFoundError, BadRequestError) to the error-handling middleware.
 * Supports endpoints like `GET /api/items/all`, `GET /api/items`, and `GET /api/items/search`.
 * @see {@link ../services/itemsService.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as itemsService from '../services/itemsService';
import { BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

import { ItemRoomData, ItemSearchFilters } from '../data';

/**
 * Handles GET request to retrieve all items.
 *
 * @description Fetches all items from {@link itemsService.getAllItems} and returns them as JSON.
 * Suitable for the `GET /api/items/all` endpoint. No query parameters are required.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of all items.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/all
 * // Response: [{ id: 'selfDefenseJV-keepersRoom', name: 'Battery Pack', ... }, ...]
 * ```
 */
export const getAllItems = async (req: Request, res: Response): Promise<void> => {
    const items: ItemRoomData[] = await itemsService.getAllItems();
    res.status(200).json(items);
};

/**
 * Handles GET request to retrieve items by their IDs.
 *
 * @description Fetches items matching the provided IDs from {@link itemsService.getItemsByIds}.
 * Expects a comma-separated list of IDs in the `ids` query parameter. If no IDs are provided,
 * returns all items wrapped in `{ foundItems: [], unrecognizedIds: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/items?ids=...` endpoint.
 *
 * @param req - Express request object with `ids` query parameter (e.g., 'selfDefenseJV-keepersRoom,document-keepersRoom').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found items and unrecognized IDs.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format).
 * @throws {NotFoundError} If no provided IDs match any items.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items?ids=selfDefenseJV-keepersRoom,document-keepersRoom
 * // Response: { foundItems: [{ id: 'selfDefenseJV-keepersRoom', name: 'Battery Pack', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getItemsByIds = async (req: Request, res: Response): Promise<void> => {
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
    const ids = idsQuery ? idsQuery.split(',').map((id) => id.trim()) : []; // parse and sanitize IDs

    const items = await itemsService.getItemsByIds(ids);
    res.status(200).json(items);
};

/**
 * Handles GET request to search and filter items based on criteria.
 *
 * @description Filters items using query parameters from {@link ItemSearchFilters} via
 * {@link itemsService.searchItems}. Supports filtering by room, difficulty, type, and name.
 * Validates query parameters using `express-validator` to ensure valid inputs. Suitable for the
 * `GET /api/items/search` endpoint with query parameters like `room=keepersRoom&type=SelfDefense`.
 *
 * @param req - Express request object with query parameters matching {@link ItemSearchFilters}.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of filtered items.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid difficulty level).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/items/search?room=keepersRoom&type=SelfDefense
 * // Response: [{ id: 'selfDefenseJV-keepersRoom', name: 'Battery Pack', ... }, ...]
 * ```
 */
export const searchItems = async (req: Request, res: Response): Promise<void> => {
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
    const filtered = await itemsService.searchItems(filters);
    res.status(200).json(filtered);
};

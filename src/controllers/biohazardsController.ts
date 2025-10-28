/**
 * @file Controller layer for biohazard-related API endpoints.
 * @description Handles HTTP requests for biohazards, calling the appropriate service methods from
 * {@link ../services/biohazardsService.ts} and formatting responses. Uses `express-validator` for input
 * validation to ensure query parameters are safe and valid. Relies on Express 5's async error
 * handling to pass errors (e.g., NotFoundError, BadRequestError) to the error-handling middleware.
 * Supports endpoints like `GET /api/biohazards/all`, `GET /api/biohazards`, and `GET /api/biohazards/search`.
 * @see {@link ../services/biohazardsService.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as biohazardsService from '../services/biohazardsService';
import { BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

import { BiohazardRoomData, BiohazardSearchFilters } from '../data';

/**
 * Handles GET request to retrieve all biohazards.
 *
 * @description Fetches all biohazards from {@link biohazardsService.getAllBiohazards} and returns them as JSON.
 * Suitable for the `GET /api/biohazards/all` endpoint. No query parameters are required.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of all biohazards.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/all
 * // Response: [{ id: 'zombie1-keepersRoom', code: 'Zb', ... }, ...]
 * ```
 */
export const getAllBiohazards = async (req: Request, res: Response): Promise<void> => {
    const biohazards: BiohazardRoomData[] = await biohazardsService.getAllBiohazards();
    res.status(200).json(biohazards);
};

/**
 * Handles GET request to retrieve biohazards by their IDs.
 *
 * @description Fetches biohazards matching the provided IDs from {@link biohazardsService.getBiohazardsByIds}.
 * Expects a comma-separated list of IDs in the `ids` query parameter. If no IDs are provided,
 * returns all biohazards wrapped in `{ foundBiohazards: [], unrecognizedIds: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/biohazards?ids=...` endpoint.
 *
 * @param req - Express request object with `ids` query parameter (e.g., 'zombie1-keepersRoom,zombie2-keepersRoom').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found biohazards and unrecognized IDs.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format).
 * @throws {NotFoundError} If no provided IDs match any biohazards.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards?ids=zombie1-keepersRoom,zombie2-keepersRoom
 * // Response: { foundBiohazards: [{ id: 'zombie1-keepersRoom', code: 'Zb', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getBiohazardsByIds = async (req: Request, res: Response): Promise<void> => {
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

    const biohazards = await biohazardsService.getBiohazardsByIds(ids);
    res.status(200).json(biohazards);
};

/**
 * Handles GET request to retrieve S.T.A.R.S. rankings by biohazard codes.
 *
 * @description Fetches rankings matching the provided codes from {@link biohazardsService.getSTARSRankingByCodes}.
 * Expects a comma-separated list of codes in the `codes` query parameter. If no codes are provided,
 * returns all rankings wrapped in `{ foundRankings: [], unrecognizedCodes: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/biohazards/stars-rankings?codes=...` endpoint.
 *
 * @param req - Express request object with `codes` query parameter (e.g., 'Zb,Cr').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found rankings and unrecognized codes.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid code format).
 * @throws {NotFoundError} If no provided codes match any rankings.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/stars-rankings?codes=Zb,Cr
 * // Response: { foundRankings: [{ code: 'Zb', starsRanking: { ... } }, ...], unrecognizedCodes: [] }
 * ```
 */
export const getSTARSRankingByCodes = async (req: Request, res: Response): Promise<void> => {
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

    const codesQuery = req.query.codes as string;
    const codes = codesQuery ? codesQuery.split(',').map((code) => code.trim()) : [];

    const rankings = await biohazardsService.getSTARSRankingByCodes(codes);
    res.status(200).json(rankings);
};

/**
 * Handles GET request to search and filter biohazards based on criteria.
 *
 * @description Filters biohazards using query parameters from {@link BiohazardSearchFilters} via
 * {@link biohazardsService.searchBiohazards}. Supports filtering by room, difficulty, code and name.
 * Validates query parameters using `express-validator`. Suitable for the
 * `GET /api/biohazards/search` endpoint with query parameters like `room=keepersRoom&code=Zb`.
 *
 * @param req - Express request object with query parameters matching {@link BiohazardSearchFilters}.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of filtered biohazards.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid code).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/biohazards/search?room=keepersRoom&code=Zb
 * // Response: [{ id: 'zombie1-keepersRoom', code: 'Zb', ... }, ...]
 * ```
 */
export const searchBiohazards = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(
            `${Messages.validation.invalidQueryParameters}: ${errors
                .array()
                .map((e) => e.msg)
                .join(', ')}`,
        );
    }

    const filters = req.query as BiohazardSearchFilters;
    const filtered = await biohazardsService.searchBiohazards(filters);
    res.status(200).json(filtered);
};

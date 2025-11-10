/**
 * @file Controller layer for persons-related API endpoints.
 * @description Handles HTTP requests for persons, calling the appropriate service methods from
 * {@link ../services/personsService.ts} and formatting responses. Uses `express-validator` for input
 * validation to ensure query parameters are safe and valid. Relies on Express 5's async error
 * handling to pass errors (e.g., NotFoundError, BadRequestError) to the error-handling middleware.
 * @see {@link ../services/personsService.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as personsService from '../services/personsService';
import { BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

import { PersonData } from '../data';

/**
 * Handles GET request to retrieve all persons base data.
 *
 * @description Fetches all persons from {@link personsService.getAllPersonsData} and returns them as JSON.
 * Suitable for the `GET /api/persons/all` endpoint. No query parameters are required.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of all persons base data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/persons/all
 * // Response: [{ id: 'jillValentine', name: 'Jill Valentine', type: 'PersonOfInterest', ... }, ...]
 * ```
 */
export const getAllPersonsData = async (req: Request, res: Response): Promise<void> => {
    const persons: PersonData[] = await personsService.getAllPersonsData();
    res.status(200).json(persons);
};

/**
 * Handles GET request to retrieve persons base data by their IDs.
 *
 * @description Fetches persons matching the provided IDs from {@link personsService.getPersonsDataByIds}.
 * Expects a comma-separated list of IDs in the `ids` query parameter. If no IDs are provided,
 * returns all persons wrapped in `{ foundPersons: [], unrecognizedIds: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/persons?ids=...` endpoint.
 *
 * @param req - Express request object with `ids` query parameter (e.g., 'jillValentine,barryBurton').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found persons and unrecognized IDs.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format).
 * @throws {NotFoundError} If no provided IDs match any persons.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/persons?ids=jillValentine,barryBurton
 * // Response: { foundPersons: [{ id: 'jillValentine', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getPersonsDataByIds = async (req: Request, res: Response): Promise<void> => {
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

    const persons = await personsService.getPersonsDataByIds(ids);
    res.status(200).json(persons);
};

/**
 * @file Controller layer for map-related API endpoints.
 * @description Handles HTTP requests for areas, maps, and rooms, calling the appropriate service methods from
 * {@link ../services/mapsService.ts} and formatting responses. Uses `express-validator` for input
 * validation to ensure query parameters are safe and valid. Relies on Express 5's async error
 * handling to pass errors (e.g., NotFoundError, BadRequestError) to the error-handling middleware.
 * Supports endpoints like `GET /api/maps/areas/all`, `GET /api/maps/areas?ids=...`, `GET /api/maps/rooms/search`, and more.
 * @see {@link ../services/mapsService.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as mapsService from '../services/mapsService';
import { BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

import { AreaData, MapData, RoomData, RoomSearchFilters } from '../data';

/**
 * Handles GET request to retrieve all areas.
 *
 * @description Fetches all areas from {@link mapsService.getAllAreas} and returns them as JSON.
 * Suitable for the `GET /api/maps/areas/all` endpoint. No query parameters are required.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of all areas.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/areas/all
 * // Response: [{ id: 'mansion', area: 'Mansion', mapIds: ['mansionF1', ...] }, ...]
 * ```
 */
export const getAllAreas = async (req: Request, res: Response): Promise<void> => {
    const areas: AreaData[] = await mapsService.getAllAreas();
    res.status(200).json(areas);
};

/**
 * Handles GET request to retrieve areas by their IDs.
 *
 * @description Fetches areas matching the provided IDs from {@link mapsService.getAreasByIds}.
 * Expects a comma-separated list of IDs in the `ids` query parameter. If no IDs are provided,
 * returns all areas wrapped in `{ foundAreas: [], unrecognizedIds: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/maps/areas?ids=...` endpoint.
 *
 * @param req - Express request object with `ids` query parameter (e.g., 'mansion,courtyard').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found areas and unrecognized IDs.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format).
 * @throws {NotFoundError} If no provided IDs match any areas.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/areas?ids=mansion,courtyard
 * // Response: { foundAreas: [{ id: 'mansion', area: 'Mansion', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getAreasByIds = async (req: Request, res: Response): Promise<void> => {
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
    const areas = await mapsService.getAreasByIds(ids);
    res.status(200).json(areas);
};

/**
 * Handles GET request to retrieve all maps.
 *
 * @description Fetches all maps from {@link mapsService.getAllMaps} and returns them as JSON.
 * Suitable for the `GET /api/maps/maps/all` endpoint. No query parameters are required.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of all maps.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/maps/all
 * // Response: [{ id: 'mansionF1', map: 'Mansion F1', areaId: 'mansion', roomIds: ['keepersRoom', ...] }, ...]
 * ```
 */
export const getAllMaps = async (req: Request, res: Response): Promise<void> => {
    const maps: MapData[] = await mapsService.getAllMaps();
    res.status(200).json(maps);
};

/**
 * Handles GET request to retrieve maps by their IDs.
 *
 * @description Fetches maps matching the provided IDs from {@link mapsService.getMapsByIds}.
 * Expects a comma-separated list of IDs in the `ids` query parameter. If no IDs are provided,
 * returns all maps wrapped in `{ foundMaps: [], unrecognizedIds: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/maps/maps?ids=...` endpoint.
 *
 * @param req - Express request object with `ids` query parameter (e.g., 'mansionF1,courtyardF1').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found maps and unrecognized IDs.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format).
 * @throws {NotFoundError} If no provided IDs match any maps.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/maps?ids=mansionF1,courtyardF1
 * // Response: { foundMaps: [{ id: 'mansionF1', map: 'Mansion F1', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getMapsByIds = async (req: Request, res: Response): Promise<void> => {
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
    const maps = await mapsService.getMapsByIds(ids);
    res.status(200).json(maps);
};

/**
 * Handles GET request to retrieve all rooms.
 *
 * @description Fetches all rooms from {@link mapsService.getAllRooms} and returns them as JSON.
 * Suitable for the `GET /api/maps/rooms/all` endpoint. No query parameters are required.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of all rooms.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/rooms/all
 * // Response: [{ id: 'keepersRoom', name: "Keeper's Room", ... }, ...]
 * ```
 */
export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
    const rooms: RoomData[] = await mapsService.getAllRooms();
    res.status(200).json(rooms);
};

/**
 * Handles GET request to retrieve rooms by their IDs.
 *
 * @description Fetches rooms matching the provided IDs from {@link mapsService.getRoomsByIds}.
 * Expects a comma-separated list of IDs in the `ids` query parameter. If no IDs are provided,
 * returns all rooms wrapped in `{ foundRooms: [], unrecognizedIds: [] }`. Validates query parameters
 * using `express-validator` to prevent abuse/DoS or injection attacks. Suitable for the
 * `GET /api/maps/rooms?ids=...` endpoint.
 *
 * @param req - Express request object with `ids` query parameter (e.g., 'keepersRoom,diningRoomF1').
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an object with found rooms and unrecognized IDs.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format).
 * @throws {NotFoundError} If no provided IDs match any rooms.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/rooms?ids=keepersRoom,diningRoomF1
 * // Response: { foundRooms: [{ id: 'keepersRoom', name: "Keeper's Room", ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getRoomsByIds = async (req: Request, res: Response): Promise<void> => {
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
    const rooms = await mapsService.getRoomsByIds(ids);
    res.status(200).json(rooms);
};

/**
 * Handles GET request to search and filter rooms based on criteria.
 *
 * @description Filters rooms using query parameters from {@link mapsService.RoomSearchFilters} via
 * {@link mapsService.searchRooms}. Supports filtering by map, items, biohazards, persons,
 * interactables, roomFunction, adjoiningRoom, accessKey, threatLevel, and roomNumber.
 * Validates query parameters using `express-validator`. Suitable for the
 * `GET /api/maps/rooms/search` endpoint with query parameters like `map=mansionF1&threatLevel=low-moderate-risk`.
 *
 * @param req - Express request object with query parameters matching {@link mapsService.RoomSearchFilters}.
 * @param res - Express response object.
 * @returns {Promise<void>} Resolves with a 200 response containing an array of filtered rooms.
 * @throws {BadRequestError} If query parameters fail validation (e.g., invalid ID format, non-numeric roomNumber).
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/maps/rooms/search?map=mansionF1&threatLevel=low-moderate-risk&items=selfDefenseJV-keepersRoom
 * // Response: [{ id: 'keepersRoom', name: "Keeper's Room", ... }, ...]
 * ```
 */
export const searchRooms = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(
            `${Messages.validation.invalidQueryParameters}: ${errors
                .array()
                .map((e) => e.msg)
                .join(', ')}`,
        );
    }

    const filters = req.query as RoomSearchFilters;
    const filtered = await mapsService.searchRooms(filters);
    res.status(200).json(filtered);
};

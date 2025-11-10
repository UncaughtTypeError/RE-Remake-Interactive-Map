/**
 * @file Unit tests for personsController.
 * @description Tests controller methods for fetching persons, mocking the service layer
 * and express-validator. Ensures correct handling of requests, responses, and errors. Follows AAA style and conventions,
 * using Jest for assertions and mocking.
 * @see {@link ../../controllers/personsController.ts}
 * @see {@link ../../services/personsService.ts}
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as personsController from '../../../controllers/personsController';
import * as personsService from '../../../services/personsService';
import { NotFoundError, BadRequestError } from '../../../errors/customErrors';
import { Messages } from '../../../constants';

import { personsData, PersonData } from '../../../data';

// Mock the service module
jest.mock('../../../services/personsService');

// Mock express-validator module
jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
}));

describe('Persons Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let json: jest.Mock;
    let status: jest.Mock;

    beforeEach(() => {
        json = jest.fn();
        status = jest.fn().mockReturnValue({ json });
        mockRequest = { query: {} };
        mockResponse = { json, status };
        jest.clearAllMocks();

        // Mock validationResult default behavior
        (validationResult as unknown as jest.Mock).mockReturnValue({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn().mockReturnValue([]),
        });
    });

    describe('getAllPersonsData', () => {
        it('should return all persons', async () => {
            const mockResult = personsData as PersonData[];
            (personsService.getAllPersonsData as jest.Mock).mockResolvedValue(mockResult);

            await personsController.getAllPersonsData(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(personsService.getAllPersonsData).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });
    });

    describe('getPersonsDataByIds', () => {
        it('should return found persons and unrecognized IDs', async () => {
            mockRequest.query = {
                ids: 'jillValentine,barryBurton',
            };
            const mockResult = {
                foundPersons: [
                    { id: 'jillValentine', name: 'Jill Valentine' },
                    { id: 'barryBurton', name: 'Barry Burton' },
                ],
                unrecognizedIds: [],
            };
            (personsService.getPersonsDataByIds as jest.Mock).mockResolvedValue(mockResult);

            await personsController.getPersonsDataByIds(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(personsService.getPersonsDataByIds).toHaveBeenCalledWith([
                'jillValentine',
                'barryBurton',
            ]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle partial success', async () => {
            mockRequest.query = { ids: 'jillValentine,invalid' };
            const mockResult = {
                foundPersons: [{ id: 'jillValentine', name: 'Jill Valentine' }],
                unrecognizedIds: ['invalid'],
            };
            (personsService.getPersonsDataByIds as jest.Mock).mockResolvedValue(mockResult);

            await personsController.getPersonsDataByIds(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(personsService.getPersonsDataByIds).toHaveBeenCalledWith([
                'jillValentine',
                'invalid',
            ]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should return all persons if no IDs provided', async () => {
            mockRequest.query = { ids: '' };
            const mockResult = {
                foundPersons: personsData as PersonData[],
                unrecognizedIds: [],
            };
            (personsService.getPersonsDataByIds as jest.Mock).mockResolvedValue(mockResult);

            await personsController.getPersonsDataByIds(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(personsService.getPersonsDataByIds).toHaveBeenCalledWith([]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle NotFoundError', async () => {
            mockRequest.query = { ids: 'invalid1,invalid2' };
            (personsService.getPersonsDataByIds as jest.Mock).mockRejectedValue(
                new NotFoundError(Messages.errors.notFound),
            );

            await expect(
                personsController.getPersonsDataByIds(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(NotFoundError);
        });

        it('should handle BadRequestError for invalid format', async () => {
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest.fn().mockReturnValue([
                    {
                        msg: Messages.validation.invalidCommaSeparatedString.replace(
                            '{subject}',
                            'IDs',
                        ),
                    },
                ]),
            });

            await expect(
                personsController.getPersonsDataByIds(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(BadRequestError);
            await expect(
                personsController.getPersonsDataByIds(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'IDs')}`,
            );
        });
    });
});

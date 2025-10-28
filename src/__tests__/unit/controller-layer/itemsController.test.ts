/**
 * @file Unit tests for itemsController.
 * @description Tests controller methods for fetching and searching items, mocking the service layer
 * and express-validator. Ensures correct handling of requests, responses, and errors. Follows AAA style and conventions,
 * using Jest for assertions and mocking.
 * @see {@link ../../controllers/itemsController.ts}
 * @see {@link ../../services/itemsService.ts}
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as itemsController from '../../../controllers/itemsController';
import * as itemsService from '../../../services/itemsService';
import { NotFoundError, BadRequestError } from '../../../errors/customErrors';
import { Messages } from '../../../constants';

import { itemsRoomData, ItemRoomData } from '../../../data';

// Mock the service module
jest.mock('../../../services/itemsService');

// Mock express-validator module
jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
}));

describe('Items Controller', () => {
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

    describe('getAllItems', () => {
        it('should return all items', async () => {
            const mockResult = itemsRoomData as ItemRoomData[];
            (itemsService.getAllItems as jest.Mock).mockResolvedValue(mockResult);

            await itemsController.getAllItems(mockRequest as Request, mockResponse as Response);

            expect(itemsService.getAllItems).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });
    });

    describe('getItemsByIds', () => {
        it('should return found items and unrecognized IDs', async () => {
            mockRequest.query = {
                ids: 'selfDefenseJV-keepersRoom,document-keepersRoom',
            };
            const mockResult = {
                foundItems: [
                    { id: 'selfDefenseJV-keepersRoom', name: 'Battery Pack' },
                    { id: 'document-keepersRoom', name: 'Document' },
                ],
                unrecognizedIds: [],
            };
            (itemsService.getItemsByIds as jest.Mock).mockResolvedValue(mockResult);

            await itemsController.getItemsByIds(mockRequest as Request, mockResponse as Response);

            expect(itemsService.getItemsByIds).toHaveBeenCalledWith([
                'selfDefenseJV-keepersRoom',
                'document-keepersRoom',
            ]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle partial success', async () => {
            mockRequest.query = { ids: 'selfDefenseJV-keepersRoom,invalid' };
            const mockResult = {
                foundItems: [{ id: 'selfDefenseJV-keepersRoom', name: 'Battery Pack' }],
                unrecognizedIds: ['invalid'],
            };
            (itemsService.getItemsByIds as jest.Mock).mockResolvedValue(mockResult);

            await itemsController.getItemsByIds(mockRequest as Request, mockResponse as Response);

            expect(itemsService.getItemsByIds).toHaveBeenCalledWith([
                'selfDefenseJV-keepersRoom',
                'invalid',
            ]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should return all items if no IDs provided', async () => {
            mockRequest.query = { ids: '' };
            const mockResult = {
                foundItems: itemsRoomData as ItemRoomData[],
                unrecognizedIds: [],
            };
            (itemsService.getItemsByIds as jest.Mock).mockResolvedValue(mockResult);

            await itemsController.getItemsByIds(mockRequest as Request, mockResponse as Response);

            expect(itemsService.getItemsByIds).toHaveBeenCalledWith([]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle NotFoundError', async () => {
            mockRequest.query = { ids: 'invalid1,invalid2' };
            (itemsService.getItemsByIds as jest.Mock).mockRejectedValue(
                new NotFoundError(Messages.errors.notFound),
            );

            await expect(
                itemsController.getItemsByIds(mockRequest as Request, mockResponse as Response),
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
                itemsController.getItemsByIds(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(BadRequestError);
            await expect(
                itemsController.getItemsByIds(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'IDs')}`,
            );
        });
    });

    describe('searchItems', () => {
        it('should return filtered items', async () => {
            const mockItems: ItemRoomData[] = [
                {
                    id: 'selfDefenseJV-keepersRoom',
                    itemId: 'batteryPack',
                    map: {
                        roomId: 'keepersRoom',
                        mapId: 'mansionF1',
                    },
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                    ],
                    name: 'Battery Pack',
                    type: 'SelfDefense',
                    qty: 1,
                    qtyItems: null,
                    uses: null,
                    isFeatured: false,
                    requirement: 'none',
                },
                {
                    id: 'selfDefenseCR-keepersRoom',
                    itemId: 'flashGrenade',
                    map: {
                        roomId: 'keepersRoom',
                        mapId: 'mansionF1',
                    },
                    difficultyLevel: [
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                    name: 'Flash Grenade',
                    type: 'SelfDefense',
                    qty: 1,
                    qtyItems: null,
                    uses: null,
                    isFeatured: false,
                    requirement: 'none',
                },
            ];
            mockRequest.query = { room: 'keepersRoom' };
            (itemsService.searchItems as jest.Mock).mockResolvedValue(mockItems);

            await itemsController.searchItems(mockRequest as Request, mockResponse as Response);

            expect(itemsService.searchItems).toHaveBeenCalledWith({ room: 'keepersRoom' });
            expect(mockResponse.json).toHaveBeenCalledWith(mockItems);
        });

        it('should handle invalid query parameters', async () => {
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest
                    .fn()
                    .mockReturnValue([{ msg: Messages.validation.invalidRoomIdFormat }]),
            });

            await expect(
                itemsController.searchItems(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(BadRequestError);
            await expect(
                itemsController.searchItems(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidRoomIdFormat}`,
            );
        });
    });
});

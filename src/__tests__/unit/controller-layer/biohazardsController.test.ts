/**
 * @file Unit tests for biohazardsController.
 * @description Tests controller methods for fetching and searching biohazards, mocking the service layer
 * and express-validator. Ensures correct handling of requests, responses, and errors. Follows AAA style and conventions,
 * using Jest for assertions and mocking.
 * @see {@link ../../controllers/biohazardsController.ts}
 * @see {@link ../../services/biohazardsService.ts}
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as biohazardsController from '../../../controllers/biohazardsController';
import * as biohazardsService from '../../../services/biohazardsService';
import { NotFoundError, BadRequestError } from '../../../errors/customErrors';
import { Messages } from '../../../constants';

import { biohazardsRoomData, BiohazardRoomData } from '../../../data';

// Mock the service module
jest.mock('../../../services/biohazardsService');

// Mock express-validator module
jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
}));

describe('Biohazards Controller', () => {
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

    describe('getAllBiohazardsRoomData', () => {
        it('should return all biohazards', async () => {
            const mockResult = biohazardsRoomData as BiohazardRoomData[];
            (biohazardsService.getAllBiohazardsRoomData as jest.Mock).mockResolvedValue(mockResult);

            await biohazardsController.getAllBiohazardsRoomData(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(biohazardsService.getAllBiohazardsRoomData).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });
    });

    describe('getBiohazardsRoomDataByIds', () => {
        it('should return found biohazards and unrecognized IDs', async () => {
            mockRequest.query = { ids: 'zombie1-keepersRoom,zombie2-keepersRoom' };
            const mockResult = {
                foundBiohazards: [
                    {
                        id: 'zombie1-keepersRoom',
                        map: { roomId: 'keepersRoom', mapId: 'mansionF1' },
                        difficultyLevel: ['JV-lvl-easy'],
                        code: 'Zb',
                        qty: 1,
                        ambush: false,
                    },
                ],
                unrecognizedIds: [],
            };
            (biohazardsService.getBiohazardsRoomDataByIds as jest.Mock).mockResolvedValue(
                mockResult,
            );

            await biohazardsController.getBiohazardsRoomDataByIds(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(biohazardsService.getBiohazardsRoomDataByIds).toHaveBeenCalledWith([
                'zombie1-keepersRoom',
                'zombie2-keepersRoom',
            ]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle partial success', async () => {
            mockRequest.query = { ids: 'zombie1-keepersRoom,invalid' };
            const mockResult = {
                foundBiohazards: [
                    {
                        id: 'zombie1-keepersRoom',
                        map: { roomId: 'keepersRoom', mapId: 'mansionF1' },
                        difficultyLevel: ['JV-lvl-easy'],
                        code: 'Zb',
                        qty: 1,
                        ambush: false,
                    },
                ],
                unrecognizedIds: ['invalid'],
            };
            (biohazardsService.getBiohazardsRoomDataByIds as jest.Mock).mockResolvedValue(
                mockResult,
            );

            await biohazardsController.getBiohazardsRoomDataByIds(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(biohazardsService.getBiohazardsRoomDataByIds).toHaveBeenCalledWith([
                'zombie1-keepersRoom',
                'invalid',
            ]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should return all biohazards if no IDs provided', async () => {
            mockRequest.query = { ids: '' };
            const mockResult = {
                foundBiohazards: biohazardsRoomData as BiohazardRoomData[],
                unrecognizedIds: [],
            };
            (biohazardsService.getBiohazardsRoomDataByIds as jest.Mock).mockResolvedValue(
                mockResult,
            );

            await biohazardsController.getBiohazardsRoomDataByIds(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(biohazardsService.getBiohazardsRoomDataByIds).toHaveBeenCalledWith([]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle NotFoundError', async () => {
            mockRequest.query = { ids: 'invalid1,invalid2' };
            (biohazardsService.getBiohazardsRoomDataByIds as jest.Mock).mockRejectedValue(
                new NotFoundError(Messages.errors.notFound),
            );

            await expect(
                biohazardsController.getBiohazardsRoomDataByIds(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(NotFoundError);
        });

        it('should throw BadRequestError for invalid format', async () => {
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
                biohazardsController.getBiohazardsRoomDataByIds(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(BadRequestError);
            await expect(
                biohazardsController.getBiohazardsRoomDataByIds(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'IDs')}`,
            );
        });
    });

    describe('getSTARSRankingByCodes', () => {
        it('should return found rankings and unrecognized codes', async () => {
            mockRequest.query = { codes: 'Zb,Cr' };
            const mockResult = {
                foundRankings: [
                    {
                        code: 'Zb',
                        starsRanking: {
                            starsClassification: 'Zeta',
                            ranking: '0Half',
                            threatLevel: 'Low-Moderate',
                            directive: 'Avoid else Engage',
                        },
                    },
                ],
                unrecognizedCodes: [],
            };
            (biohazardsService.getSTARSRankingByCodes as jest.Mock).mockResolvedValue(mockResult);

            await biohazardsController.getSTARSRankingByCodes(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(biohazardsService.getSTARSRankingByCodes).toHaveBeenCalledWith(['Zb', 'Cr']);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle partial success', async () => {
            mockRequest.query = { codes: 'Zb,invalid' };
            const mockResult = {
                foundRankings: [
                    {
                        code: 'Zb',
                        starsRanking: {
                            starsClassification: 'Zeta',
                            ranking: '0Half',
                            threatLevel: 'Low-Moderate',
                            directive: 'Avoid else Engage',
                        },
                    },
                ],
                unrecognizedCodes: ['invalid'],
            };
            (biohazardsService.getSTARSRankingByCodes as jest.Mock).mockResolvedValue(mockResult);

            await biohazardsController.getSTARSRankingByCodes(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(biohazardsService.getSTARSRankingByCodes).toHaveBeenCalledWith([
                'Zb',
                'invalid',
            ]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should return all rankings if no codes provided', async () => {
            mockRequest.query = { codes: '' };
            const mockResult = {
                foundRankings: [], // Would be all, but mocked for brevity
                unrecognizedCodes: [],
            };
            (biohazardsService.getSTARSRankingByCodes as jest.Mock).mockResolvedValue(mockResult);

            await biohazardsController.getSTARSRankingByCodes(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(biohazardsService.getSTARSRankingByCodes).toHaveBeenCalledWith([]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle NotFoundError', async () => {
            mockRequest.query = { codes: 'invalid1,invalid2' };
            (biohazardsService.getSTARSRankingByCodes as jest.Mock).mockRejectedValue(
                new NotFoundError(Messages.errors.notFound),
            );

            await expect(
                biohazardsController.getSTARSRankingByCodes(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(NotFoundError);
        });

        it('should throw BadRequestError for invalid format', async () => {
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest.fn().mockReturnValue([
                    {
                        msg: Messages.validation.invalidCommaSeparatedString.replace(
                            '{subject}',
                            'codes',
                        ),
                    },
                ]),
            });

            await expect(
                biohazardsController.getSTARSRankingByCodes(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(BadRequestError);
            await expect(
                biohazardsController.getSTARSRankingByCodes(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'codes')}`,
            );
        });
    });

    describe('searchBiohazardsRoomData', () => {
        it('should return filtered biohazards', async () => {
            const mockBiohazards: BiohazardRoomData[] = [
                {
                    id: 'zombie1-keepersRoom',
                    map: { roomId: 'keepersRoom', mapId: 'mansionF1' },
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                    name: 'Zombie',
                    code: 'Zb',
                    qty: 1,
                    ambush: false,
                    isFeatured: false,
                },
                {
                    id: 'zombie2-keepersRoom',
                    map: { roomId: 'keepersRoom', mapId: 'mansionF1' },
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                    name: 'Zombie',
                    code: 'Zb',
                    qty: 1,
                    ambush: true,
                    isFeatured: false,
                },
            ];
            mockRequest.query = { room: 'keepersRoom' };
            (biohazardsService.searchBiohazardsRoomData as jest.Mock).mockResolvedValue(
                mockBiohazards,
            );

            await biohazardsController.searchBiohazardsRoomData(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(biohazardsService.searchBiohazardsRoomData).toHaveBeenCalledWith({
                room: 'keepersRoom',
            });
            expect(mockResponse.json).toHaveBeenCalledWith(mockBiohazards);
        });

        it('should handle invalid query parameters', async () => {
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest
                    .fn()
                    .mockReturnValue([{ msg: Messages.validation.invalidRoomIdFormat }]),
            });

            await expect(
                biohazardsController.searchBiohazardsRoomData(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(BadRequestError);
            await expect(
                biohazardsController.searchBiohazardsRoomData(
                    mockRequest as Request,
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidRoomIdFormat}`,
            );
        });
    });
});

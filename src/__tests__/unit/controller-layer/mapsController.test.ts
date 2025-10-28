/**
 * @file Unit tests for mapsController.
 * @description Tests controller methods for fetching and searching areas, maps, and rooms, mocking the service layer
 * and express-validator. Ensures correct handling of requests, responses, and errors. Follows AAA style and conventions,
 * using Jest for assertions and mocking.
 * @see {@link ../../controllers/mapsController.ts}
 * @see {@link ../../services/mapsService.ts}
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as mapsController from '../../../controllers/mapsController';
import * as mapsService from '../../../services/mapsService';
import { NotFoundError, BadRequestError } from '../../../errors/customErrors';
import { Messages } from '../../../constants';

import { areaData, AreaData, mapData, MapData, roomData, RoomData } from '../../../data';

// Mock the service module
jest.mock('../../../services/mapsService');

// Mock express-validator module
jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
}));

describe('Maps Controller', () => {
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

    describe('getAllAreas', () => {
        it('should return all areas', async () => {
            const mockResult = areaData as AreaData[];
            (mapsService.getAllAreas as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getAllAreas(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getAllAreas).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });
    });

    describe('getAreasByIds', () => {
        it('should return found areas and unrecognized IDs', async () => {
            mockRequest.query = { ids: 'mansion,courtyard' };
            const mockResult = {
                foundAreas: [
                    {
                        id: 'mansion',
                        area: 'Mansion',
                        mapIds: ['mansionF1', 'mansionF2', 'mansionF3', 'mansionB1'],
                    },
                    {
                        id: 'courtyard',
                        area: 'Courtyard',
                        mapIds: ['courtyardF1', 'courtyardB1', 'courtyardB2', 'heliport'],
                    },
                ],
                unrecognizedIds: [],
            };
            (mapsService.getAreasByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getAreasByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getAreasByIds).toHaveBeenCalledWith(['mansion', 'courtyard']);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle partial success', async () => {
            mockRequest.query = { ids: 'mansion,invalid' };
            const mockResult = {
                foundAreas: [
                    {
                        id: 'mansion',
                        area: 'Mansion',
                        mapIds: ['mansionF1', 'mansionF2', 'mansionF3', 'mansionB1'],
                    },
                ],
                unrecognizedIds: ['invalid'],
            };
            (mapsService.getAreasByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getAreasByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getAreasByIds).toHaveBeenCalledWith(['mansion', 'invalid']);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should return all areas if no IDs provided', async () => {
            mockRequest.query = { ids: '' };
            const mockResult = {
                foundAreas: areaData as AreaData[],
                unrecognizedIds: [],
            };
            (mapsService.getAreasByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getAreasByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getAreasByIds).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle NotFoundError', async () => {
            mockRequest.query = { ids: 'invalid1,invalid2' };
            (mapsService.getAreasByIds as jest.Mock).mockRejectedValue(
                new NotFoundError(Messages.errors.notFound),
            );

            await expect(
                mapsController.getAreasByIds(mockRequest as Request, mockResponse as Response),
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
                mapsController.getAreasByIds(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(BadRequestError);
            await expect(
                mapsController.getAreasByIds(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'IDs')}`,
            );
        });
    });

    describe('getAllMaps', () => {
        it('should return all maps', async () => {
            const mockResult = mapData as MapData[];
            (mapsService.getAllMaps as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getAllMaps(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getAllMaps).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });
    });

    describe('getMapsByIds', () => {
        it('should return found maps and unrecognized IDs', async () => {
            mockRequest.query = { ids: 'mansionF1,courtyardF1' };
            const mockResult = {
                foundMaps: [
                    {
                        id: 'mansionF1',
                        map: 'Mansion F1',
                        areaId: 'mansion',
                        roomIds: ['keepersRoom'],
                    },
                    {
                        id: 'courtyardF1',
                        map: 'Courtyard F1',
                        areaId: 'courtyard',
                        roomIds: ['keepersRoom'],
                    },
                ],
                unrecognizedIds: [],
            };
            (mapsService.getMapsByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getMapsByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getMapsByIds).toHaveBeenCalledWith(['mansionF1', 'courtyardF1']);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle partial success', async () => {
            mockRequest.query = { ids: 'mansionF1,invalid' };
            const mockResult = {
                foundMaps: [
                    {
                        id: 'mansionF1',
                        map: 'Mansion F1',
                        areaId: 'mansion',
                        roomIds: ['keepersRoom'],
                    },
                ],
                unrecognizedIds: ['invalid'],
            };
            (mapsService.getMapsByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getMapsByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getMapsByIds).toHaveBeenCalledWith(['mansionF1', 'invalid']);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should return all maps if no IDs provided', async () => {
            mockRequest.query = { ids: '' };
            const mockResult = {
                foundMaps: mapData as MapData[],
                unrecognizedIds: [],
            };
            (mapsService.getMapsByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getMapsByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getMapsByIds).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle NotFoundError', async () => {
            mockRequest.query = { ids: 'invalid1,invalid2' };
            (mapsService.getMapsByIds as jest.Mock).mockRejectedValue(
                new NotFoundError(Messages.errors.notFound),
            );

            await expect(
                mapsController.getMapsByIds(mockRequest as Request, mockResponse as Response),
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
                mapsController.getMapsByIds(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(BadRequestError);
            await expect(
                mapsController.getMapsByIds(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'IDs')}`,
            );
        });
    });

    describe('getAllRooms', () => {
        it('should return all rooms', async () => {
            const mockResult = roomData as RoomData[];
            (mapsService.getAllRooms as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getAllRooms(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getAllRooms).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });
    });

    describe('getRoomsByIds', () => {
        it('should return found rooms and unrecognized IDs', async () => {
            mockRequest.query = { ids: 'keepersRoom,diningRoomF1' };
            const mockResult = {
                foundRooms: [
                    {
                        id: 'keepersRoom',
                        name: "Keeper's Room",
                        mapId: 'mansionF1',
                        roomNumber: 5,
                        thumbnailSrc: '',
                        overview: {
                            functions: [],
                            accessControl: { accessType: 'none', accessKey: 'None' },
                            risk: [
                                {
                                    threatLevel: 'low-moderate-risk',
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
                                },
                            ],
                        },
                        intel: {
                            examineText: '',
                            quote: { text: null, cite: null },
                            info: { text: null, cite: null },
                        },
                        adjoiningRooms: [],
                        detailList: { persons: [], interactables: [], biohazards: [], items: [] },
                    },
                ],
                unrecognizedIds: [],
            };
            (mapsService.getRoomsByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getRoomsByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getRoomsByIds).toHaveBeenCalledWith(['keepersRoom', 'diningRoomF1']);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle partial success', async () => {
            mockRequest.query = { ids: 'keepersRoom,invalid' };
            const mockResult = {
                foundRooms: [
                    {
                        id: 'keepersRoom',
                        name: "Keeper's Room",
                        mapId: 'mansionF1',
                        roomNumber: 5,
                        thumbnailSrc: '',
                        overview: {
                            functions: [],
                            accessControl: { accessType: 'none', accessKey: 'None' },
                            risk: [
                                {
                                    threatLevel: 'low-moderate-risk',
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
                                },
                            ],
                        },
                        intel: {
                            examineText: '',
                            quote: { text: null, cite: null },
                            info: { text: null, cite: null },
                        },
                        adjoiningRooms: [],
                        detailList: { persons: [], interactables: [], biohazards: [], items: [] },
                    },
                ],
                unrecognizedIds: ['invalid'],
            };
            (mapsService.getRoomsByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getRoomsByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getRoomsByIds).toHaveBeenCalledWith(['keepersRoom', 'invalid']);
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should return all rooms if no IDs provided', async () => {
            mockRequest.query = { ids: '' };
            const mockResult = {
                foundRooms: roomData as RoomData[],
                unrecognizedIds: [],
            };
            (mapsService.getRoomsByIds as jest.Mock).mockResolvedValue(mockResult);

            await mapsController.getRoomsByIds(mockRequest as Request, mockResponse as Response);

            expect(mapsService.getRoomsByIds).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
        });

        it('should handle NotFoundError', async () => {
            mockRequest.query = { ids: 'invalid1,invalid2' };
            (mapsService.getRoomsByIds as jest.Mock).mockRejectedValue(
                new NotFoundError(Messages.errors.notFound),
            );

            await expect(
                mapsController.getRoomsByIds(mockRequest as Request, mockResponse as Response),
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
                mapsController.getRoomsByIds(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(BadRequestError);
            await expect(
                mapsController.getRoomsByIds(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'IDs')}`,
            );
        });
    });

    describe('searchRooms', () => {
        it('should return filtered rooms', async () => {
            const mockRooms: RoomData[] = [
                {
                    id: 'keepersRoom',
                    name: "Keeper's Room",
                    mapId: 'mansionF1',
                    roomNumber: 5,
                    thumbnailSrc: '',
                    overview: {
                        functions: [],
                        accessControl: { accessType: 'none', accessKey: 'None' },
                        risk: [
                            {
                                threatLevel: 'low-moderate-risk',
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
                            },
                        ],
                    },
                    intel: {
                        examineText: '',
                        quote: { text: null, cite: null },
                        info: { text: null, cite: null },
                    },
                    adjoiningRooms: [],
                    detailList: { persons: [], interactables: [], biohazards: [], items: [] },
                },
            ];
            mockRequest.query = { map: 'mansionF1' };
            (mapsService.searchRooms as jest.Mock).mockResolvedValue(mockRooms);

            await mapsController.searchRooms(mockRequest as Request, mockResponse as Response);

            expect(mapsService.searchRooms).toHaveBeenCalledWith({ map: 'mansionF1' });
            expect(mockResponse.json).toHaveBeenCalledWith(mockRooms);
        });

        it('should handle invalid query parameters', async () => {
            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest.fn().mockReturnValue([{ msg: Messages.validation.invalidMapIdFormat }]),
            });

            await expect(
                mapsController.searchRooms(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(BadRequestError);
            await expect(
                mapsController.searchRooms(mockRequest as Request, mockResponse as Response),
            ).rejects.toThrow(
                `${Messages.validation.invalidQueryParameters}: ${Messages.validation.invalidMapIdFormat}`,
            );
        });
    });
});

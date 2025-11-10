/**
 * @file Unit tests for biohazardsService.
 * @description Tests service methods for fetching and searching biohazards from static in-memory data.
 * Ensures correct handling of valid inputs, partial matches, and error conditions. Follows AAA style and conventions,
 * using Jest for assertions.
 * @see {@link ../../services/biohazardsService.ts}
 * @see {@link ../../data/biohazards.ts}
 */
import * as biohazardsService from '../../../services/biohazardsService';
import { NotFoundError, BadRequestError } from '../../../errors/customErrors';
import { Messages } from '../../../constants';

import {
    biohazardsRoomData,
    biohazardsData,
    starsRankingData,
    BiohazardSearchFilters,
    BiohazardCode,
} from '../../../data';

describe('biohazardsService', () => {
    describe('getAllBiohazardsRoomData', () => {
        it('should return all biohazards room data', async () => {
            const result = await biohazardsService.getAllBiohazardsRoomData();
            expect(result.length).toBe(biohazardsRoomData.length);
            expect(result).toEqual(biohazardsRoomData);
        });
    });

    describe('getBiohazardsRoomDataByIds', () => {
        it('should return all found biohazards and no unrecognized IDs', async () => {
            const ids = ['zombie1-keepersRoom', 'zombie2-keepersRoom'];
            const result = await biohazardsService.getBiohazardsRoomDataByIds(ids);
            expect(result.foundBiohazards.length).toBe(2);
            expect(result.unrecognizedIds.length).toBe(0);
            expect(result.foundBiohazards[0].id).toBe('zombie1-keepersRoom');
        });

        it('should return partial found biohazards and unrecognized IDs', async () => {
            const ids = ['zombie1-keepersRoom', 'invalid-id'];
            const result = await biohazardsService.getBiohazardsRoomDataByIds(ids);
            expect(result.foundBiohazards.length).toBe(1);
            expect(result.unrecognizedIds).toEqual(['invalid-id']);
        });

        it('should handle duplicate IDs by returning unique biohazards', async () => {
            const ids = ['zombie1-keepersRoom', 'zombie1-keepersRoom'];
            const result = await biohazardsService.getBiohazardsRoomDataByIds(ids);
            expect(result.foundBiohazards.length).toBe(1);
            expect(result.foundBiohazards[0].id).toBe('zombie1-keepersRoom');
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should return all biohazards if no IDs provided', async () => {
            const result = await biohazardsService.getBiohazardsRoomDataByIds([]);
            expect(result.foundBiohazards.length).toBe(biohazardsRoomData.length);
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should throw NotFoundError if no biohazards found', async () => {
            const ids = ['invalid1', 'invalid2'];
            await expect(biohazardsService.getBiohazardsRoomDataByIds(ids)).rejects.toThrow(
                NotFoundError,
            );
            await expect(biohazardsService.getBiohazardsRoomDataByIds(ids)).rejects.toThrow(
                Messages.errors.notFound,
            );
        });

        it('should throw BadRequestError for too many IDs', async () => {
            const ids = Array(101).fill('zombie1-keepersRoom');
            await expect(biohazardsService.getBiohazardsRoomDataByIds(ids)).rejects.toThrow(
                BadRequestError,
            );
            await expect(biohazardsService.getBiohazardsRoomDataByIds(ids)).rejects.toThrow(
                Messages.validation.tooManyIds,
            );
        });

        it('should throw BadRequestError for invalid ID format', async () => {
            const ids = ['zombie1-keepersRoom', 'invalid@id'];
            await expect(biohazardsService.getBiohazardsRoomDataByIds(ids)).rejects.toThrow(
                BadRequestError,
            );
            await expect(biohazardsService.getBiohazardsRoomDataByIds(ids)).rejects.toThrow(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('getSTARSRankingByCodes', () => {
        it('should return all found rankings and no unrecognized codes', async () => {
            const codes = ['Zb', 'Cr'];
            const result = await biohazardsService.getSTARSRankingByCodes(codes);
            expect(result.foundRankings.length).toBe(2);
            expect(result.unrecognizedCodes.length).toBe(0);
            expect(result.foundRankings[0].code).toBe('Zb');
        });

        it('should return partial found rankings and unrecognized codes', async () => {
            const codes = ['Zb', 'invalid-code'];
            const result = await biohazardsService.getSTARSRankingByCodes(codes);
            expect(result.foundRankings.length).toBe(1);
            expect(result.unrecognizedCodes).toEqual(['invalid-code']);
        });

        it('should handle duplicate codes by returning unique rankings', async () => {
            const codes = ['Zb', 'Zb'];
            const result = await biohazardsService.getSTARSRankingByCodes(codes);
            expect(result.foundRankings.length).toBe(1);
            expect(result.foundRankings[0].code).toBe('Zb');
            expect(result.unrecognizedCodes).toEqual([]);
        });

        it('should return all rankings if no codes provided', async () => {
            const codes: BiohazardCode[] = [];
            starsRankingData.map((ranking) =>
                ranking.biohazardCodes.forEach((code: BiohazardCode) => codes.push(code)),
            );
            const result = await biohazardsService.getSTARSRankingByCodes([]);
            expect(result.foundRankings.length).toBe(codes.length);
            expect(result.unrecognizedCodes).toEqual([]);
        });

        it('should throw NotFoundError if no rankings found', async () => {
            const codes = ['invalid1', 'invalid2'];
            await expect(biohazardsService.getSTARSRankingByCodes(codes)).rejects.toThrow(
                NotFoundError,
            );
            await expect(biohazardsService.getSTARSRankingByCodes(codes)).rejects.toThrow(
                Messages.errors.notFound,
            );
        });

        it('should throw BadRequestError for too many codes', async () => {
            const codes = Array(101).fill('Zb');
            await expect(biohazardsService.getSTARSRankingByCodes(codes)).rejects.toThrow(
                BadRequestError,
            );
            await expect(biohazardsService.getSTARSRankingByCodes(codes)).rejects.toThrow(
                Messages.validation.tooManyCodes,
            );
        });

        it('should throw BadRequestError for invalid code format', async () => {
            const codes = ['Zb', 'invalid@code'];
            await expect(biohazardsService.getSTARSRankingByCodes(codes)).rejects.toThrow(
                BadRequestError,
            );
            await expect(biohazardsService.getSTARSRankingByCodes(codes)).rejects.toThrow(
                Messages.validation.invalidIdFormat.replace('{subject}', 'codes'),
            );
        });
    });

    describe('searchBiohazardsRoomData', () => {
        it('should return filtered biohazards by room', async () => {
            const filters = { room: 'keepersRoom' };
            const result = await biohazardsService.searchBiohazardsRoomData(
                filters as BiohazardSearchFilters,
            );
            expect(result).toBeInstanceOf(Array);
            expect(result.every((biohazard) => biohazard.map.roomId === 'keepersRoom')).toBe(true);
        });

        it('should return filtered biohazards by code', async () => {
            const filters = { code: 'Zb' };
            const result = await biohazardsService.searchBiohazardsRoomData(
                filters as BiohazardSearchFilters,
            );
            expect(result).toBeInstanceOf(Array);
            expect(result.every((biohazard) => biohazard.code === 'Zb')).toBe(true);
        });

        it('should return empty array for no matches', async () => {
            const filters = { room: 'nonexistent' };
            const result = await biohazardsService.searchBiohazardsRoomData(
                filters as BiohazardSearchFilters,
            );
            expect(result).toEqual([]);
        });

        it('should throw BadRequestError for invalid room ID format', async () => {
            const filters = { room: 'invalid@room' };
            await expect(
                biohazardsService.searchBiohazardsRoomData(filters as BiohazardSearchFilters),
            ).rejects.toThrow(BadRequestError);
            await expect(
                biohazardsService.searchBiohazardsRoomData(filters as BiohazardSearchFilters),
            ).rejects.toThrow(Messages.validation.invalidRoomIdFormat);
        });

        it('should throw BadRequestError for invalid biohazard code', async () => {
            const filters = { code: 'invalid' };
            await expect(
                biohazardsService.searchBiohazardsRoomData(filters as BiohazardSearchFilters),
            ).rejects.toThrow(BadRequestError);
            await expect(
                biohazardsService.searchBiohazardsRoomData(filters as BiohazardSearchFilters),
            ).rejects.toThrow(Messages.validation.invalidBiohazardCode);
        });
    });

    describe('getBiohazardsDataByIds', () => {
        it('should return all found base biohazards and no unrecognized IDs', async () => {
            const ids = ['Zb', 'Ht', 'Cb'];
            const result = await biohazardsService.getBiohazardsDataByIds(ids);
            expect(result.foundBiohazards.length).toBe(3);
            expect(result.unrecognizedIds.length).toBe(0);
        });

        it('should return partial found base biohazards and unrecognized IDs', async () => {
            const ids = ['Zb', 'invalid-id', 'Ht'];
            const result = await biohazardsService.getBiohazardsDataByIds(ids);
            expect(result.foundBiohazards.length).toBe(2);
            expect(result.unrecognizedIds).toEqual(['invalid-id']);
        });

        it('should handle duplicate IDs by returning unique biohazards', async () => {
            const ids = ['Zb', 'Zb', 'Ht'];
            const result = await biohazardsService.getBiohazardsDataByIds(ids);
            expect(result.foundBiohazards.length).toBe(2);
            expect(result.foundBiohazards.map((bh) => bh.id)).toContain('Zb');
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should return all base biohazards if no IDs provided', async () => {
            const result = await biohazardsService.getBiohazardsDataByIds([]);
            expect(result.foundBiohazards.length).toBe(biohazardsData.length);
            expect(result.unrecognizedIds).toEqual([]);
            expect(result.foundBiohazards).toEqual(biohazardsData);
        });

        it('should throw NotFoundError if no base biohazards found', async () => {
            const ids = ['invalid1', 'invalid2'];
            await expect(biohazardsService.getBiohazardsDataByIds(ids)).rejects.toThrow(
                NotFoundError,
            );
            await expect(biohazardsService.getBiohazardsDataByIds(ids)).rejects.toThrow(
                Messages.errors.notFound,
            );
        });

        it('should throw BadRequestError for too many IDs', async () => {
            const ids = Array(101).fill('Zb');
            await expect(biohazardsService.getBiohazardsDataByIds(ids)).rejects.toThrow(
                BadRequestError,
            );
            await expect(biohazardsService.getBiohazardsDataByIds(ids)).rejects.toThrow(
                Messages.validation.tooManyIds,
            );
        });

        it('should throw BadRequestError for invalid ID format', async () => {
            const ids = ['Zb', 'invalid@id'];
            await expect(biohazardsService.getBiohazardsDataByIds(ids)).rejects.toThrow(
                BadRequestError,
            );
            await expect(biohazardsService.getBiohazardsDataByIds(ids)).rejects.toThrow(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });

        it('should return biohazards with correct structure (id, name)', async () => {
            const ids = ['Zb', 'Ht'];
            const result = await biohazardsService.getBiohazardsDataByIds(ids);
            expect(result.foundBiohazards.length).toBe(2);

            const zombie = result.foundBiohazards.find((bh) => bh.id === 'Zb');
            expect(zombie).toBeDefined();
            expect(zombie?.name).toBe('Zombie');
            expect(zombie?.id).toBe('Zb');

            const hunter = result.foundBiohazards.find((bh) => bh.id === 'Ht');
            expect(hunter).toBeDefined();
            expect(hunter?.name).toBe('Hunter');
        });
    });

    describe('getAllSTARSRankings', () => {
        it('should return all S.T.A.R.S. rankings', async () => {
            const result = await biohazardsService.getAllSTARSRankings();
            expect(result.length).toBe(starsRankingData.length);
            expect(result).toEqual(starsRankingData);
        });

        it('should include complete ranking data structure', async () => {
            const result = await biohazardsService.getAllSTARSRankings();
            expect(result.length).toBeGreaterThan(0);

            const firstRanking = result[0];
            expect(firstRanking).toHaveProperty('starsClassification');
            expect(firstRanking).toHaveProperty('greeksClassification');
            expect(firstRanking).toHaveProperty('ranking');
            expect(firstRanking).toHaveProperty('threatLevel');
            expect(firstRanking).toHaveProperty('biohazardCodes');
        });
    });
});

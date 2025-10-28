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
    starsRankingData,
    BiohazardSearchFilters,
    BiohazardCode,
} from '../../../data';

describe('biohazardsService', () => {
    describe('getAllBiohazards', () => {
        it('should return all biohazards', async () => {
            const result = await biohazardsService.getAllBiohazards();
            expect(result.length).toBe(biohazardsRoomData.length);
            expect(result).toEqual(biohazardsRoomData);
        });
    });

    describe('getBiohazardsByIds', () => {
        it('should return all found biohazards and no unrecognized IDs', async () => {
            const ids = ['zombie1-keepersRoom', 'zombie2-keepersRoom'];
            const result = await biohazardsService.getBiohazardsByIds(ids);
            expect(result.foundBiohazards.length).toBe(2);
            expect(result.unrecognizedIds.length).toBe(0);
            expect(result.foundBiohazards[0].id).toBe('zombie1-keepersRoom');
        });

        it('should return partial found biohazards and unrecognized IDs', async () => {
            const ids = ['zombie1-keepersRoom', 'invalid-id'];
            const result = await biohazardsService.getBiohazardsByIds(ids);
            expect(result.foundBiohazards.length).toBe(1);
            expect(result.unrecognizedIds).toEqual(['invalid-id']);
        });

        it('should handle duplicate IDs by returning unique biohazards', async () => {
            const ids = ['zombie1-keepersRoom', 'zombie1-keepersRoom'];
            const result = await biohazardsService.getBiohazardsByIds(ids);
            expect(result.foundBiohazards.length).toBe(1);
            expect(result.foundBiohazards[0].id).toBe('zombie1-keepersRoom');
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should return all biohazards if no IDs provided', async () => {
            const result = await biohazardsService.getBiohazardsByIds([]);
            expect(result.foundBiohazards.length).toBe(biohazardsRoomData.length);
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should throw NotFoundError if no biohazards found', async () => {
            const ids = ['invalid1', 'invalid2'];
            await expect(biohazardsService.getBiohazardsByIds(ids)).rejects.toThrow(NotFoundError);
            await expect(biohazardsService.getBiohazardsByIds(ids)).rejects.toThrow(
                Messages.errors.notFound,
            );
        });

        it('should throw BadRequestError for too many IDs', async () => {
            const ids = Array(101).fill('zombie1-keepersRoom');
            await expect(biohazardsService.getBiohazardsByIds(ids)).rejects.toThrow(
                BadRequestError,
            );
            await expect(biohazardsService.getBiohazardsByIds(ids)).rejects.toThrow(
                Messages.validation.tooManyIds,
            );
        });

        it('should throw BadRequestError for invalid ID format', async () => {
            const ids = ['zombie1-keepersRoom', 'invalid@id'];
            await expect(biohazardsService.getBiohazardsByIds(ids)).rejects.toThrow(
                BadRequestError,
            );
            await expect(biohazardsService.getBiohazardsByIds(ids)).rejects.toThrow(
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

    describe('searchBiohazards', () => {
        it('should return filtered biohazards by room', async () => {
            const filters = { room: 'keepersRoom' };
            const result = await biohazardsService.searchBiohazards(
                filters as BiohazardSearchFilters,
            );
            expect(result).toBeInstanceOf(Array);
            expect(result.every((biohazard) => biohazard.map.roomId === 'keepersRoom')).toBe(true);
        });

        it('should return filtered biohazards by code', async () => {
            const filters = { code: 'Zb' };
            const result = await biohazardsService.searchBiohazards(
                filters as BiohazardSearchFilters,
            );
            expect(result).toBeInstanceOf(Array);
            expect(result.every((biohazard) => biohazard.code === 'Zb')).toBe(true);
        });

        it('should return empty array for no matches', async () => {
            const filters = { room: 'nonexistent' };
            const result = await biohazardsService.searchBiohazards(
                filters as BiohazardSearchFilters,
            );
            expect(result).toEqual([]);
        });

        it('should throw BadRequestError for invalid room ID format', async () => {
            const filters = { room: 'invalid@room' };
            await expect(
                biohazardsService.searchBiohazards(filters as BiohazardSearchFilters),
            ).rejects.toThrow(BadRequestError);
            await expect(
                biohazardsService.searchBiohazards(filters as BiohazardSearchFilters),
            ).rejects.toThrow(Messages.validation.invalidRoomIdFormat);
        });

        it('should throw BadRequestError for invalid biohazard code', async () => {
            const filters = { code: 'invalid' };
            await expect(
                biohazardsService.searchBiohazards(filters as BiohazardSearchFilters),
            ).rejects.toThrow(BadRequestError);
            await expect(
                biohazardsService.searchBiohazards(filters as BiohazardSearchFilters),
            ).rejects.toThrow(Messages.validation.invalidBiohazardCode);
        });
    });
});

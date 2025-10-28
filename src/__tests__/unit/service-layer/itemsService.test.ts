/**
 * @file Unit tests for mapsService.
 * @description Tests service methods for fetching and searching items from static in-memory data.
 * Ensures correct handling of valid inputs, partial matches, and error conditions. Follows AAA style and conventions,
 * using Jest for assertions.
 * @see {@link ../../services/itemsService.ts}
 * @see {@link ../../data/items.ts}
 */
import * as itemsService from '../../../services/itemsService';
import { NotFoundError, BadRequestError } from '../../../errors/customErrors';
import { Messages } from '../../../constants';

import { itemsRoomData, ItemSearchFilters } from '../../../data';

describe('itemsService', () => {
    describe('getAllItems', () => {
        it('should return all items', async () => {
            const result = await itemsService.getAllItems();
            expect(result.length).toBe(itemsRoomData.length);
            expect(result).toEqual(itemsRoomData);
        });
    });

    describe('getItemsByIds', () => {
        it('should return all found items and no unrecognized IDs', async () => {
            const ids = ['selfDefenseJV-keepersRoom', 'document-keepersRoom'];
            const result = await itemsService.getItemsByIds(ids);
            expect(result.foundItems.length).toBe(2);
            expect(result.unrecognizedIds.length).toBe(0);
            expect(result.foundItems[0].name).toBe('Battery Pack');
        });

        it('should return partial found items and unrecognized IDs', async () => {
            const ids = ['selfDefenseJV-keepersRoom', 'invalid-id', 'document-keepersRoom'];
            const result = await itemsService.getItemsByIds(ids);
            expect(result.foundItems.length).toBe(2);
            expect(result.unrecognizedIds).toEqual(['invalid-id']);
        });

        it('should handle duplicate IDs by returning unique items', async () => {
            const ids = ['selfDefenseJV-keepersRoom', 'selfDefenseJV-keepersRoom'];
            const result = await itemsService.getItemsByIds(ids);
            expect(result.foundItems.length).toBe(1);
            expect(result.foundItems[0].id).toBe('selfDefenseJV-keepersRoom');
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should return all items if no IDs provided', async () => {
            const result = await itemsService.getItemsByIds([]);
            expect(result.foundItems.length).toBe(itemsRoomData.length);
            expect(result.unrecognizedIds).toEqual([]);
            expect(result.foundItems).toEqual(itemsRoomData);
        });

        it('should throw NotFoundError if no items found', async () => {
            const ids = ['invalid1', 'invalid2'];
            await expect(itemsService.getItemsByIds(ids)).rejects.toThrow(NotFoundError);
            await expect(itemsService.getItemsByIds(ids)).rejects.toThrow(Messages.errors.notFound);
        });

        it('should throw BadRequestError for too many IDs', async () => {
            const ids = Array(101).fill('selfDefenseJV-keepersRoom');
            await expect(itemsService.getItemsByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(itemsService.getItemsByIds(ids)).rejects.toThrow(
                Messages.validation.tooManyIds,
            );
        });

        it('should throw BadRequestError for invalid ID format', async () => {
            const ids = ['selfDefenseJV-keepersRoom', 'invalid@id'];
            await expect(itemsService.getItemsByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(itemsService.getItemsByIds(ids)).rejects.toThrow(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });
    });

    describe('searchItems', () => {
        it('should return filtered items by room', async () => {
            const filters = { room: 'keepersRoom' };
            const result = await itemsService.searchItems(filters as ItemSearchFilters);
            expect(result).toBeInstanceOf(Array);
            expect(result.every((item) => item.map.roomId === 'keepersRoom')).toBe(true);
        });

        it('should return filtered items by difficulty', async () => {
            const filters = { difficulty: 'JV-lvl-easy' };
            const result = await itemsService.searchItems(filters as ItemSearchFilters);
            expect(result).toBeInstanceOf(Array);
            expect(result.every((item) => item.difficultyLevel.includes('JV-lvl-easy'))).toBe(true);
        });

        it('should return empty array for no matches', async () => {
            const filters = { room: 'nonexistent' };
            const result = await itemsService.searchItems(filters as ItemSearchFilters);
            expect(result).toEqual([]);
        });

        it('should throw BadRequestError for invalid room ID format', async () => {
            const filters = { room: 'invalid@room' };
            await expect(itemsService.searchItems(filters as ItemSearchFilters)).rejects.toThrow(
                BadRequestError,
            );
            await expect(itemsService.searchItems(filters as ItemSearchFilters)).rejects.toThrow(
                Messages.validation.invalidRoomIdFormat,
            );
        });

        it('should throw BadRequestError for invalid item type', async () => {
            const filters = { type: 'invalid' };
            await expect(itemsService.searchItems(filters as ItemSearchFilters)).rejects.toThrow(
                BadRequestError,
            );
            await expect(itemsService.searchItems(filters as ItemSearchFilters)).rejects.toThrow(
                Messages.validation.invalidItemType,
            );
        });
    });
});

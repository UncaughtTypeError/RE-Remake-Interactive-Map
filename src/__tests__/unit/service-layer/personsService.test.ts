/**
 * @file Unit tests for personsService.
 * @description Tests service methods for fetching persons from static in-memory data.
 * Ensures correct handling of valid inputs, partial matches, and error conditions. Follows AAA style and conventions,
 * using Jest for assertions.
 * @see {@link ../../services/personsService.ts}
 * @see {@link ../../data/items.ts}
 */
import * as personsService from '../../../services/personsService';
import { NotFoundError, BadRequestError } from '../../../errors/customErrors';
import { Messages } from '../../../constants';

import { personsData } from '../../../data';

describe('personsService', () => {
    describe('getAllPersonsData', () => {
        it('should return all persons base data', async () => {
            const result = await personsService.getAllPersonsData();
            expect(result.length).toBe(personsData.length);
            expect(result).toEqual(personsData);
        });
    });

    describe('getPersonsDataByIds', () => {
        it('should return all found persons and no unrecognized IDs', async () => {
            const ids = ['jillValentine', 'barryBurton'];
            const result = await personsService.getPersonsDataByIds(ids);
            expect(result.foundPersons.length).toBe(2);
            expect(result.unrecognizedIds.length).toBe(0);
            expect(result.foundPersons[0].name).toBe('Jill Valentine');
        });

        it('should return partial found persons and unrecognized IDs', async () => {
            const ids = ['jillValentine', 'invalid-id', 'barryBurton'];
            const result = await personsService.getPersonsDataByIds(ids);
            expect(result.foundPersons.length).toBe(2);
            expect(result.unrecognizedIds).toEqual(['invalid-id']);
        });

        it('should handle duplicate IDs by returning unique persons', async () => {
            const ids = ['jillValentine', 'jillValentine'];
            const result = await personsService.getPersonsDataByIds(ids);
            expect(result.foundPersons.length).toBe(1);
            expect(result.foundPersons[0].id).toBe('jillValentine');
            expect(result.unrecognizedIds).toEqual([]);
        });

        it('should return all persons if no IDs provided', async () => {
            const result = await personsService.getPersonsDataByIds([]);
            expect(result.foundPersons.length).toBe(personsData.length);
            expect(result.unrecognizedIds).toEqual([]);
            expect(result.foundPersons).toEqual(personsData);
        });

        it('should throw NotFoundError if no persons found', async () => {
            const ids = ['invalid1', 'invalid2'];
            await expect(personsService.getPersonsDataByIds(ids)).rejects.toThrow(NotFoundError);
            await expect(personsService.getPersonsDataByIds(ids)).rejects.toThrow(
                Messages.errors.notFound,
            );
        });

        it('should throw BadRequestError for too many IDs', async () => {
            const ids = Array(101).fill('jillValentine');
            await expect(personsService.getPersonsDataByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(personsService.getPersonsDataByIds(ids)).rejects.toThrow(
                Messages.validation.tooManyIds,
            );
        });

        it('should throw BadRequestError for invalid ID format', async () => {
            const ids = ['jillValentine', 'invalid@id'];
            await expect(personsService.getPersonsDataByIds(ids)).rejects.toThrow(BadRequestError);
            await expect(personsService.getPersonsDataByIds(ids)).rejects.toThrow(
                Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'),
            );
        });

        it('should return persons with correct structure (id, name, type, taxonomy, bio, exclusive)', async () => {
            const ids = ['jillValentine', 'chrisRedfield'];
            const result = await personsService.getPersonsDataByIds(ids);
            expect(result.foundPersons.length).toBe(2);

            const jill = result.foundPersons.find((person) => person.id === 'jillValentine');
            expect(jill).toBeDefined();
            expect(jill?.name).toBe('Jill Valentine');
            expect(jill?.type).toBe('PersonOfInterest');
            expect(jill?.taxonomy).toBe('Persons');
            expect(jill?.bio).toBeDefined();
            expect(jill?.exclusive).toBeDefined();

            const chris = result.foundPersons.find((person) => person.id === 'chrisRedfield');
            expect(chris).toBeDefined();
            expect(chris?.name).toBe('Chris Redfield');
            expect(chris?.type).toBe('PersonOfInterest');
        });
    });
});

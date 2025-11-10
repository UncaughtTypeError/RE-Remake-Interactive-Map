/**
 * @file Service layer for persons-related business logic in the Express API.
 * @description Provides pure functions for querying and filtering persons data from
 * {@link personsData} (base data) in `src/data/items.ts`.
 * These functions handle business logic and error conditions, keeping controllers focused on
 * HTTP handling. The data is readonly due to `as const` for immutability and type safety.
 * @see {@link ../data/items.ts}
 * @see {@link ../data/README.md} for data structure details.
 */
import { personsData, PersonData } from '../data';
import { NotFoundError, BadRequestError } from '../errors/customErrors';
import { Messages } from '../constants';

/**
 * Retrieves all persons base data from the static in-memory data source.
 *
 * @description Fetches the entire dataset of persons stored in {@link personsData}.
 * Returns S.T.A.R.S. team members and characters (e.g., Jill Valentine, Chris Redfield, Barry Burton).
 * The data is readonly due to the `as const` assertion, ensuring immutability.
 * Suitable for the `GET /api/persons/all` endpoint.
 *
 * @returns {Promise<PersonData[]>} A promise resolving to an array of all persons base data.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/persons/all
 * const persons = await getAllPersonsData();
 * // Returns: [{ id: 'jillValentine', name: 'Jill Valentine', type: 'PersonOfInterest', ... }, ...]
 * ```
 */
export const getAllPersonsData = async (): Promise<PersonData[]> => personsData as PersonData[];

/**
 * Retrieves specific persons base data by their unique identifiers.
 *
 * @description Queries {@link personsData} for persons matching the provided IDs.
 * Returns an object with found persons and any unrecognized IDs. If no IDs are provided,
 * returns all persons base data. Validates input for a maximum of 100 IDs and format (alphanumeric
 * with hyphens). Uses a Map for O(1) lookups and deduplicates IDs to avoid redundant results.
 * Suitable for the `GET /api/persons?ids=...` endpoint.
 *
 * @param ids - An array of unique person identifiers (e.g., ['jillValentine', 'chrisRedfield']).
 * @returns {Promise<{ foundPersons: PersonData[]; unrecognizedIds: string[] }>} A promise resolving
 * to an object containing an array of found persons and an array of unrecognized IDs.
 *
 * @throws {BadRequestError} If more than 100 IDs are provided or any ID contains invalid characters.
 * @throws {NotFoundError} If no provided IDs match any persons.
 *
 * @example
 * ```typescript
 * // Endpoint: GET /api/persons?ids=jillValentine,barryBurton
 * const result = await getPersonsDataByIds(['jillValentine', 'barryBurton']);
 * // Returns: { foundPersons: [{ id: 'jillValentine', name: 'Jill Valentine', ... }, ...], unrecognizedIds: [] }
 * ```
 */
export const getPersonsDataByIds = async (
    ids: string[],
): Promise<{ foundPersons: PersonData[]; unrecognizedIds: string[] }> => {
    if (!ids || ids.length === 0) {
        return { foundPersons: personsData as PersonData[], unrecognizedIds: [] };
    }
    if (ids.length > 100) {
        throw new BadRequestError(Messages.validation.tooManyIds);
    }
    if (ids.some((id) => typeof id !== 'string' || !id.match(/^[a-zA-Z0-9-]+$/))) {
        throw new BadRequestError(Messages.validation.invalidIdFormat.replace('{subject}', 'IDs'));
    }

    const uniqueIds = [...new Set(ids)]; // Deduplicate IDs
    const idMap = new Map<string, PersonData>(personsData.map((person) => [person.id, person]));
    const foundPersons: PersonData[] = [];
    const unrecognizedIds: string[] = [];

    uniqueIds.forEach((id) => {
        const person = idMap.get(id);
        if (person) {
            foundPersons.push(person);
        } else {
            unrecognizedIds.push(id);
        }
    });

    if (foundPersons.length === 0) {
        throw new NotFoundError(Messages.errors.notFound);
    }

    return { foundPersons, unrecognizedIds };
};

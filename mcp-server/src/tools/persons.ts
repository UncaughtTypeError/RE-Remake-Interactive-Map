/**
 * MCP Tools for persons-related endpoints
 */

import { ApiClient } from '../client.js';

interface PersonsResponse {
    id: string;
    name: string;
    type: 'PersonOfInterest';
    taxonomy: 'Persons';
    imageSrc: string;
    bio: string;
    exclusive: 'JV' | 'CR' | null;
}

interface PersonsByIdsResponse {
    foundPersons: PersonsResponse[];
    unrecognizedIds: string[];
}

export function createPersonsTools(client: ApiClient) {
    return [
        {
            name: 'get_all_persons_data',
            description:
                'Get all persons data from the RE Remake Interactive Map. Returns basic information about all S.T.A.R.S. team members and characters in the game (Jill Valentine, Chris Redfield, Barry Burton, Rebecca Chambers, etc.). Use this to get a complete list of all persons.',
            inputSchema: {
                type: 'object' as const,
                properties: {},
                required: [] as string[],
            },
            handler: async () => {
                const data = await client.request<PersonsResponse[]>('/api/persons/all');
                return {
                    content: [
                        {
                            type: 'text' as const,
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'get_persons_data_by_ids',
            description:
                'Fetch specific persons by their IDs. Returns person information for the requested IDs. Use this when you know exact person IDs. Person IDs use camelCase format like "jillValentine", "chrisRedfield", "barryBurton", "rebeccaChambers", etc.',
            inputSchema: {
                type: 'object' as const,
                properties: {
                    ids: {
                        type: 'array' as const,
                        items: { type: 'string' as const },
                        description:
                            'Array of person IDs in camelCase format (e.g., ["jillValentine", "barryBurton", "chrisRedfield"]). Common IDs: jillValentine, chrisRedfield, barryBurton, rebeccaChambers, albertWesker, etc.',
                    },
                },
                required: ['ids'] as string[],
            },
            handler: async (args: { ids: string[] }) => {
                const idsParam = args.ids.join(',');
                const data = await client.request<PersonsByIdsResponse>(
                    `/api/persons?ids=${idsParam}`,
                );
                return {
                    content: [
                        {
                            type: 'text' as const,
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            },
        },
    ];
}

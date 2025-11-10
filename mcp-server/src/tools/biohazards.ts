/**
 * Biohazards API tools
 * Provides access to enemy/creature data with base data and room data endpoints
 */

import { ApiClient } from '../client.js';
import { BiohazardsResponse, BiohazardCode } from '../types.js';

export function createBiohazardsTools(client: ApiClient) {
    return [
        // BASE DATA TOOLS (no room/difficulty filtering)
        {
            name: 'get_all_biohazards_data',
            description:
                'Get all biohazards (enemies/creatures) base data from the RE Remake Interactive Map. Returns simple biohazard information (id, name, code) without room locations or difficulty availability. Use this for general enemy catalog browsing. For complete S.T.A.R.S. intelligence with room locations, use get_all_biohazards_room_data instead.',
            inputSchema: {
                type: 'object',
                properties: {},
            },
            handler: async () => {
                const data = await client.request<BiohazardsResponse>('/api/biohazards/all');

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'get_biohazards_data_by_ids',
            description:
                'Fetch specific biohazards base data by their IDs. Returns simple biohazard information (id, name, code) without room locations or S.T.A.R.S. intelligence. Use this when you need basic biohazard info by IDs. For complete S.T.A.R.S. classifications with room locations, use get_biohazards_room_data_by_ids instead.',
            inputSchema: {
                type: 'object',
                properties: {
                    ids: {
                        type: 'array',
                        items: { type: 'string' },
                        description:
                            'Array of biohazard IDs (e.g., ["zombie1-keepersRoom", "zombie2-keepersRoom"]). IDs use format: biohazardType-roomId.',
                    },
                },
                required: ['ids'],
            },
            handler: async (args: { ids: string[] }) => {
                const params: Record<string, string> = {
                    ids: args.ids.join(','),
                };

                const data = await client.request<BiohazardsResponse>('/api/biohazards', params);

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'search_biohazards_data',
            description:
                'Search biohazards base data by name or S.T.A.R.S. code only. Returns simple biohazard information without room locations or complete S.T.A.R.S. intelligence. Supports partial name matching (case-insensitive). For room-based searches with complete combat data, use search_biohazards_room_data instead.',
            inputSchema: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string',
                        description:
                            'Filter by S.T.A.R.S. code (e.g., "Zb" for Zombie, "Ht" for Hunter, "Cb" for Cerberus).',
                    },
                    name: {
                        type: 'string',
                        description:
                            'Search by biohazard name (case-insensitive, partial match). E.g., "hunter", "zombie", "tyrant".',
                    },
                },
            },
            handler: async (args: { code?: string; name?: string }) => {
                const params: Record<string, string> = {};
                if (args.code) params.code = args.code;
                if (args.name) params.name = args.name;

                const data = await client.request<BiohazardsResponse>(
                    '/api/biohazards/search',
                    params,
                );

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            },
        },

        // ROOM DATA TOOLS (with S.T.A.R.S. intelligence and room locations)
        {
            name: 'get_all_biohazards_room_data',
            description:
                'Get all biohazards (enemies/creatures) room data from the RE Remake Interactive Map. Returns complete S.T.A.R.S. (Statistical Threat Analysis Rating Standard) intelligence including threat classifications (low to severe), Greek rankings (Eta to Alpha), star ratings (1-3), engagement directives (e.g., "Ignore else Engage", "Do Not Engage"), authorized response procedures, effective measures (weapon effectiveness/shot counts), threat profiles, behavioral patterns, caution advisories, room locations, and detailed combat strategies. Use this to browse all enemy types and their combat data.',
            inputSchema: {
                type: 'object',
                properties: {},
            },
            handler: async () => {
                const data = await client.request<BiohazardsResponse>('/api/biohazards/rooms/all');

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'get_biohazards_room_data_by_ids',
            description:
                'Fetch specific biohazards room data by their IDs. Returns complete S.T.A.R.S. (Statistical Threat Analysis Rating Standard) classifications: threat levels, Greek rankings (Eta-Alpha), star ratings (1-3), engagement directives, weapon effectiveness (shot counts per weapon), threat assessments, authorized response procedures, room locations, and detailed combat strategies. Use this when you know the exact biohazard IDs.',
            inputSchema: {
                type: 'object',
                properties: {
                    ids: {
                        type: 'array',
                        items: { type: 'string' },
                        description:
                            'Array of biohazard IDs (e.g., ["zombie1-keepersRoom", "zombie2-keepersRoom"]). IDs use format: biohazardType-roomId.',
                    },
                },
                required: ['ids'],
            },
            handler: async (args: { ids: string[] }) => {
                const params: Record<string, string> = {
                    ids: args.ids.join(','),
                };

                const data = await client.request<BiohazardsResponse>(
                    '/api/biohazards/rooms',
                    params,
                );

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'search_biohazards_room_data',
            description:
                'Search biohazards room data by name, S.T.A.R.S. code, room, or difficulty. Use this for queries like "find all zombies", "what is a Hunter weak to?", or "search for enemies in a specific room". Supports partial name matching and returns complete S.T.A.R.S. (Statistical Threat Analysis Rating Standard) intelligence: threat classifications (low-severe), Greek rankings (Eta-Alpha), star ratings (1-3), engagement directives, weapon effectiveness ratings, shot counts, threat profiles, behavioral patterns, room locations, and detailed combat strategies.',
            inputSchema: {
                type: 'object',
                properties: {
                    room: {
                        type: 'string',
                        description:
                            'Filter by room ID in camelCase (e.g., "keepersRoom", "diningRoomF1"). Use search_rooms to discover room IDs.',
                    },
                    difficulty: {
                        type: 'string',
                        enum: [
                            'JV-lvl-very-easy',
                            'JV-lvl-easy',
                            'JV-lvl-normal',
                            'JV-lvl-hard',
                            'CR-lvl-very-easy',
                            'CR-lvl-easy',
                            'CR-lvl-normal',
                            'CR-lvl-hard',
                        ],
                        description: 'Optional: Filter by difficulty level',
                    },
                    code: {
                        type: 'string',
                        description:
                            'Filter by S.T.A.R.S. code (e.g., "Zb" for Zombie, "Ht" for Hunter, "Cb" for Cerberus).',
                    },
                    name: {
                        type: 'string',
                        description:
                            'Search by biohazard name (case-insensitive, partial match). E.g., "hunter", "zombie", "tyrant".',
                    },
                },
            },
            handler: async (args: {
                room?: string;
                difficulty?: string;
                code?: string;
                name?: string;
            }) => {
                const params: Record<string, string> = {};
                if (args.room) params.room = args.room;
                if (args.difficulty) params.difficulty = args.difficulty;
                if (args.code) params.code = args.code;
                if (args.name) params.name = args.name;

                const data = await client.request<BiohazardsResponse>(
                    '/api/biohazards/rooms/search',
                    params,
                );

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            },
        },
    ];
}

/**
 * Maps API tools
 * Provides access to room and area data including items, biohazards, and access requirements
 */

import { ApiClient } from '../client.js';
import { RoomsResponse, AreasResponse, DifficultyLevel } from '../types.js';

export function createMapsTools(client: ApiClient) {
    return [
        {
            name: 'get_all_areas',
            description:
                'Get all map areas in the game (e.g., Mansion 1F, Mansion 2F, Courtyard, Laboratory). Use this to see the overall game structure and available locations. Returns area names and their associated map IDs.',
            inputSchema: {
                type: 'object',
                properties: {},
            },
            handler: async () => {
                const data = await client.request<AreasResponse>('/api/maps/areas');

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
            name: 'get_rooms_by_ids',
            description:
                'Fetch specific rooms by their IDs. Returns complete room details including items, biohazards, threat levels, access requirements (keys), and adjoining rooms. Use this when you know exact room IDs. Room IDs use camelCase format like "keepersRoom", "diningRoom", "mainHall". To discover room IDs, use search_rooms or get_all_areas first.',
            inputSchema: {
                type: 'object',
                properties: {
                    ids: {
                        type: 'array',
                        items: { type: 'string' },
                        description:
                            'Array of room IDs in camelCase format (e.g., ["keepersRoom", "diningRoom", "mainHall"]). Do NOT use kebab-case. Use search_rooms to discover valid room IDs first.',
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
                        description:
                            'Optional: Filter items and biohazards by difficulty level to see what\'s available on that difficulty.',
                    },
                },
                required: ['ids'],
            },
            handler: async (args: { ids: string[]; difficulty?: DifficultyLevel }) => {
                const params: Record<string, string> = {
                    ids: args.ids.join(','),
                };
                if (args.difficulty) {
                    params.difficulty = args.difficulty;
                }

                const data = await client.request<RoomsResponse>('/api/maps/rooms', params);

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
            name: 'search_rooms',
            description:
                'Search rooms by map, items, biohazards, room function, or other criteria. Use this to find rooms matching specific conditions. WARNING: This returns the full room objects which can be large. Use specific filters to limit results. Map IDs use camelCase like "mansionF1", "guardhouseF1".',
            inputSchema: {
                type: 'object',
                properties: {
                    map: {
                        type: 'string',
                        description:
                            'Filter by map ID using camelCase (e.g., "mansionF1", "mansionF2", "guardhouseF1"). Use get_all_areas to discover valid map IDs.',
                    },
                    item: {
                        type: 'string',
                        description:
                            'Filter rooms containing specific item (e.g., "shotgun", "greenHerb"). Returns rooms that have this item.',
                    },
                    biohazard: {
                        type: 'string',
                        description:
                            'Filter rooms containing specific biohazard/enemy (e.g., "zombie", "hunter", "cerberus").',
                    },
                    person: {
                        type: 'string',
                        description:
                            'Filter rooms with specific person (e.g., "barryBurton"). Use camelCase.',
                    },
                    interactable: {
                        type: 'string',
                        description:
                            'Filter rooms with specific interactable object (e.g., "piano", "typewriter").',
                    },
                    roomFunction: {
                        type: 'string',
                        description:
                            'Filter by room function (e.g., "saveRoom", "puzzleRoom", "safeRoom", "itemStorage"). Use camelCase.',
                    },
                    adjoiningRoom: {
                        type: 'string',
                        description:
                            'Filter rooms connected to specific room ID (e.g., "diningRoomF1"). Use camelCase.',
                    },
                    accessControl: {
                        type: 'string',
                        description:
                            'Filter by required access key (e.g., "shieldKey", "Armor Key").',
                    },
                    threatLevel: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 5,
                        description: 'Filter by threat level (0-5 scale).',
                    },
                    roomNumber: {
                        type: 'string',
                        description: 'Filter by room number (e.g., "101").',
                    },
                },
            },
            handler: async (args: {
                map?: string;
                item?: string;
                biohazard?: string;
                person?: string;
                interactable?: string;
                roomFunction?: string;
                adjoiningRoom?: string;
                accessControl?: string;
                threatLevel?: number;
                roomNumber?: string;
            }) => {
                const params: Record<string, string> = {};
                if (args.map) params.map = args.map;
                if (args.item) params.item = args.item;
                if (args.biohazard) params.biohazard = args.biohazard;
                if (args.person) params.person = args.person;
                if (args.interactable) params.interactable = args.interactable;
                if (args.roomFunction) params.roomFunction = args.roomFunction;
                if (args.adjoiningRoom) params.adjoiningRoom = args.adjoiningRoom;
                if (args.accessControl) params.accessControl = args.accessControl;
                if (args.threatLevel !== undefined) params.threatLevel = args.threatLevel.toString();
                if (args.roomNumber) params.roomNumber = args.roomNumber;

                const data = await client.request<RoomsResponse>('/api/maps/rooms/search', params);

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
            name: 'get_rooms_by_map',
            description:
                'WARNING: Returns ALL rooms for a map which can be VERY LARGE (50K+ tokens). Only use when you need complete map data. For finding specific rooms, use search_rooms instead with specific filters. Map IDs use camelCase like "mansionF1", "mansionF2", "guardhouseF1". Use get_all_areas to discover valid map IDs first.',
            inputSchema: {
                type: 'object',
                properties: {
                    mapId: {
                        type: 'string',
                        description:
                            'Map ID in camelCase format (e.g., "mansionF1", "mansionF2", "guardhouseF1", "labB4"). Use get_all_areas to see all available map IDs first.',
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
                        description: 'Optional: Filter room contents by difficulty level',
                    },
                },
                required: ['mapId'],
            },
            handler: async (args: { mapId: string; difficulty?: DifficultyLevel }) => {
                const params: Record<string, string> = {
                    mapId: args.mapId,
                };
                if (args.difficulty) {
                    params.difficulty = args.difficulty;
                }

                const data = await client.request<RoomsResponse>('/api/maps/rooms', params);

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

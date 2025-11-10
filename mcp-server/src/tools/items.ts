/**
 * Items API tools
 * Provides access to game items with base data and room data endpoints
 */

import { ApiClient } from '../client.js';
import { ItemsResponse, DifficultyLevel, ItemType } from '../types.js';

export function createItemsTools(client: ApiClient) {
    return [
        // BASE DATA TOOLS (no room/difficulty filtering)
        {
            name: 'get_all_items_data',
            description:
                'Get all items base data from the RE Remake Interactive Map. Returns simple item information (id, name, type) without room locations or difficulty availability. Use this for general item catalog browsing. For room-specific data with difficulty filtering, use get_all_items_room_data instead.',
            inputSchema: {
                type: 'object',
                properties: {},
            },
            handler: async () => {
                const data = await client.request<ItemsResponse>('/api/items/all');

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
            name: 'get_items_data_by_ids',
            description:
                'Fetch specific items base data by their IDs. Returns simple item information (id, name, type) without room locations. Use this when you need basic item info by IDs. For detailed room locations and difficulty availability, use get_items_room_data_by_ids instead.',
            inputSchema: {
                type: 'object',
                properties: {
                    ids: {
                        type: 'array',
                        items: { type: 'string' },
                        description:
                            'Array of item IDs to fetch (e.g., ["selfDefenseJV-keepersRoom", "document-keepersRoom"]). IDs use format: itemType-roomId.',
                    },
                },
                required: ['ids'],
            },
            handler: async (args: { ids: string[] }) => {
                const params: Record<string, string> = {
                    ids: args.ids.join(','),
                };

                const data = await client.request<ItemsResponse>('/api/items', params);

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
            name: 'search_items_data',
            description:
                'Search items base data by name or type only. Returns simple item information without room locations or difficulty availability. Supports partial name matching (case-insensitive). For room-based or difficulty-based searches, use search_items_room_data instead.',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description:
                            'Search by item name (case-insensitive, partial match). E.g., "shotgun" will match "Shotgun Shells".',
                    },
                    type: {
                        type: 'string',
                        enum: [
                            'Typewriter',
                            'ItemBox',
                            'Kerosene',
                            'Map',
                            'PersonOfInterest',
                            'DoorKey',
                            'InkRibbon',
                            'ItemOfInterest',
                            'Document',
                            'GreenHerb',
                            'RedHerb',
                            'BlueHerb',
                            'FirstAid',
                            'MixedHerbs',
                            'SelfDefense',
                            'Ammunition',
                            'Weapon',
                        ],
                        description:
                            'Filter by exact item type (PascalCase). Use "Weapon" for guns, "Ammunition" for ammo, "GreenHerb"/"RedHerb"/"BlueHerb"/"FirstAid"/"MixedHerbs" for healing, "DoorKey" for keys.',
                    },
                },
            },
            handler: async (args: { name?: string; type?: ItemType }) => {
                const params: Record<string, string> = {};
                if (args.name) params.name = args.name;
                if (args.type) params.type = args.type;

                const data = await client.request<ItemsResponse>('/api/items/search', params);

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

        // ROOM DATA TOOLS (with room locations and difficulty filtering)
        {
            name: 'get_all_items_room_data',
            description:
                'Get all items room data from the RE Remake Interactive Map. Returns detailed item information including room locations, map data, and difficulty availability. Optionally filter by difficulty level to see item availability. Use this to browse items with their locations and see what items are available on a specific difficulty.',
            inputSchema: {
                type: 'object',
                properties: {
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
                            'Optional: Filter items by difficulty level (JV = Jill Valentine, CR = Chris Redfield)',
                    },
                },
            },
            handler: async (args: { difficulty?: DifficultyLevel }) => {
                const params: Record<string, string> = {};
                if (args.difficulty) {
                    params.difficulty = args.difficulty;
                }

                const data = await client.request<ItemsResponse>('/api/items/rooms/all', params);

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
            name: 'get_items_room_data_by_ids',
            description:
                'Fetch specific items room data by their IDs. Returns detailed information about each item including room locations, map data, type, and difficulty availability. Use this when you know the exact item IDs and need their complete room location data.',
            inputSchema: {
                type: 'object',
                properties: {
                    ids: {
                        type: 'array',
                        items: { type: 'string' },
                        description:
                            'Array of item IDs to fetch (e.g., ["selfDefenseJV-keepersRoom", "document-keepersRoom"]). IDs use format: itemType-roomId.',
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
                        description: 'Optional: Filter by difficulty level to check availability',
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

                const data = await client.request<ItemsResponse>('/api/items/rooms', params);

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
            name: 'search_items_room_data',
            description:
                'Search items room data by name, type, room, or difficulty. Returns detailed item information including room locations and map data. Use this for exploratory queries like "find all weapons in keepersRoom" or "search for items available on normal difficulty". Supports partial name matching (case-insensitive).',
            inputSchema: {
                type: 'object',
                properties: {
                    room: {
                        type: 'string',
                        description:
                            'Filter by room ID in camelCase (e.g., "keepersRoom", "diningRoomF1"). Use search_rooms to discover room IDs.',
                    },
                    name: {
                        type: 'string',
                        description:
                            'Search by item name (case-insensitive, partial match). E.g., "shotgun" will match "Shotgun Shells".',
                    },
                    type: {
                        type: 'string',
                        enum: [
                            'Typewriter',
                            'ItemBox',
                            'Kerosene',
                            'Map',
                            'PersonOfInterest',
                            'DoorKey',
                            'InkRibbon',
                            'ItemOfInterest',
                            'Document',
                            'GreenHerb',
                            'RedHerb',
                            'BlueHerb',
                            'FirstAid',
                            'MixedHerbs',
                            'SelfDefense',
                            'Ammunition',
                            'Weapon',
                        ],
                        description:
                            'Filter by exact item type (PascalCase). Use "Weapon" for guns, "Ammunition" for ammo, "GreenHerb"/"RedHerb"/"BlueHerb"/"FirstAid"/"MixedHerbs" for healing, "DoorKey" for keys.',
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
                },
            },
            handler: async (args: {
                room?: string;
                name?: string;
                type?: ItemType;
                difficulty?: DifficultyLevel;
            }) => {
                const params: Record<string, string> = {};
                if (args.room) params.room = args.room;
                if (args.name) params.name = args.name;
                if (args.type) params.type = args.type;
                if (args.difficulty) params.difficulty = args.difficulty;

                const data = await client.request<ItemsResponse>('/api/items/rooms/search', params);

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

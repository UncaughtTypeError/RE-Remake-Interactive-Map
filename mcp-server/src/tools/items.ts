/**
 * Items API tools
 * Provides access to game items with difficulty-based filtering
 */

import { ApiClient } from '../client.js';
import { ItemsResponse, DifficultyLevel, ItemType } from '../types.js';

export function createItemsTools(client: ApiClient) {
    return [
        {
            name: 'get_all_items',
            description:
                'Get all items from the RE Remake Interactive Map. Optionally filter by difficulty level to see item availability. Use this to browse the complete item catalog or see what items are available on a specific difficulty.',
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

                const data = await client.request<ItemsResponse>('/api/items/all', params);

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
            name: 'get_items_by_ids',
            description:
                'Fetch specific items by their IDs. Use this when you know the exact item IDs (e.g., "selfDefenseJV-keepersRoom", "document-keepersRoom"). Returns detailed information about each item including locations, type, and availability.',
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
            name: 'search_items',
            description:
                'Search items by name, type, room, or difficulty. Use this for exploratory queries like "find all weapons" or "search for items in a specific room". Supports partial name matching (case-insensitive).',
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
    ];
}

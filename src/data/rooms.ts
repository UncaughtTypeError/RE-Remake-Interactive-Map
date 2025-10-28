/**
 * @file Static in-memory data for rooms.
 * @description Defines the `roomData` array of {@link RoomData} objects, representing rooms (e.g.,
 * Keeper's Room) used by services for querying and filtering. Each room includes arrays of biohazard and item IDs.
 * Uses `as const` for immutability and precise type inference (e.g., `accessKey` as literal).
 * Suitable for endpoints like `GET /api/maps/rooms`.
 * @see {@link ./README.md} for data structure details.
 */
import { RoomData } from './types';

// Dictionary of thumbnail IDs and image source paths
const thumbnailPaths: Record<string, string> = {
    mainHallF1:
        'https://vignette3.wikia.nocookie.net/residentevil/images/4/4f/Entrance_Hall.png/revision/latest?cb=20161126120440',
    diningRoomF1:
        'https://vignette2.wikia.nocookie.net/residentevil/images/7/77/R105_00005.jpg/revision/latest?cb=20150608142836',
    teaRoomCorridor:
        'https://vignette4.wikia.nocookie.net/residentevil/images/3/30/R103_00017.jpg/revision/latest?cb=20150609093727',
    bar: 'https://vignette4.wikia.nocookie.net/residentevil/images/5/5b/R10f_00002.jpg/revision/latest?cb=20150615120252',
    keepersRoom:
        'https://vignette1.wikia.nocookie.net/residentevil/images/1/1c/R10e_00002.jpg/revision/latest?cb=20150624055906',
    westWingNorthWestCorridor:
        'https://vignette3.wikia.nocookie.net/residentevil/images/f/fa/R112_00033.jpg/revision/latest?cb=20150609095024',
    westWingNorthEastCorridor:
        'https://vignette3.wikia.nocookie.net/residentevil/images/e/e5/R101_00005.jpg/revision/latest?cb=20150619085120',
    clinic: 'https://vignette3.wikia.nocookie.net/residentevil/images/f/fa/R100_00001.jpg/revision/latest?cb=20150610114857',
    westWingStoreroom:
        'https://vignette1.wikia.nocookie.net/residentevil/images/0/0b/R102_00003.jpg/revision/latest?cb=20150622022917',
    westWingNorthCorridor:
        'https://vignette1.wikia.nocookie.net/residentevil/images/4/4d/R103_00040.jpg/revision/latest?cb=20150624051255',
    tigerStatueRoom:
        'https://vignette2.wikia.nocookie.net/residentevil/images/9/98/Tiger_statue_room_remastered.png/revision/latest?cb=20150128113249',
    greenhouse:
        'https://vignette3.wikia.nocookie.net/residentevil/images/b/b3/2002_Greenhouse_-_background_3.jpg/revision/latest?cb=20140813010246',
    exhibitionRoomF1:
        'https://vignette2.wikia.nocookie.net/residentevil/images/b/be/RE4P08_3c5736de_6.png/revision/latest?cb=20120321102250',
    drawingRoom:
        'https://vignette3.wikia.nocookie.net/residentevil/images/e/e7/R111_00001.jpg/revision/latest?cb=20150610004933',
    hiddenPassage:
        'https://vignette3.wikia.nocookie.net/residentevil/images/d/d0/Trevor_grave_%282%29.jpg/revision/latest?cb=20141002111334',
    mirrorRoom:
        'https://vignette2.wikia.nocookie.net/residentevil/images/c/cd/R111_00007.jpg/revision/latest?cb=20150625062710',
    eastWingEastCorridor:
        'https://vignette1.wikia.nocookie.net/residentevil/images/1/13/R108_00005.jpg/revision/latest?cb=20150616145147',
    eastWingNorthEastCorridor:
        'https://vignette2.wikia.nocookie.net/residentevil/images/0/09/R109_00011.jpg/revision/latest?cb=20150622053120',
    bathroom:
        'https://vignette2.wikia.nocookie.net/residentevil/images/5/5e/R109_00024.jpg/revision/latest?cb=20150613125908',
    outdoorBoiler:
        'https://vignette2.wikia.nocookie.net/residentevil/images/1/13/R114_00031.jpg/revision/latest?cb=20150614110037',
    suspendedCeilingRoom:
        'https://vignette1.wikia.nocookie.net/residentevil/images/6/61/2002_Suspended_ceiling_room_1.jpg/revision/latest?cb=20140813000618',
    parlour:
        'https://vignette2.wikia.nocookie.net/residentevil/images/e/e3/R116_00001.jpg/revision/latest?cb=20150620054826',
    gallery:
        'https://vignette3.wikia.nocookie.net/residentevil/images/6/65/R117_00006.jpg/revision/latest?cb=20150620062737',
    eastWingNorthWestCorridor:
        'https://vignette1.wikia.nocookie.net/residentevil/images/0/0f/R10a_00002.jpg/revision/latest?cb=20150623025049',
    study: 'src/img/study-mansionF1.png',
    eastWingNorthCorridorF1:
        'https://vignette2.wikia.nocookie.net/residentevil/images/c/c6/2F_East_Stairway.jpg/revision/latest?cb=20100806075953',
    eastWingStoreroom:
        'https://vignette1.wikia.nocookie.net/residentevil/images/c/c2/RE4P08_480f4925_6.png/revision/latest?cb=20120322111438',
    outdoorCorridor:
        'https://vignette1.wikia.nocookie.net/residentevil/images/d/d8/R11a_00064.jpg/revision/latest?cb=20150627152027',
    shed: 'https://vignette2.wikia.nocookie.net/residentevil/images/4/45/R11b_00001.jpg/revision/latest?cb=20150628002613',
    cemetery:
        'https://vignette1.wikia.nocookie.net/residentevil/images/8/87/R10b_00033.jpg/revision/latest?cb=20150610124030',
} as const;

export const roomData: ReadonlyArray<RoomData> = [
    {
        id: 'mainHallF1',
        name: 'Main Hall F1',
        mapId: 'mansionF1',
        roomNumber: 1,
        thumbnailSrc: thumbnailPaths.mainHallF1,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: "Wonder what's on the other side of this door...",
            quote: {
                text: "It's a lock pick. You'd make better use of it.",
                cite: 'Barry Burton',
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'mainHallF2',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'exhibitionRoomF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'drawingRoom',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Helmet Key',
                },
            },
            {
                id: 'diningRoomF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'stairwayPassage',
                accessControl: {
                    accessType: 'puzzle',
                    accessKey: 'Puzzle Key',
                },
            },
        ],
        detailList: {
            persons: ['personOfInterest-mainHallF1'],
            interactables: [],
            biohazards: ['cerberus-mainHallF1'],
            items: ['ammunition-mainHallF1', 'doorKey-mainHallF1', 'weapon-mainHallF1'],
        },
    },
    {
        id: 'diningRoomF1',
        name: 'Dining Room F1',
        mapId: 'mansionF1',
        roomNumber: 2,
        thumbnailSrc: thumbnailPaths.diningRoomF1,
        overview: {
            functions: ['puzzleRoom'],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: "The only movement is the silent flicker of the candle's flame.",
            quote: {
                text: "...Blood... Let's just hope it's not Chris'.",
                cite: 'Barry Burton',
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'mainHallF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'teaRoomCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: ['personOfInterest-diningRoomF1'],
            interactables: ['typewriter-diningRoomF1'],
            biohazards: [],
            items: [
                'itemOfInterest1-diningRoomF1',
                'itemOfInterest2-diningRoomF1',
                'doorKey-diningRoomF1',
                'inkRibbon-diningRoomF1',
            ],
        },
    },
    {
        id: 'teaRoomCorridor',
        name: 'Tea Room Corridor',
        mapId: 'mansionF1',
        roomNumber: 3,
        thumbnailSrc: thumbnailPaths.teaRoomCorridor,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'An eerie picture of the mansion decorates the wall.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'westWingNorthCorridor',
                accessControl: {
                    accessType: 'oneWay',
                    accessKey: 'None',
                },
            },
            {
                id: 'diningRoomF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'bar',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Armor Key',
                },
            },
            {
                id: 'kitchen',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Sword Key',
                },
            },
            {
                id: 'westWingNorthWestCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: ['personOfInterest-teaRoomCorridor'],
            interactables: [],
            biohazards: [
                'hunter-teaRoomCorridor',
                'zombie1-teaRoomCorridor',
                'zombie2-teaRoomCorridor',
            ],
            items: ['itemOfInterest-teaRoomCorridor'],
        },
    },
    {
        id: 'bar',
        name: 'Bar',
        mapId: 'mansionF1',
        roomNumber: 4,
        thumbnailSrc: thumbnailPaths.bar,
        overview: {
            functions: ['puzzleRoom'],
            accessControl: {
                accessType: 'key',
                accessKey: 'Armor Key',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'Commemorating the completion of the mansion...',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'teaRoomCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: ['personOfInterest-bar'],
            interactables: [],
            biohazards: [],
            items: ['itemOfInterest1-bar', 'itemOfInterest2-bar', 'document-bar', 'inkRibbon-bar'],
        },
    },
    {
        id: 'keepersRoom',
        name: "Keeper's Room",
        mapId: 'mansionF1',
        roomNumber: 5,
        thumbnailSrc: thumbnailPaths.keepersRoom,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'The shelf is full of high-proof liquor.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'westWingNorthCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['zombie1-keepersRoom', 'zombie2-keepersRoom'],
            items: [
                'selfDefenseJV-keepersRoom',
                'selfDefenseCR-keepersRoom',
                'document-keepersRoom',
                'ammunition-keepersRoom',
            ],
        },
    },
    {
        id: 'westWingNorthWestCorridor',
        name: 'West Wing North West Corridor',
        mapId: 'mansionF1',
        roomNumber: 6,
        thumbnailSrc: thumbnailPaths.westWingNorthWestCorridor,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: "A large bird cage. There's a dead raven inside.",
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'teaRoomCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'westWingNorthWestCorridor2F',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['crow-westWingNorthWestCorridor'],
            items: [
                'greenHerb1-westWingNorthWestCorridor',
                'greenHerb2-westWingNorthWestCorridor',
                'ammunition-westWingNorthWestCorridor',
            ],
        },
    },
    {
        id: 'westWingNorthEastCorridor',
        name: 'West Wing North East Corridor',
        mapId: 'mansionF1',
        roomNumber: 7,
        thumbnailSrc: thumbnailPaths.westWingNorthEastCorridor,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'A painting of the mansion, illuminated by a bolt of lightning.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'westWingNorthCorridor',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Armor Key',
                },
            },
            {
                id: 'westWingNorthEastCorridor2F',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'clinic',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'westWingStoreroom',
                accessControl: {
                    accessType: 'key',
                    accessKey: [
                        {
                            character: 'JV',
                            key: 'Lockpick',
                        },
                        {
                            character: 'CR',
                            key: 'Old Key',
                        },
                    ],
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [
                'hunter1-westWingNorthEastCorridor',
                'hunter2-westWingNorthEastCorridor',
                'zombie1-westWingNorthEastCorridor',
                'zombie2-westWingNorthEastCorridor',
                'zombie3-westWingNorthEastCorridor',
            ],
            items: [],
        },
    },
    {
        id: 'clinic',
        name: 'Clinic',
        mapId: 'mansionF1',
        roomNumber: 8,
        thumbnailSrc: thumbnailPaths.clinic,
        overview: {
            functions: ['safeRoom'],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'A well-used bed.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'westWingNorthEastCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: ['personOfInterest1-clinic', 'personOfInterest2-clinic'],
            interactables: ['typewriter-clinic', 'itemBox-clinic'],
            biohazards: [],
            items: ['document-clinic', 'itemOfInterest-clinic'],
        },
    },
    {
        id: 'westWingStoreroom',
        name: 'West Wing Storeroom',
        mapId: 'mansionF1',
        roomNumber: 9,
        thumbnailSrc: thumbnailPaths.westWingStoreroom,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'key',
                accessKey: [
                    {
                        character: 'JV',
                        key: 'Lockpick',
                    },
                    {
                        character: 'CR',
                        key: 'Old Key',
                    },
                ],
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'Just some old furniture.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'westWingNorthEastCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: ['kerosene-westWingStoreroom'],
            biohazards: [],
            items: [
                'inkRibbon-westWingStoreroom',
                'itemOfInterest-westWingStoreroom',
                'selfDefenseJV-westWingStoreroom',
                'selfDefenseCR-westWingStoreroom',
            ],
        },
    },
    {
        id: 'westWingNorthCorridor',
        name: 'West Wing North Corridor',
        mapId: 'mansionF1',
        roomNumber: 10,
        thumbnailSrc: thumbnailPaths.westWingNorthCorridor,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'key',
                accessKey: 'Armor Key',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'The candlestick shines coldly in the moonlight.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'westWingNorthEastCorridor',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Armor Key',
                },
            },
            {
                id: 'teaRoomCorridor',
                accessControl: {
                    accessType: 'oneWay',
                    accessKey: 'None',
                },
            },
            {
                id: 'keepersRoom',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'greenhouse',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'tigerStatueRoom',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [
                'hunter-westWingNorthCorridor',
                'zombie1-westWingNorthCorridor',
                'zombie2-westWingNorthCorridor',
            ],
            items: [
                'selfDefenseJV-westWingNorthCorridor',
                'selfDefenseCR-westWingNorthCorridor',
                'selfDefense-westWingNorthCorridor',
            ],
        },
    },
    {
        id: 'tigerStatueRoom',
        name: 'Tiger Statue Room',
        mapId: 'mansionF1',
        roomNumber: 11,
        thumbnailSrc: thumbnailPaths.tigerStatueRoom,
        overview: {
            functions: ['puzzleRoom'],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'A tiger glowing with blue and yellow light.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'westWingNorthCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['adder-tigerStatueRoom'],
            items: [
                'itemOfInterest1-tigerStatueRoom',
                'itemOfInterest2-tigerStatueRoom',
                'ammunition-tigerStatueRoom',
            ],
        },
    },
    {
        id: 'greenhouse',
        name: 'Greenhouse',
        mapId: 'mansionF1',
        roomNumber: 12,
        thumbnailSrc: thumbnailPaths.greenhouse,
        overview: {
            functions: ['puzzleRoom'],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'The lid on this water pump is open.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'westWingNorthCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['fountainPlant-greenhouse'],
            items: [
                'itemOfInterest-greenhouse',
                'greenHerb1-greenhouse',
                'greenHerb2-greenhouse',
                'greenHerb3-greenhouse',
                'greenHerb4-greenhouse',
                'greenHerb5-greenhouse',
            ],
        },
    },
    {
        id: 'exhibitionRoomF1',
        name: 'Exhibition Room F1',
        mapId: 'mansionF1',
        roomNumber: 13,
        thumbnailSrc: thumbnailPaths.exhibitionRoomF1,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'Woman Drawing Water.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'mainHallF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'hiddenCloset',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Closet Key',
                },
            },
            {
                id: 'eastWingEastCorridor',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Sword Key',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['zombie-exhibitionRoomF1'],
            items: ['selfDefense-exhibitionRoomF1', 'map-exhibitionRoomF1'],
        },
    },
    {
        id: 'drawingRoom',
        name: 'Drawing Room',
        mapId: 'mansionF1',
        roomNumber: 14,
        thumbnailSrc: thumbnailPaths.drawingRoom,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'key',
                accessKey: 'Helmet Key',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: "There's some kind of internal organ inside...",
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'mainHallF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'mirrorRoom',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [],
            items: ['document-drawingRoom', 'inkRibbon-drawingRoom'],
        },
    },
    {
        id: 'hiddenPassage',
        name: 'Hidden Passage',
        mapId: 'mansionF1',
        roomNumber: 15,
        thumbnailSrc: thumbnailPaths.hiddenPassage,
        overview: {
            functions: ['hiddenRoom'],
            accessControl: {
                accessType: 'puzzle',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'A name is carved into the small gravestone...',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastBasementPassage',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'exhibitionRoomF2',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Helmet Key',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [],
            items: [
                'document-hiddenPassage',
                'itemOfInterest1-hiddenPassage',
                'itemOfInterest2-hiddenPassage',
            ],
        },
    },
    {
        id: 'hiddenCloset',
        name: 'Hidden Closet',
        mapId: 'mansionF1',
        roomNumber: 16,
        thumbnailSrc: thumbnailPaths.unknown,
        overview: {
            functions: ['hiddenRoom'],
            accessControl: {
                accessType: 'key',
                accessKey: 'Closet Key',
            },
            risk: [
                {
                    threatLevel: 'unknown',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'Would you like to change?',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: 'Despite intelligence and building plans indicating the existence of this room, inside sources have been unable to confirm.',
                cite: 'Intelligence Report 42A',
            },
        },
        adjoiningRooms: [
            {
                id: 'exhibitionRoomF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [],
            items: [],
        },
    },
    {
        id: 'mirrorRoom',
        name: 'Mirror Room',
        mapId: 'mansionF1',
        roomNumber: 17,
        thumbnailSrc: thumbnailPaths.mirrorRoom,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'It\'s locked. The door says "Closet".',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'drawingRoom',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['zombie-mirrorRoom', 'hunter-mirrorRoom'],
            items: [
                'selfDefense-mirrorRoom',
                'itemOfInterest1-mirrorRoom',
                'itemOfInterest2-mirrorRoom',
                'doorKey-mirrorRoom',
                'greenHerb-mirrorRoom',
                'blueHerb-mirrorRoom',
            ],
        },
    },
    {
        id: 'eastWingEastCorridor',
        name: 'East Wing East Corridor',
        mapId: 'mansionF1',
        roomNumber: 18,
        thumbnailSrc: thumbnailPaths.eastWingEastCorridor,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'key',
                accessKey: 'Sword Key',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'A picture of the mansion suspended in darkness.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'exhibitionRoomF1',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Sword Key',
                },
            },
            {
                id: 'eastWingNorthEastCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['cerberus1-eastWingEastCorridor', 'cerberus2-eastWingEastCorridor'],
            items: ['selfDefense-eastWingEastCorridor', 'ammunition-eastWingEastCorridor'],
        },
    },
    {
        id: 'eastWingNorthEastCorridor',
        name: 'East Wing North East Corridor',
        mapId: 'mansionF1',
        roomNumber: 19,
        thumbnailSrc: thumbnailPaths.eastWingNorthEastCorridor,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'A picture of the mansion against the setting sun.',
            quote: {
                text: "A second late, you would've fit nicely into a sandwich.",
                cite: 'Barry Burton',
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'bathroom',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'outdoorBoiler',
                accessControl: {
                    accessType: 'key',
                    accessKey: [
                        {
                            character: 'JV',
                            key: 'Lockpick',
                        },
                        {
                            character: 'CR',
                            key: 'Old Key',
                        },
                    ],
                },
            },
            {
                id: 'eastWingEastCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'eastWingNorthWestCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: ['personOfInterest-eastWingNorthEastCorridor'],
            interactables: [],
            biohazards: [
                'zombie1-eastWingNorthEastCorridor',
                'zombie2-eastWingNorthEastCorridor',
                'zombie3-eastWingNorthEastCorridor',
                'zombie4-eastWingNorthEastCorridor',
                'zombie5-eastWingNorthEastCorridor',
                'hunter1-eastWingNorthEastCorridor',
                'hunter2-eastWingNorthEastCorridor',
            ],
            items: [],
        },
    },
    {
        id: 'bathroom',
        name: 'Bathroom',
        mapId: 'mansionF1',
        roomNumber: 19,
        thumbnailSrc: thumbnailPaths.bathroom,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: "It doesn't look like it's been serviced in a while.",
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthEastCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['zombie-bathroom'],
            items: ['selfDefense-bathroom', 'doorKey-bathroom'],
        },
    },
    {
        id: 'outdoorBoiler',
        name: 'Outdoor Boiler',
        mapId: 'mansionF1',
        roomNumber: 21,
        thumbnailSrc: thumbnailPaths.outdoorBoiler,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'key',
                accessKey: [
                    {
                        character: 'JV',
                        key: 'Lockpick',
                    },
                    {
                        character: 'CR',
                        key: 'Old Key',
                    },
                ],
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'A boiler. The humidity has caused it to rust.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthEastCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: ['kerosene-outdoorBoiler'],
            biohazards: ['cerberus1-outdoorBoiler', 'cerberus2-outdoorBoiler'],
            items: [
                'greenHerb1-outdoorBoiler',
                'greenHerb2-outdoorBoiler',
                'redHerb1-outdoorBoiler',
                'redHerb2-outdoorBoiler',
                'redHerb3-outdoorBoiler',
                'itemOfInterest-outdoorBoiler',
            ],
        },
    },
    {
        id: 'suspendedCeilingRoom',
        name: 'Suspended Ceiling Room',
        mapId: 'mansionF1',
        roomNumber: 22,
        thumbnailSrc: thumbnailPaths.suspendedCeilingRoom,
        overview: {
            functions: ['trapRoom'],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'severe-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: "The door won't open!",
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthEastCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'parlour',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [],
            items: [],
        },
    },
    {
        id: 'parlour',
        name: 'Parlour',
        mapId: 'mansionF1',
        roomNumber: 23,
        thumbnailSrc: thumbnailPaths.parlour,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'An acrid smell permeates the air.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'suspendedCeilingRoom',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [],
            items: ['selfDefense-parlour', 'inkRibbon-parlour', 'weapon-parlour'],
        },
    },
    {
        id: 'gallery',
        name: 'Gallery',
        mapId: 'mansionF1',
        roomNumber: 24,
        thumbnailSrc: thumbnailPaths.gallery,
        overview: {
            functions: ['puzzleRoom'],
            accessControl: {
                accessType: 'key',
                accessKey: 'Armor Key',
            },
            risk: [
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'Bring the light of truth to the three spirits.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthWestCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'cemetery',
                accessControl: {
                    accessType: 'oneWay',
                    accessKey: [
                        {
                            character: 'JV',
                            key: 'Lockpick',
                        },
                        {
                            character: 'CR',
                            key: 'Old Key',
                        },
                    ],
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['crow-gallery'],
            items: ['itemOfInterest-gallery'],
        },
    },
    {
        id: 'eastWingNorthWestCorridor',
        name: 'East Wing North West Corridor',
        mapId: 'mansionF1',
        roomNumber: 25,
        thumbnailSrc: thumbnailPaths.eastWingNorthWestCorridor,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'The Spencer family emblem is carved into the doorknob.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthEastCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'gallery',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Armor Key',
                },
            },
            {
                id: 'study',
                accessControl: {
                    accessType: 'key',
                    accessKey: 'Emblem Key',
                },
            },
            {
                id: 'eastWingNorthCorridorF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'outdoorCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [
                'zombie1-eastWingNorthWestCorridor',
                'zombie2-eastWingNorthWestCorridor',
                'hunter-eastWingNorthWestCorridor',
            ],
            items: [],
        },
    },
    {
        id: 'study',
        name: 'Study',
        mapId: 'mansionF1',
        roomNumber: 26,
        thumbnailSrc: thumbnailPaths.study,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'key',
                accessKey: 'Emblem Key',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'I can only see moonlight and dense forest.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthWestCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [],
            items: [
                'itemOfInterest-study',
                'selfDefense1-study',
                'selfDefense2-study',
                'ammunition-study',
            ],
        },
    },
    {
        id: 'eastWingNorthCorridorF1',
        name: 'East Wing North Corridor F1',
        mapId: 'mansionF1',
        roomNumber: 27,
        thumbnailSrc: thumbnailPaths.eastWingNorthCorridorF1,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText:
                'The wall is lined with portraits. All of the faces have been painted out.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthCorridorF2',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'eastWingStoreroom',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'eastWingNorthWestCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [
                'zombie1-eastWingNorthCorridorF1',
                'zombie2-eastWingNorthCorridorF1',
                'zombie3-eastWingNorthCorridorF1',
                'hunter1-eastWingNorthCorridorF1',
                'hunter2-eastWingNorthCorridorF1',
            ],
            items: ['greenHerb-eastWingNorthCorridorF1'],
        },
    },
    {
        id: 'eastWingStoreroom',
        name: 'East Wing Storeroom',
        mapId: 'mansionF1',
        roomNumber: 28,
        thumbnailSrc: thumbnailPaths.eastWingStoreroom,
        overview: {
            functions: ['safeRoom'],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'The warm light makes you relax.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthCorridorF1',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [],
            items: [
                'typewriter-eastWingStoreroom',
                'itemBox-eastWingStoreroom',
                'kerosene-eastWingStoreroom',
                'itemOfInterest-eastWingStoreroom',
                'document-eastWingStoreroom',
                'doorKey-eastWingStoreroom',
                'firstAidSpray1-eastWingStoreroom',
                'firstAidSpray2-eastWingStoreroom',
                'ammunition1-eastWingStoreroom',
                'ammunition2-eastWingStoreroom',
                'ammunition3-eastWingStoreroom',
                'ammunition4-eastWingStoreroom',
                'ammunition5-eastWingStoreroom',
            ],
        },
    },
    {
        id: 'outdoorCorridor',
        name: 'Outdoor Corridor',
        mapId: 'mansionF1',
        roomNumber: 29,
        thumbnailSrc: thumbnailPaths.outdoorCorridor,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'moderate-high-risk',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'The defiler of the accursed coffin.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'eastWingNorthWestCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'shed',
                accessControl: {
                    accessType: 'puzzle',
                    accessKey: 'Puzzle Key',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['cerberus-outdoorCorridor'],
            items: ['itemOfInterest-outdoorCorridor'],
        },
    },
    {
        id: 'shed',
        name: 'Shed',
        mapId: 'mansionF1',
        roomNumber: 30,
        thumbnailSrc: thumbnailPaths.shed,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'puzzle',
                accessKey: 'Puzzle Key',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: 'A selection of gardening supplies.',
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'outdoorCorridor',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'gardenGazebo',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'cemeteryPath',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: [],
            items: [
                'ammunition1-shed',
                'firstAidSpray1-shed',
                'selfDefenseJV1-shed',
                'selfDefenseCR1-shed',
                'ammunition2-shed',
                'ammunition3-shed',
                'ammunition4-shed',
                'firstAidSpray2-shed',
                'firstAidSpray3-shed',
                'selfDefenseJV2-shed',
                'selfDefenseCR2-shed',
                'selfDefense-shed',
            ],
        },
    },
    {
        id: 'cemetery',
        name: 'Cemetery',
        mapId: 'mansionF1',
        roomNumber: 31,
        thumbnailSrc: thumbnailPaths.cemetery,
        overview: {
            functions: [],
            accessControl: {
                accessType: 'none',
                accessKey: 'None',
            },
            risk: [
                {
                    threatLevel: 'clear',
                    difficultyLevel: [
                        'JV-lvl-very-easy',
                        'JV-lvl-easy',
                        'CR-lvl-very-easy',
                        'CR-lvl-easy',
                    ],
                },
                {
                    threatLevel: 'low-moderate-risk',
                    difficultyLevel: [
                        'JV-lvl-normal',
                        'JV-lvl-hard',
                        'CR-lvl-normal',
                        'CR-lvl-hard',
                    ],
                },
            ],
        },
        intel: {
            examineText: "A crumbling tombstone. There's no name or inscription.",
            quote: {
                text: null,
                cite: null,
            },
            info: {
                text: null,
                cite: null,
            },
        },
        adjoiningRooms: [
            {
                id: 'mainHallF2',
                accessControl: {
                    accessType: 'none',
                    accessKey: 'None',
                },
            },
            {
                id: 'gallery',
                accessControl: {
                    accessType: 'blocked',
                    accessKey: 'None',
                },
            },
            {
                id: 'crypt',
                accessControl: {
                    accessType: 'puzzle',
                    accessKey: 'Puzzle Key',
                },
            },
        ],
        detailList: {
            persons: [],
            interactables: [],
            biohazards: ['zombie1-cemetery', 'zombie2-cemetery'],
            items: ['ammunition-cemetery'],
        },
    },
] as const;

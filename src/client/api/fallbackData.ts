import { RoomDetailsData } from 'src/data';

export const blankRoomData: RoomDetailsData = {
    id: 'unknown',
    name: 'Unknown',
    mapId: 'unknown',
    roomNumber: null,
    thumbnailSrc: null,
    overview: {
        functions: [],
        accessControl: {
            accessType: 'none',
            accessKey: 'None',
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
        examineText: null,
        quote: {
            text: null,
            cite: null,
        },
        info: {
            text: null,
            cite: null,
        },
    },
    adjoiningRooms: [],
    detailList: {
        persons: [],
        interactables: [],
        biohazards: [],
        items: [],
    },
    roomDetails: {
        persons: [],
        interactables: [],
        biohazards: [],
        items: [],
    },
};

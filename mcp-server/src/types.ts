/**
 * Type definitions matching the Express API OpenAPI schema
 */

// Difficulty levels
export type DifficultyLevel =
    | 'JV-lvl-very-easy'
    | 'JV-lvl-easy'
    | 'JV-lvl-normal'
    | 'JV-lvl-hard'
    | 'CR-lvl-very-easy'
    | 'CR-lvl-easy'
    | 'CR-lvl-normal'
    | 'CR-lvl-hard';

// Item types (PascalCase - must match API exactly)
export type ItemType =
    // Featured Items
    | 'Typewriter'
    | 'ItemBox'
    | 'Kerosene'
    | 'Map'
    // General Items
    | 'PersonOfInterest'
    | 'DoorKey'
    | 'InkRibbon'
    | 'ItemOfInterest'
    | 'Document'
    | 'GreenHerb'
    | 'RedHerb'
    | 'BlueHerb'
    | 'FirstAid'
    | 'MixedHerbs'
    | 'SelfDefense'
    | 'Ammunition'
    | 'Weapon';

// Biohazard codes (S.T.A.R.S. lookup codes - must match API exactly)
export type BiohazardCode =
    | 'Ad' // Adder
    | 'Cr' // Crow
    | 'Fp' // Fountain Plant
    | 'Zb' // Zombie
    | 'Wp' // Wasp
    | 'Cb' // Cerberus
    | 'Fs' // Forest Speyer
    | 'Ch' // Crimson Head
    | 'Cp' // Crimson Head Prototype 1
    | 'Ht' // Hunter
    | 'Cm' // Chimera
    | 'Ws' // Web Spinner
    | 'Bt' // Black Tiger
    | 'Pl' // Plant 42
    | 'Nt' // Neptune
    | 'Yn' // Yawn
    | 'Ty' // Tyrant
    | 'Lt'; // Lisa Trevor

// S.T.A.R.S. Classification (Greek letters)
export type STARSClassification = 'Alpha' | 'Beta' | 'Gamma' | 'Delta' | 'Epsilon' | 'Zeta' | 'Eta';

// S.T.A.R.S. Ranking
export type STARSRanking = '3' | '2Half' | '2' | '1Half' | '1' | '0Half' | '0';

// API Response types
export interface ItemsResponse {
    foundItems: Item[];
    unrecognizedIds: string[];
}

export interface BiohazardsResponse {
    foundBiohazards: Biohazard[];
    unrecognizedIds: string[];
}

export interface RoomsResponse {
    foundRooms: Room[];
    unrecognizedIds: string[];
}

export interface AreasResponse {
    foundAreas: Area[];
    unrecognizedIds: string[];
}

export interface MapsResponse {
    foundMaps: Map[];
    unrecognizedIds: string[];
}

export interface STARSResponse {
    foundRankings: STARSRankingData[];
    unrecognizedCodes: string[];
}

// Data models (matching OpenAPI spec)
export interface Item {
    id: string;
    itemId: string;
    name: string;
    type: ItemType;
    qty: number;
    qtyItems?: number | null;
    uses?: any | null;
    map?: {
        roomId: string;
        mapId: string;
    };
    difficultyLevel?: string[];
    isFeatured?: boolean;
    requirement?: string;
}

export interface Biohazard {
    id: string;
    name: string;
    code: BiohazardCode;
    qty: number;
    map?: {
        roomId: string;
        mapId: string;
    };
    difficultyLevel?: string[];
    ambush?: boolean;
    starsRanking?: {
        starsClassification: STARSClassification;
        ranking: STARSRanking;
        threatLevel: string;
        directive: string;
    };
}

export interface Room {
    id: string;
    name: string;
    mapId: string;
    roomNumber?: number;
    thumbnailSrc?: string;
    overview: {
        functions: string[];
        accessControl: {
            accessType: string;
            accessKey: string;
        };
        risk: Array<{
            threatLevel: string;
            difficultyLevel: DifficultyLevel[];
        }>;
    };
    detailList?: {
        items: any[];
        biohazards: any[];
    };
    adjoiningRooms: string[];
}

export interface Area {
    id: string;
    area: string;
    mapIds: string[];
}

export interface Map {
    id: string;
    map: string;
    areaId: string;
    roomIds: string[];
}

export interface STARSRankingData {
    code: BiohazardCode;
    starsRanking: {
        starsClassification: STARSClassification;
        greeksClassification?: string;
        ranking: STARSRanking;
        threatLevel: string;
        directive: string;
    };
}

// Error response
export interface ApiError {
    error: string;
    message: string;
    statusCode: number;
}

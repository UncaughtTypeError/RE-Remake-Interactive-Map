import {
    RoomDetailsData,
    QtyItems,
    ItemData,
    ItemRoomData,
    BiohazardData,
    BiohazardDetailsData,
    STARSRankingData,
} from 'src/data';

export interface RoomResponse {
    foundRooms: RoomDetailsData[];
    unrecognizedIds: string[];
}

export interface ItemsDataResponse {
    items: ItemData[];
}

export interface ItemsRoomDataResponse {
    foundItems: ItemRoomData[];
    unrecognizedIds: string[];
}

export interface BiohazardsDataResponse {
    biohazards: BiohazardData[];
}

export interface BiohazardsRoomDataResponse {
    foundBiohazards: BiohazardDetailsData[];
    unrecognizedIds: string[];
}

export interface STARSRankingsResponse {
    rankings: STARSRankingData[];
}

export interface ItemGroup {
    count: number;
    items: {
        id: string;
        name: string;
        qty: number;
        qtyItems: QtyItems[] | number | null;
        uses: number | null;
    }[];
}

export interface BiohazardGroup {
    qty: number;
    isAmbush: boolean;
}

import { RoomDetailsData, QtyItems } from 'src/data';

export interface RoomResponse {
    foundRooms: RoomDetailsData[];
    unrecognizedIds: string[];
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

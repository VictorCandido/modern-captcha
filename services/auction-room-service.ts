import { db } from "@/lib/db";

export async function listAuctionRooms() {
    try {
        const auctionRooms = await db.auctionRoom.findMany();
        return auctionRooms;
    } catch (error) {
        console.log('Falha ao listar auctionRooms -', error);
        throw error;
    }
}


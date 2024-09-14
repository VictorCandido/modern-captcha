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

export async function createAuctionRoom(nome: string) {
    try {
        const auctionRoom = await db.auctionRoom.create({ data: { nome } });
        return auctionRoom;
    } catch (error) {
        console.log('Falha ao criar auctionRooms -', error);
        throw error;
    }
}
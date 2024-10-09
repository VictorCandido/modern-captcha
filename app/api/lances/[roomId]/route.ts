import { listBidsFromAuctionRoom } from "@/lib/bidding-setup";
import { currentProfile } from "@/lib/current-profile";
import { deleteAuctionRoom } from "@/services/auction-room-service";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { roomId: string } }) {
    console.log('GET /api/bid/[roomId]');

    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.roomId) {
        return new NextResponse('Room ID missing', { status: 400 });
    }

    try {
        const bids = await listBidsFromAuctionRoom(params.roomId);

        const randomTime = getRandomTime();
        await new Promise(resolve => setTimeout(resolve, randomTime));

        return NextResponse.json(bids);

    } catch (error) {
        console.log('Falha ao listar lances -', error);
        return new NextResponse('Internal Error', { status: 500 });
    }

}

export async function DELETE(req: Request, { params }: { params: { roomId: string } }) {
    console.log('DELETE /api/bid/[roomId]');

    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.roomId) {
        return new NextResponse('Room ID missing', { status: 400 });
    }

    try {
        const bids = await deleteAuctionRoom(params.roomId);
        return NextResponse.json(bids);

    } catch (error) {
        console.log('Falha ao apagar lances -', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

function getRandomTime() {
    return Math.floor(Math.random() * (500 - 200 + 1) + 200);
}
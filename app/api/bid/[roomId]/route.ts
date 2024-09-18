import { listBidsFromAuctionRoom } from "@/lib/bidding-setup";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { roomId: string } }) {
    const profile = await currentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.roomId) {
        return new NextResponse('Room ID missing', { status: 400 });
    }

    try {
        const bids = await listBidsFromAuctionRoom(params.roomId);
        return NextResponse.json(bids);

    } catch (error) {
        console.log('Falha ao listar lances -', error);
        return new NextResponse('Internal Error', { status: 500 });
    }


}
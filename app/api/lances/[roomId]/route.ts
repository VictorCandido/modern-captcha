import { listBidsFromAuctionRoom } from "@/lib/bidding-setup";
import { currentProfile } from "@/lib/current-profile";
import { NextApiResponseServerIo } from "@/types";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next/types";

export async function GET(req: Request, { params }: { params: { roomId: string } }) {
    console.log('GET /api/bid/[roomId]');

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

// export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
//     if (req.method !== 'GET') {
//         return res.status(405).json({ error: 'Method not allowed' });
//     }

//     try {
//         const { roomId } = req.query;

//         const user = await currentProfile();

//         if (!user) return res.status(401).json({ message: 'Unauthorized' });

//         if (!roomId) {
//             return res.status(400).json({ message: 'Room ID missing' });
//         }
//         const bids = await listBidsFromAuctionRoom(String(roomId));
//         return res.status(200).json(bids);

//     } catch (error) {
//         console.log('Falha ao listar lances -', error);
//         return res.status(500).json({ message: 'Internal Error' });
//     }
// }
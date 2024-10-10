import { listBidsFromAuctionRoom, listLasBidFromAuctionRoom } from "@/lib/bidding-setup";
import { currentProfile } from "@/lib/current-profile";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { deleteAuctionRoom } from "@/services/auction-room-service";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export async function GET(req: Request, { params }: { params: { roomId: string } }) {
//     const profile = await currentProfile();

//     if (!profile) return new NextResponse('Unauthorized', { status: 401 });

//     if (!params.roomId) {
//         return new NextResponse('Room ID missing', { status: 400 });
//     }

//     try {
//         const lastBid = await listLasBidFromAuctionRoom(params.roomId);

//         if (!lastBid) return new NextResponse('Last bid not found', { status: 404 });

//         const amount = Number(lastBid.amount);

//         const htmlContent = `
//             <html>
//                 <head></head>
//                 <body>
//                     <div>
//                         <span id="vrMenorLance">R$ ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}</span>
//                     </div>
//                 </body>
//             </html>
//         `

//         const randomTime = getRandomTime();
//         await new Promise(resolve => setTimeout(resolve, randomTime));

//         return NextResponse.(lastBid);

//     } catch (error) {
//         console.log('Falha ao listar lances -', error);
//         return new NextResponse('Internal Error', { status: 500 });
//     }

// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const profile = await currentProfilePages(req);

    if (!profile) return res.status(401).send('Unauthorized');

    const { roomId } = req.query;

    if (!roomId) return res.status(400).send('Room ID missing');

    try {
        const lastBid = await db.bid.findFirst({
            where: {
                auctionRoom: {
                    id: String(roomId),
                    RoomParticipant: {
                        some: {
                            userId: profile.id
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!lastBid) return res.status(404).send('Last bid not found');

        const amount = Number(lastBid.amount);

        const htmlContent = `
            <html>
                <head>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <div>
                        <span id="vrMenorLance">${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}</span>
                    </div>
                </body>
            </html>
        `

        const randomTime = getRandomTime();
        await new Promise(resolve => setTimeout(resolve, randomTime));

        return res.status(200).send(htmlContent);

    } catch (error) {
        console.log('Falha ao listar lances -', error);
        return res.status(500).send('Internal Error');
    }
}

function getRandomTime() {
    return Math.floor(Math.random() * (500 - 200 + 1) + 200);
}


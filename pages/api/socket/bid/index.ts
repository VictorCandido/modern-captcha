// import { currentProfile } from "@/lib/current-profile";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import validateCaptcha from "@/lib/validate-captcha";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     const { roomId, amount, token } = await req.json();

//     try {
//         const user = await currentProfile();

//         if (!user) return new NextResponse('Unauthorized', { status: 401 });

//         const isCaptchaValid = await validateCaptcha(token);

//         if (!isCaptchaValid) return new NextResponse('Error to validate captcha', { status: 400 });

//         const bid = await db.auctionRoom.update({
//             where: {
//                 id: roomId,
//                 RoomParticipant: {
//                     some: {
//                         userId: user.id
//                     }
//                 }
//             },
//             data: {
//                 Bid: {
//                     create: {
//                         userId: user.id,
//                         amount
//                     }
//                 }
//             }
//         });

//         return NextResponse.json(bid);

//     } catch (error) {
//         console.log('Falha ao criar lance -', error);
//         return new NextResponse('Internal Error', { status: 500 });
//     }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    console.log('# POST /api/socket/bid');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { roomId, amount, token } = JSON.parse(req.body);

        const user = await currentProfilePages(req);

        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        const isCaptchaValid = await validateCaptcha(token);

        if (!isCaptchaValid) return res.status(400).json({ message: 'Error to validate captcha' });

        const bid = await db.auctionRoom.update({
            where: {
                id: roomId,
                RoomParticipant: {
                    some: {
                        userId: user.id
                    }
                }
            },
            data: {
                Bid: {
                    create: {
                        userId: user.id,
                        amount
                    }
                }
            }
        });

        res?.socket?.server?.io.emit('receiveUpdateBids');

        return res.status(200).json(bid);

    } catch (error) {
        console.log('Falha ao criar lance -', error);
        return res.status(500).json({ message: 'Internal Error' });
    }
}
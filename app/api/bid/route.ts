import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import validateCaptcha from "@/lib/validate-captcha";
import { NextResponse } from "next/server";

export async function GET() {
    return new NextResponse('Unauthorized', { status: 401 });
}

export async function POST(req: Request) {
    const { roomId, amount, token } = await req.json();

    try {
        const user = await currentProfile();

        if (!user) return new NextResponse('Unauthorized', { status: 401 });

        const isCaptchaValid = await validateCaptcha(token);

        if (!isCaptchaValid) return new NextResponse('Error to validate captcha', { status: 400 });

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

        return NextResponse.json(bid);

    } catch (error) {
        console.log('Falha ao criar lance -', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
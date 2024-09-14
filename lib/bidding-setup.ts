import { currentProfile } from "./current-profile";
import { db } from "./db";

export async function ingressRoomIfNecessary(roomId: string) {
    const user = await currentProfile();

    if (!user) return false;

    const room = await db.auctionRoom.findUnique({
        where: {
            id: roomId,
            RoomParticipant: {
                some: {
                    userId: user.id
                }
            }
        }
    });

    if (room) return true;

    await db.roomParticipant.create({
        data: {
            auctionRoomId: roomId,
            userId: user.id
        }
    });

    if (room) return true;

}
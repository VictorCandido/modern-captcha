'use service'

import { currentProfile } from "./current-profile";
import { db } from "./db";

export async function ingressRoomIfNecessary(roomId: string) {
    const user = await currentProfile();

    if (!user) return;

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

    if (room) return;

    await db.auctionRoom.update({
        where: {
            id: roomId
        },
        data: {
            RoomParticipant: {
                create: {
                    userId: user.id
                }
            }
        }
    });
}

export async function createBid(roomId: string, amount: number) {
    try {
        const user = await currentProfile();

        if (!user) return false;

        await db.auctionRoom.update({
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

    } catch (error) {
        console.log('Falha ao criar lance -', error);
        throw error;
    }
}

export async function listBidsFromAuctionRoom(roomId: string) {
    try {
        const user = await currentProfile();

        if (!user) return false;

        return await db.bid.findMany({
            where: {
                auctionRoom: {
                    id: roomId,
                    RoomParticipant: {
                        some: {
                            userId: user.id
                        }
                    }
                }
            }
        });

        return await db.auctionRoom.findUnique({
            where: {
                id: roomId,
                RoomParticipant: {
                    some: {
                        userId: user.id
                    }
                }
            },
            select: {
                Bid: {
                    select: {
                        amount: true,
                        userId: true
                    }
                }
            }
        });
    } catch (error) {
        console.log('Falha ao buscar lances -', error);
        throw error;
    }
}
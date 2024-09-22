-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_auctionRoomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomParticipant" DROP CONSTRAINT "RoomParticipant_auctionRoomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomParticipant" DROP CONSTRAINT "RoomParticipant_userId_fkey";

-- AddForeignKey
ALTER TABLE "RoomParticipant" ADD CONSTRAINT "RoomParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomParticipant" ADD CONSTRAINT "RoomParticipant_auctionRoomId_fkey" FOREIGN KEY ("auctionRoomId") REFERENCES "AuctionRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionRoomId_fkey" FOREIGN KEY ("auctionRoomId") REFERENCES "AuctionRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

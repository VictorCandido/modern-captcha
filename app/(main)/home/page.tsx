import { listAuctionRooms } from "@/services/auction-room-service";
import NewRoom from "./_components/new-room";
import RoomCard from "./_components/room-card";

export default async function Home() {
    const rooms = await listAuctionRooms();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Salas de Lances</h1>

            <NewRoom />

            <div className="grid gap-4 mt-8">
                {rooms.map((room) => (
                    <RoomCard key={room.id} id={String(room.id)} name={room.nome} />
                ))}
            </div>
        </div>
    )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAuctionRoom } from "@/services/auction-room-service";
import NewRoomInput from "./new-room-input";
import { redirect } from "next/navigation";

const NewRoom = () => {
    async function handleAddRoom(name: string) {
        'use server'
        const newRoom = await createAuctionRoom(name);
        redirect(`/lances/${newRoom.id}`);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar Nova Sala</CardTitle>
            </CardHeader>
            <CardContent>
                <NewRoomInput handleAddRoom={handleAddRoom} />
            </CardContent>
        </Card>
    );
}

export default NewRoom;
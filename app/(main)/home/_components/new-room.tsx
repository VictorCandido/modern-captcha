'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NewRoom = () => {
    const [newRoomName, setNewRoomName] = useState('');

    const handleAddRoom = () => {
        // if (newRoomName) {
        //   const newRoom: Room = {
        //     id: rooms.length + 1,
        //     name: newRoomName,
        //     description: newRoomDescription,
        //   }
        //   setRooms([...rooms, newRoom])
        //   setNewRoomName('')
        //   setNewRoomDescription('')
        // }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar Nova Sala</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4">
                    <Input
                        placeholder="Nome"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                    />

                    <Button onClick={handleAddRoom}>Criar Sala</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default NewRoom;
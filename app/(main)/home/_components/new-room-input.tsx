'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
    handleAddRoom: (nome: string) => void
}
const NewRoomInput = ({ handleAddRoom }: Props) => {
    const [newRoomName, setNewRoomName] = useState('');

    return (
        <div className="flex flex-col space-y-4">
            <Input
                placeholder="Nome"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
            />

            <Button onClick={() => handleAddRoom(newRoomName)}>Criar Sala</Button>
        </div>
    );
}

export default NewRoomInput;
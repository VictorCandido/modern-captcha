'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    name: string;
}
export default function RoomCard({ id, name }: Props) {
    const { push } = useRouter();

    function handleAccessRoom(roomId: string) {
        push(`/lances/${roomId}`);
    }

    return (
        <Card key={id}>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={() => handleAccessRoom(id)}>Acessar</Button>
            </CardContent>
        </Card>
    );
}
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

    function handleAccessRoom(roomId: string, captcha: boolean) {
        const url = `/lances${!captcha ? '-sem-captcha' : ''}/${roomId}`;
        push(url);
    }

    return (
        <Card key={id}>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Button onClick={() => handleAccessRoom(id, true)}>Acessar com Captcha</Button>
                <Button onClick={() => handleAccessRoom(id, false)}>Acessar sem Captcha</Button>
            </CardContent>
        </Card>
    );
}
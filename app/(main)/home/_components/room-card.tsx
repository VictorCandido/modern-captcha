'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
    id: string;
    name: string;
}
export default function RoomCard({ id, name }: Props) {
    const { push, refresh } = useRouter();

    function handleAccessRoom(roomId: string, captcha: boolean) {
        const url = `/lances${!captcha ? '-sem-captcha' : ''}/${roomId}`;
        push(url);
    }

    async function handleDeleteRoom(roomId: string) {
        try {
            const response = await fetch(`/api/lances/${roomId}`, {
                method: 'DELETE'
            });

            if (response.status === 200) {
                refresh();
                return
            }

            throw new Error(await response.text());
        } catch (error) {
            console.error(error);
            toast.error('Ocorreu um erro ao apagar a sala');
        }
    }

    return (
        <Card key={id}>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
                <div className="flex gap-4">
                    <Button onClick={() => handleAccessRoom(id, true)}>Acessar com Captcha</Button>
                    <Button onClick={() => handleAccessRoom(id, false)}>Acessar sem Captcha</Button>
                </div>

                <div>
                    <Button variant="destructive" onClick={() => handleDeleteRoom(id)}>Apagar Sala</Button>
                </div>
            </CardContent>
        </Card>
    );
}
'use client';

import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import Table from './_components/table';
// import { ingressRoomIfNecessary } from '@/lib/bidding-setup';

interface Props {
    params: {
        lanceId: string;
    }
}

export default function BiddingInterface({ params }: Props) {
    // ingressRoomIfNecessary(params.lanceId);

    const [currentBid, setCurrentBid] = useState(1250);
    const [newBid, setNewBid] = useState('');
    const [myBids, setMyBids] = useState<Array<number>>([]);
    const [otherBids] = useState<Array<number>>([1450, 1350, 1250]);

    const handleManualBid = () => {
        if (newBid === '') {
            return
        }

        setMyBids([...myBids, Number(newBid)]);
        setCurrentBid(Number(newBid));
        setNewBid('');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="w-full h-full m-10">
            {params.lanceId}
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-medium">Último Lance</h2>
                            <p className="text-3xl font-bold">
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentBid)}
                            </p>
                        </div>
                        <Button variant="outline" size="icon">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <Label htmlFor="newBid">Novo Lance</Label>

                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                placeholder="Digite seu lance"
                                value={newBid}
                                id='newBid'
                                onChange={(e) => setNewBid(e.target.value)}
                            />

                            <Button
                                id='newBidButton'
                                onClick={handleManualBid}
                            >
                                Enviar Lance
                            </Button>
                        </div>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Table data={myBids} title="Meus Lances" />
                        <Table data={otherBids} title="Outros Lances" />
                    </div>
                </div>
            </div>
        </div>
    )
}
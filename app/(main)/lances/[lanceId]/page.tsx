'use client';

import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CurrencyInput from './_components/currency-input';
import Table from './_components/table';
// import { ingressRoomIfNecessary } from '@/lib/bidding-setup';

interface Props {
    params: {
        lanceId: string;
    }
}

const formSchema = z.object({
    newBid: z.number()
})

export default function BiddingInterface({ params }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newBid: 0,
        }
    });

    // ingressRoomIfNecessary(params.lanceId);

    const [currentBid, setCurrentBid] = useState(1250);
    const [myBids, setMyBids] = useState<Array<number>>([]);
    const [otherBids] = useState<Array<number>>([1450, 1350, 1250]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const { newBid } = values;

        if (newBid === 0) {
            return
        }

        setMyBids([...myBids, Number(newBid)]);
        setCurrentBid(Number(newBid));
        form.setValue('newBid', 0);
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

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-2 flex items-end">
                            <div className='w-full'>
                                <CurrencyInput
                                    form={form}
                                    label="Novo Lance"
                                    name="newBid"
                                    placeholder="Digite seu lance"
                                />
                            </div>

                            <Button
                                type="submit"
                                id='newBidButton'
                            >
                                Enviar Lance
                            </Button>
                        </form>
                    </Form>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Table data={myBids} title="Meus Lances" />
                        <Table data={otherBids} title="Outros Lances" />
                    </div>
                </div>
            </div>
        </div>
    )
}

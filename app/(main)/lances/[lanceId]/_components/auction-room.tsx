/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { z } from 'zod';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Bid } from '@prisma/client';
import CurrencyInput from './currency-input';
import InvisibleReCAPTCHA from './InvisibleReCAPTCHA';
import Table from './table';
import { useUser } from '@clerk/nextjs';

interface Props {
    roomId: string;
}

const formSchema = z.object({
    newBid: z.string()
})

export default function AuctionRoom({ roomId }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newBid: '',
        }
    });

    const [currentBid, setCurrentBid] = useState(0);
    const [myBids, setMyBids] = useState<Array<number>>([]);
    const [otherBids, setOtherBids] = useState<Array<number>>([]);

    const { user } = useUser();


    useEffect(() => {
        updateBids();
    }, []);

    async function updateBids() {
        const bids = await listBidsFromAuctionRoom(roomId);

        const myBidsData = bids ? getBidsFromActiveUser(bids) : [];
        const otherBidsData = bids ? getBidsFromAnotherUser(bids) : [];
        const currentBidData = bids ? getCurrentBid(bids) : 0;

        setCurrentBid(currentBidData);
        setMyBids(myBidsData);
        setOtherBids(otherBidsData);
    }

    async function listBidsFromAuctionRoom(roomId: string) {
        try {
            const response = await fetch(`/api/bid/${roomId}`);

            if (response.status !== 200) {
                throw new Error(await response.text());
            }

            const bids = await response.json();

            return bids;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    function getBidsFromActiveUser(bids: Bid[]) {
        if (!user) return [];

        const myBids = bids.filter((bid) => bid.userId === user.id).map((bid) => Number(bid.amount));
        return myBids;
    }

    function getBidsFromAnotherUser(bids: Bid[]) {
        if (!user) return [];

        const myBids = bids.filter((bid) => bid.userId !== user.id).map((bid) => Number(bid.amount));
        return myBids;
    }

    function getCurrentBid(bids: Bid[]) {
        if (bids.length === 0) return 0;

        const latestBid = bids.reduce((prev, current) => {
            return new Date(current.createdAt) > new Date(prev.createdAt) ? current : prev;
        });

        return Number(latestBid.amount)
    }

    const fromRef = useRef<any>()

    const onSubmit = async (newBid: string, recaptchaToken: string) => {
        try {
            // const { newBid } = values;

            if (newBid === '') {
                return
            }

            if (recaptchaToken === '') {
                return
            }

            await createBid(roomId, Number(unmaskCurrency(newBid)), String(recaptchaToken));

            setMyBids([...myBids, Number(unmaskCurrency(newBid))]);
            setCurrentBid(Number(unmaskCurrency(newBid)));
            form.setValue('newBid', '');
            // setRecaptchaToken('');
        } catch (error) {
            console.log(error);
            toast.error(String(error));
        }
    }

    async function createBid(roomId: string, amount: number, token: string) {
        try {
            const response = await fetch(`/api/bid`, {
                method: 'POST',
                body: JSON.stringify({ roomId, amount, token }),
            });

            if (response.status !== 200) {
                throw new Error(await response.text());
            }

            console.log(JSON.stringify(await response.json(), null, 2));
        } catch (error) {
            throw error;
        }
    }

    function unmaskCurrency(value: string) {
        value = value.replaceAll('R$', '').trim();
        value = value.replaceAll('.', '');
        value = value.replaceAll(',', '.');
        return value;
    }

    const handleRecaptchaResolved = async (token: any) => {
        const { newBid } = form.getValues();
        onSubmit(newBid, token);
    };

    return (
        <div className="w-full h-full m-10">
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-medium">Último Lance</h2>
                            <p className="text-3xl font-bold" id='ultimoLance'>
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentBid)}
                            </p>
                        </div>
                        <Button variant="outline" size="icon" onClick={updateBids}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>

                    <Form {...form}>
                        <form
                            ref={fromRef}
                            // onSubmit={form.handleSubmit(onSubmit)} 
                            onSubmit={(e) => e.preventDefault()}
                            className="space-x-2 flex items-end"
                        >
                            <div className='w-full'>
                                <FormField
                                    control={form.control}
                                    name='newBid'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Novo Lance</FormLabel>
                                            <FormControl>
                                                <CurrencyInput
                                                    field={field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <InvisibleReCAPTCHA onResolved={handleRecaptchaResolved} />
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

import AuctionRoom from './_components/auction-room';
import { ingressRoomIfNecessary } from '@/lib/bidding-setup';

interface Props {
    params: {
        lanceId: string;
    }
}

export default async function BiddingInterface({ params }: Props) {
    await ingressRoomIfNecessary(params.lanceId);

    return (
        <AuctionRoom roomId={params.lanceId} />
    )
}

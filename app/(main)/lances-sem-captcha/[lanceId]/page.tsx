import { ingressRoomIfNecessary } from '@/lib/bidding-setup';
import AuctionRoom from './_components/auction-room';

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

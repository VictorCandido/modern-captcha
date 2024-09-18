import AuctionRoom from './_components/auction-room';
import { ingressRoomIfNecessary, listBidsFromAuctionRoom } from '@/lib/bidding-setup';

interface Props {
    params: {
        lanceId: string;
    }
}

export default async function BiddingInterface({ params }: Props) {
    await ingressRoomIfNecessary(params.lanceId);
    // const bids = await listBidsFromAuctionRoom(params.lanceId);

    // console.log(JSON.stringify(bids, null, 2));

    return (
        <AuctionRoom roomId={params.lanceId} />
    )
}

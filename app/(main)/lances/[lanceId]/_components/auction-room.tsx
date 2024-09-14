// import { Button } from "@/components/ui/button";
// import { RefreshCw } from "lucide-react";

// const AuctionRoomComponent = () => {
//     return (
//         <div className="p-6">
//             <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <h2 className="text-lg font-medium">Último Lance</h2>
//                         <p className="text-3xl font-bold">
//                             {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentBid)}
//                         </p>
//                     </div>
//                     <Button variant="outline" size="icon">
//                         <RefreshCw className="h-4 w-4" />
//                     </Button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-2">
//                     <Label htmlFor="newBid">Novo Lance</Label>

//                     <div className="flex space-x-2">
//                         <Input
//                             type="text"
//                             placeholder="Digite seu lance"
//                             value={newBid}
//                             id='newBid'
//                             onChange={(e) => setNewBid(e.target.value)}
//                         />

//                         <Button
//                             id='newBidButton'
//                             onClick={handleManualBid}
//                         >
//                             Enviar Lance
//                         </Button>
//                     </div>
//                 </form>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <Table data={myBids} title="Meus Lances" />
//                     <Table data={otherBids} title="Outros Lances" />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AuctionRoomComponent;
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    res?.socket?.server?.io.emit('teste', 'aloooo');
    return res.status(200).json({ message: 'sucesso' });
}
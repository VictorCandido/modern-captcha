// server.ts
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import { SocketAddress } from 'net';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('message', (msg) => {
            console.log('message: ' + msg);
            socket.broadcast.emit('message', msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on("sendUpdateBids", () => {
            socket.broadcast.emit('receiveUpdateBids');
        });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});

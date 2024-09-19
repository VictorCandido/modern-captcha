"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { socket as socketInstance } from '@/lib/socket';
import { Socket } from "socket.io-client";

interface socketContextInterface {
    socket: Socket;
    isConnected: boolean;
}

const SocketContext = createContext<socketContextInterface>({
    socket: socketInstance,
    isConnected: false
});


export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState(socketInstance);
    const [isConnected, setIsConnected] = useState(false);


    useEffect(() => {
        if (socketInstance.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socketInstance.on("connect", onConnect);
        socketInstance.on("disconnect", onDisconnect);

        setSocket(socketInstance);

        return () => {
            socketInstance.off("connect", onConnect);
            socketInstance.off("disconnect", onDisconnect);
        };
    }, []);


    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
};




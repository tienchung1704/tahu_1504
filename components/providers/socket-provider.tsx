"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { io as ClientIO } from "socket.io-client"

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
    latency: number | null;

}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
    latency: null

});

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
        const [latency, setLatency] = useState<number | null>(null);

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });
        socketInstance.on("connect", () => {
            setIsConnected(true);
        });
        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });
        setSocket(socketInstance);

        let interval: NodeJS.Timeout;
        interval = setInterval(() => {
            if (socketInstance.connected) {
                const start = Date.now();
                socketInstance.emit("ping-check", () => {
                    const duration = Date.now() - start;
                    setLatency(duration);
                });
            }
        }, 2000);

        return () => {
            clearInterval(interval);
            socketInstance.disconnect();
        }
    }, [])
    return (
        <SocketContext.Provider value={{ socket, isConnected, latency }} >
            {children}
        </SocketContext.Provider>
    )
}
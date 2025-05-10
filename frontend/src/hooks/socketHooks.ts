import {useEffect} from "react";
import {socket} from "@/socket.ts";

export const useSocket = () => {
    useEffect(() => {
        if (!socket.connected) socket.connect();
    }, [])

    return { socket }
}

export const useSocketEvent = <MessageType>(
    eventName: string,
    handler: (message: MessageType) => void
) => {
    useEffect(() => {
        socket.on(eventName, handler);
        return () => socket.off(eventName, handler);
    }, [])
}
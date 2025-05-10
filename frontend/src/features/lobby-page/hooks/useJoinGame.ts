import {useSocket} from "@/hooks/socketHooks.ts";
import {useEffect} from "react";

export const useJoinGame = (gameId: number, token: number) => {
    const { socket } = useSocket();

    useEffect(() => {
        socket.emit("join-game", { gameId, token });
    }, []);

    return { socket }
};
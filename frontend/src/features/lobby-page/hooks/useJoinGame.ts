import {useSocket} from "@/hooks/socketHooks.ts";
import {useEffect, useRef} from "react";

export const useJoinGame = (gameId: number, token: number) => {
    const { socket } = useSocket();

    useEffect(() => {
        socket.emit("join-game", {gameId, token});
    }, []);

    return { socket }
};
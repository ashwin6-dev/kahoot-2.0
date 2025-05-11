import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import { useSocket } from "@/hooks/socketHooks";
import Socket from "socket.io-client";

export interface GameContext {
    socket: Socket;
    gameId: number;
    token: number;
}

export const useGameContext = () => {
    const [params] = useSearchParams();
    const gameId = parseInt(params.get("gameId"));
    const token = parseInt(localStorage.getItem("player-token")) ?? -1;
    const { socket } = useSocket();

    useEffect(() => {
        socket.emit("game-state", {
            gameId,
            token
        })

        socket.on("end-game", () => window.location.href = "/");
    }, []);

    return { gameId, socket, token }
};
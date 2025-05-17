import {useEffect, useState} from "react";

export const ROUND_TIME = 90;

export const useTimer = (roundStart: number, isHost: true, socket, gameId: number) => {
    const [delta, setDelta] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - roundStart) / 1000);
            setDelta(ROUND_TIME - elapsed);

            if (elapsed >= ROUND_TIME) {
                if (isHost) socket.emit("next-state", { gameId })
                clearInterval(interval);
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [gameId, isHost, roundStart, socket]);

    return { delta }
}
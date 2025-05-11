import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BackendRequest} from "@/lib/backendRequest.ts";

export const useGameFetch = () => {
    const [params] = useSearchParams();
    const gameId = params.get("gameId");
    const [hostName, setHostName] = useState<string>("");
    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { players : fetchedPlayers } = await BackendRequest.for(`games/${gameId}`).send();
            const host = fetchedPlayers.find(player => player.isHost);
            setHostName(host.name);
            setPlayers(fetchedPlayers.map(player => player.name));
        };

        fetchData();
    }, [gameId]);

    const addPlayer = (newPlayer: string) => {
        setPlayers(prevPlayers => [...prevPlayers, newPlayer])
    }

    return { hostName, gameId, players, addPlayer }
};
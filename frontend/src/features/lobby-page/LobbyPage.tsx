import {Button} from "@/components/ui/button.tsx"
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useGameFetch} from "@/features/lobby-page/hooks/useGameFetch.ts";
import {useJoinGame} from "@/features/lobby-page/hooks/useJoinGame.ts";
import {useSocketEvent} from "@/hooks/socketHooks.ts";

interface PlayerJoinData {
    name: string;
}

const LobbyPage = () => {
    const { hostName, gameId, players, addPlayer } = useGameFetch();
    const playerToken = parseInt(localStorage.getItem("player-token") ?? "")
    const { socket } = useJoinGame(gameId, playerToken);

    useSocketEvent<PlayerJoinData>("player-joined", ({ name }) => {
        addPlayer(name);
    });

    useSocketEvent<void>("start-game", () => window.location.href = `/game?gameId=${gameId}`)

    const startGame = () => {
        socket.emit("start-game", { gameId });
    }

    return (
        <div className="h-screen w-screen flex flex-col items-center bg-secondary text-white p-8 space-y-2">
            <p className="text-4xl font-bold tracking-tighter">Game {gameId} Lobby</p>
            <p className="text-2xl font-bold tracking-tighter">Host: {hostName}</p>
            <p className="text-2xl font-bold tracking-tighter">Players: {1 + players.length}</p>
            <Button onClick={startGame}>Start Game</Button>
            <ScrollArea className="h-3/4 mx-auto w-3/4">
                <div className="flex flex-wrap space-x-4 justify-center space-y-16 mt-16 align-start">
                    {
                        players.map((player) =>
                            <div className="transition all ease-in duration-100 cursor-pointer flex justify-center group">
                                <p className="text-xl font-bold tracking-tighter group-hover:line-through" key={player}>{ player }</p>
                            </div>
                        )
                    }
                </div>
            </ScrollArea>
        </div>
    );
};

export default LobbyPage;
import {GameContext} from "../hooks/useGameContext.ts"
import {Button} from "@/components/ui/button.tsx";
import {GameState} from "@/features/quiz-page/hooks/useGameUpdate.ts";

const RoundScores = ({ state, context }: { state: GameState, context: GameContext }) => {
    const { socket, token, gameId } = context;
    const { leaderboard, playerName } = state;
    const position = leaderboard.findIndex(player => player.name === playerName);
    const positionWithSuffix = (p: number) => {
        const map = ["st", "nd", "rd"];
        return `${p + 1}${p < map.length ? map[p] : 'th'}`
    }

    return (
        <div className="h-screen w-screen bg-secondary flex flex-col items-center justify-center space-y-8">
            <div className="bg-white p-8">
                <p className="text-xl tracking-tighter font-semibold">Your position</p>
                <p className="text-5xl font-bold tracking-tighter">{ positionWithSuffix(position) }</p>
            </div>
            { state.isHost && <Button onClick={() => socket.emit("next-state", { gameId })}>Next Round</Button> }
            <div>
                {
                    leaderboard.map((player, i) =>
                        <div className="p-4 text-white">
                            <p className="text-3xl font-bold tracking-tighter">{i + 1}. { player.name } { player.score }</p>
                        </div>)
                }
            </div>
        </div>
    )
}

export default RoundScores;
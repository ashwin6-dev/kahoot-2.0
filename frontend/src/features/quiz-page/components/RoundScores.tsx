import {GameContext} from "../hooks/useGameContext.ts"
import Position from "./Position.tsx";
import {GameState} from "@/features/quiz-page/hooks/useGameUpdate.ts";
import Leaderboard from "./Leaderboard.tsx";

const RoundScores = ({ state, context }: { state: GameState, context: GameContext }) => {
    const { leaderboard, playerName } = state;
    const position = leaderboard.findIndex(player => player.name === playerName);

    return (
        <div className="h-screen w-screen bg-secondary flex flex-col space-y-4 items-center justify-center">
            <div>
                {
                    state.state === 'FINISHED' && <p className="text-3xl text-white font-bold tracking-tighter row">Game Over!</p>
                }
            </div>
            <div className="flex items-start space-x-4">
                <Position position={position} state={state} context={context}/>
                <Leaderboard leaderboard={leaderboard} />
            </div>
        </div>
    )
}

export default RoundScores;
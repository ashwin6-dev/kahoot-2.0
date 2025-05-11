import {useGameContext} from "./hooks/useGameContext.ts";
import RoundScores from "./components/RoundScores.tsx";
import {useGameUpdate} from "@/features/quiz-page/hooks/useGameUpdate.ts";
import QuestionScreen from "@/features/quiz-page/components/QuestionScreen.tsx";

const QuizPage = () => {
    const context = useGameContext();
    const gameState = useGameUpdate(context);

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            { gameState.state === 'QUESTION' &&
                <QuestionScreen state={gameState} context={context}/>
            }

            { gameState.state === 'ROUND_SCORES' &&
                <RoundScores state={gameState} context={context}/>
            }

            { gameState.state === 'FINISHED' &&
                <strong>FINISHED</strong>
            }
        </div>
    )
}

export default QuizPage;
import {Button} from "@/components/ui/button.tsx";
import AnswerCard from "@/features/quiz-page/components/AnswerCard.tsx";
import {GameState} from "@/features/quiz-page/hooks/useGameUpdate.ts";
import {GameContext} from "@/features/quiz-page/hooks/useGameContext.ts";
import {ROUND_TIME} from "@/features/quiz-page/hooks/useTimer.ts";
import {useState} from "react";

const QuestionScreen = ({ state, context }) => {
    const { question, playerScore, isHost, delta }: GameState = state;
    const { gameId, socket, token }: GameContext = context;
    const [answered, setAnswered] = useState<boolean>(false);
    const colorList = ["primary", "secondary", "destructive", "primary"]

    const submitAnswer = (answer: number) => {
        socket.emit("submit-answer", {
            gameId,
            question,
            answer,
            token,
            elapsed: (ROUND_TIME - delta) / ROUND_TIME
        })

        setAnswered(true);
    }
    return (
        <div className="h-3/4 w-3/4 flex flex-col items-center space-y-8">
            <p className="text-5xl font-bold tracking-tighter">{ question.question }</p>
            <div className="flex gap-8">
                <div className="flex flex-col bg-foreground text-white p-12">
                    <p className="text-2xl font-semibold tracking-tight">Points</p>
                    <p className="text-4xl font-bold tracking-tighter">{ playerScore }</p>
                </div>
                <div className="flex flex-col bg-foreground text-white p-12">
                    <p className="text-2xl font-semibold tracking-tight">Time</p>
                    <p className="text-4xl font-bold tracking-tighter">{delta}s</p>
                </div>
            </div>
            { isHost && <Button onClick={() => socket.emit("next-state", { gameId })}>End Round</Button> }
            { !answered &&
                <div className="w-3/5 gap-4 grid grid-cols-2 mt-auto">
                    {
                        question.options.map((option, i) =>
                            <AnswerCard key={option} answer={option} color={colorList[i]}
                                        onClick={() => submitAnswer(i)}/>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default QuestionScreen;
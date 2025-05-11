import {useSocketEvent} from "@/hooks/socketHooks.ts";
import {useState} from "react";
import {GameContext} from "./useGameContext.ts";
import {useTimer} from "@/features/quiz-page/hooks/useTimer.ts";

export interface Question {
    question: string,
    options: string[],
    answer: number
}

export interface GameState {
    question: Question;
    state: string;
    playerScore: number;
    playerName: string;
    roundStart: number;
    isHost: boolean;
    delta: number;
    players: any[];
}

export const useGameUpdate = ({socket, gameId, token}: GameContext) => {
    const [question, setQuestion] = useState<Question>({ question: "", options: [], answer: 0 });
    const [state, setState] = useState<string>();
    const [playerScore, setPlayerScore] = useState<number>();
    const [roundStart, setRoundStart] = useState<Date>(new Date());
    const [isHost, setHost] = useState<boolean>(false);
    const { delta } = useTimer(roundStart, isHost, socket, gameId);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [playerName, setPlayerName] = useState<string>();

    useSocketEvent("game-update", ({ question, state, playerScore, playerName, roundStart, leaderboard, isHost }: GameState) => {
        setQuestion(question);
        setState(state);
        setPlayerScore(playerScore);
        setPlayerName(playerName);
        setRoundStart(roundStart);
        setHost(isHost);
        setLeaderboard(leaderboard);
    })

    useSocketEvent("state-update", () => {
        socket.emit("game-state", {
            gameId,
            token
        })
    })

    return { question, state, playerScore, playerName, isHost, roundStart, leaderboard, delta }
}

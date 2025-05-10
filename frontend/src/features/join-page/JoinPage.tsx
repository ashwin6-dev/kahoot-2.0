import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";
import {BackendRequest} from "@/lib/backendRequest.ts";
import {useState} from "react";

// 228877
const JoinPage = () => {
    const [playerName, setPlayerName] = useState<string>("");
    const [gameId, setGameId] = useState<string>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const joinGame = async () => {
        console.log(gameId);
        const data = await BackendRequest.for(`games/join/${gameId}`)
            .withParam("playerName", playerName)
            .send()

        if (data.error) {
            setErrorMessage(data.message);
        }else {
            setErrorMessage("");
            window.location.href = `/lobby?gameId=${gameId}`
        }
    }

    return (
        <Container containerTitle="Join Game">
            <Label>Code</Label>
            <Input placeholder="Enter code"
                   onChange={(e) => setGameId(parseInt(e.target.value))}></Input>

            <Label>Name</Label>
            <Input placeholder="Enter name"
                   onChange={(e) => setPlayerName(e.target.value)}></Input>

            { errorMessage.length > 0 && <div className="bg-destructive text-white p-2 font-bold tracking-tighter">
                { errorMessage }
            </div> }

            <Button onClick={joinGame}>Join Game</Button>
        </Container>
    )
}

export default JoinPage;
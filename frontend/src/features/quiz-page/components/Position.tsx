import {Button} from "@/components/ui/button.tsx";

const Position = ({ state, context, position }) => {
    const positionWithSuffix = (p: number) => {
        const map = ["st", "nd", "rd"];
        return `${p + 1}${p < map.length ? map[p] : 'th'}`
    }

    const endGame = () => {
        alert("done")
    }

    const { socket, gameId } = context;

    return (
        <div className="bg-white p-8">
            <p className="text-xl tracking-tighter font-semibold">Your position</p>
            <p className="text-5xl font-bold tracking-tighter">{ positionWithSuffix(position) }</p>
            <br />
            { state.isHost &&
                (state.state === 'ROUND_SCORES' ?
                    <Button onClick={() => socket.emit("next-state", { gameId })}>Next Round</Button>
                :   <Button onClick={endGame}>End Game</Button>)
            }
        </div>
    );
}

export default Position;
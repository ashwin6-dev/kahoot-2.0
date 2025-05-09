import { Gamepad } from "lucide-react"
import HomeCard from "./HomeCard"

const JoinCard = ({ ...props }) => {
    return <HomeCard icon={ <Gamepad /> }
                     title="Join Game" 
                     description="Enter a code to join a live game."
                     buttonText="Join"
                     to="/join"
                     {...props}/>
}

export default JoinCard;
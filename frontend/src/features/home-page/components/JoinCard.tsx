import {Users} from "lucide-react"
import HomeCard from "./HomeCard"

const JoinCard = ({ ...props }) => {
    return <HomeCard icon={ <Users /> }
                     title="Join Game"
                     color="secondary"
                     description="Enter a room code to join friends or strangers in exciting real-time quiz competitions."
                     buttonText="Join"
                     to="/join"
                     {...props}/>
}

export default JoinCard;
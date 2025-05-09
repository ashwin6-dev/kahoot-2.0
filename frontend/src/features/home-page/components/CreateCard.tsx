import { PencilLine } from "lucide-react"
import HomeCard from "./HomeCard"

const CreateCard = ({ ...props }) => {
    return <HomeCard icon={ <PencilLine /> } 
                     title="Write a Question" 
                     description="Write a question to add to the database."
                     buttonText="Write"
                     to="/create"
                     {...props}/>
}

export default CreateCard;
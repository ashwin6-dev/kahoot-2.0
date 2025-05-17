import { PencilLine } from "lucide-react"
import HomeCard from "./HomeCard"

const CreateCard = ({ ...props }) => {
    return <HomeCard icon={ <PencilLine /> } 
                     title="Contribute a Question"
                     color="destructive"
                     description="Add your own questions to help grow our database and challenge others."
                     buttonText="Contribute"
                     to="/create"
                     {...props}/>
}

export default CreateCard;
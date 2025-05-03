import { Search } from "lucide-react"
import HomeCard from "./HomeCard"

const SearchCard = () => {
    return <HomeCard icon={ <Search /> } 
                     title="Search Questions" 
                     description="Search for questions to create a live game."
                     buttonText="Search"
                     to="/search" />
}

export default SearchCard;
import { Search } from "lucide-react"
import HomeCard from "./HomeCard"

const SearchCard = ({ ...props }) => {
    return <HomeCard icon={ <Search /> } 
                     title="Search Questions"
                     color="primary"
                     description="Search our extensive database of questions across various categories and difficulty levels."
                     buttonText="Search"
                     to="/search"
                     { ...props }/>
}

export default SearchCard;
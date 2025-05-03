import CreateCard from "./components/CreateCard";
import JoinCard from "./components/JoinCard";
import SearchCard from "./components/SearchCard";

const HomePage = () => {
    return (
        <div className="w-1/2 space-y-4 mx-auto mt-64">
            <p className="text-4xl font-bold">Kahoot Clone</p>
            <div className="grid grid-cols-3 space-x-4">
                <SearchCard />
                <JoinCard />
                <CreateCard />
            </div>
        </div>
    )
}

export default HomePage;
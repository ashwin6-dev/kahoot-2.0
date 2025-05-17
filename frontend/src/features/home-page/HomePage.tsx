import Container from "@/components/Container";
import CreateCard from "./components/CreateCard";
import JoinCard from "./components/JoinCard";
import SearchCard from "./components/SearchCard";
import {Button} from "@/components/ui/button.tsx"
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <Container containerTitle="" breadcrumb={false}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h1 className="text-5xl font-bold tracking-tighter">
                    Create and Play Quizzes
                </h1>
                <p className="mx-auto md:text-xl">
                    Search for questions, join quiz rooms and play with friends.
                </p>
            </div>
            <div className="grid grid-cols-2 w-3/4 mx-auto space-x-8 mt-16">
                <SearchCard />
                <JoinCard />
            </div>
        </Container>
    )
}

export default HomePage;

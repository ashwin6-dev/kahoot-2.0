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
                    Search for questions, join quiz rooms, or create your own questions.
                </p>
                <div className="space-x-4">
                    <Link to="/search">
                        <Button className="hover:bg-primary/90">Search Questions</Button>
                    </Link>
                    <Link to="/join">
                        <Button variant="outline" className="border-primary text-primary hover:bg-[#00e676]/10">
                            Join Quiz
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-3 space-x-8 mt-16">
                <SearchCard className="h-48"/>
                <JoinCard className="h-48"/>
                <CreateCard className="h-48"/>
            </div>
        </Container>
    )
}

export default HomePage;

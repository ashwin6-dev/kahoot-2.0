import Container from "@/components/Container";
import CreateCard from "./components/CreateCard";
import JoinCard from "./components/JoinCard";
import SearchCard from "./components/SearchCard";
import NavBreadcrumb from "@/components/NavBreadcrumb.tsx";

const HomePage = () => {
    return (
        <Container containerTitle="Mini Kahoot">
            <NavBreadcrumb/>
            <div className="grid grid-cols-3 space-x-4">
                <SearchCard />
                <JoinCard />
                <CreateCard />
            </div>
        </Container>
    )
}

export default HomePage;
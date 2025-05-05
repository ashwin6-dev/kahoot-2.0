import Container from "@/components/Container.tsx";
import {Input} from "@/components/ui/input";
import NavBreadcrumb from "@/components/NavBreadcrumb.tsx";
import {Button} from "@/components/ui/button.tsx";
import ResultDisplay from "@/features/search-page/components/ResultDisplay.tsx";
import SelectionDisplay from "@/features/search-page/components/SelectionDisplay.tsx";
import {SearchPageContextProvider} from "@/features/search-page/contexts/SearchPageContext.tsx";

const SearchPage = () => {
    const results = [
        {question: "Who is Virat Kohli?", answer: "Indian Cricketer", tags: ["cricket", "sport"]},
        {question: "Who is Lionel Messi?", answer: "Argentinian Footballer", tags: ["sport", "football"]}
    ]

    return (
        <SearchPageContextProvider>
            <Container containerTitle="Search Questions">
                <NavBreadcrumb/>
                <div className="flex space-x-4">
                    <div className="space-y-4 w-2/3">
                        <div className="flex space-x-4">
                            <Input className="col-span-3" placeholder="Enter description for quiz..."></Input>
                            <Button className="col-span-1">Search</Button>
                        </div>
                        <div className="grid grid-cols-2 space-x-4">
                            <ResultDisplay results={results}/>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <SelectionDisplay/>
                    </div>
                </div>
            </Container>
        </SearchPageContextProvider>
    )
}

export default SearchPage;
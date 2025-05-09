import Container from "@/components/Container.tsx";
import {Input} from "@/components/ui/input";
import NavBreadcrumb from "@/components/NavBreadcrumb.tsx";
import {Button} from "@/components/ui/button.tsx";
import ResultDisplay from "@/features/search-page/components/ResultDisplay.tsx";
import SelectionDisplay from "@/features/search-page/components/SelectionDisplay.tsx";
import {SearchPageContextProvider} from "@/features/search-page/contexts/SearchPageContext.tsx";
import {useState} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const SearchPage = () => {
    const [description, setDescription] = useState<string>("");
    const [results, setResults] = useState<any>([]);

    const searchQuestions = async () => {
        const response = await fetch("http://localhost:3000/questions/search?query=" + description);

        const data = await response.json();

        setResults(data);
    }


    return (
        <SearchPageContextProvider>
            <Container containerTitle="Search Questions">
                <div className="flex space-x-4">
                    <div className="space-y-4 w-2/3">
                        <div className="flex space-x-4">
                            <Input className="col-span-3"
                                   placeholder="Enter description for quiz..."
                                   onChange={(e) => setDescription(e.target.value)} />
                            <Button className="col-span-1" onClick={searchQuestions}>Search</Button>
                        </div>
                        <ScrollArea className="h-2/5">
                            <ResultDisplay results={results}/>
                        </ScrollArea>
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
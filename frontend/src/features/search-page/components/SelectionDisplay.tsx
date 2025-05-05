import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Result, useSearchPageContext} from "@/features/search-page/contexts/SearchPageContext.tsx";

const SelectionDisplay = () => {
    const { selectedList, handleSelect } = useSearchPageContext();

    return <Card>
        <CardHeader>
            <CardTitle>Selected Questions</CardTitle>
            <CardDescription>Select questions from search results to put in the game.</CardDescription>
        </CardHeader>
        <CardContent>
            { selectedList.length === 0 ? "No questions selected" :
                <ol className="list-decimal pl-4">
                    {
                        selectedList.map(
                            (selection: Result) =>
                                <li className="cursor-pointer hover:line-through"
                                    onClick={() => handleSelect(selection)}>
                                    { selection.question }
                                </li>
                            )
                    }
                </ol>
            }
        </CardContent>
        <CardFooter>
            <Button>Create Game</Button>
        </CardFooter>
    </Card>
}

export default SelectionDisplay;
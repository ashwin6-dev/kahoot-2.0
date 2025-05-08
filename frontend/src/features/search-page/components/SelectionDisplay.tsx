import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Result, useSearchPageContext} from "@/features/search-page/contexts/SearchPageContext.tsx";
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert.tsx";
import {ListTodo} from "lucide-react";

const SelectionDisplay = () => {
    const { selectedList, handleSelect } = useSearchPageContext();

    return <Card>
        <CardHeader>
            <CardTitle>Selected Questions</CardTitle>
            <CardDescription>Select questions from search results to put in the game.</CardDescription>
        </CardHeader>
        <CardContent>
            { selectedList.length === 0 ? "No questions selected" :
                <div className="space-y-1">
                    {
                        selectedList.map(
                            (selection: Result) =>
                                <Alert onClick={() => handleSelect(selection)} className="hover:bg-input/30 cursor-pointer">
                                    <ListTodo />
                                    <AlertTitle>{ selection.question }</AlertTitle>
                                    <AlertDescription>{ selection.answer }</AlertDescription>
                                </Alert>
                            )
                    }
                </div>
            }
        </CardContent>
        <CardFooter>
            <Button>Create Game</Button>
        </CardFooter>
    </Card>
}

export default SelectionDisplay;
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Result, useSearchPageContext} from "@/features/search-page/contexts/SearchPageContext.tsx";
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert.tsx";
import {ListTodo} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const SelectionDisplay = () => {
    const { selectedList, handleSelect } = useSearchPageContext();

    return <Card>
        <CardHeader>
            <CardTitle>Selected Questions</CardTitle>
            <CardDescription>Select questions from search results to put in the game.</CardDescription>
        </CardHeader>
        <CardContent>
            { selectedList.length === 0 ? "No questions selected" :
                <ScrollArea className="h-64">
                    <div className="space-y-1">
                            {
                                selectedList.map(
                                    (selection: Result) =>
                                        <Alert onClick={() => handleSelect(selection)} className="hover:bg-input/30 hover:text-underline cursor-pointer group">
                                            <ListTodo />
                                            <AlertTitle className="group-hover:line-through">{ selection.question }</AlertTitle>
                                            <AlertDescription className="group-hover:line-through">{ selection.options[selection.answer] }</AlertDescription>
                                        </Alert>
                                    )
                            }
                    </div>
                </ScrollArea>
            }
        </CardContent>
        <CardFooter>
            <Button>Create Game</Button>
        </CardFooter>
    </Card>
}

export default SelectionDisplay;
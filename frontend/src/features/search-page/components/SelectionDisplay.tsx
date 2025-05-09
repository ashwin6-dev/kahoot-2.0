import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Result, useSearchPageContext} from "@/features/search-page/contexts/SearchPageContext.tsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import {BackendRequest} from "@/lib/backendRequest.ts";

const SelectionDisplay = () => {
    const { selectedList, handleSelect } = useSearchPageContext();

    const createGame = async () => {
        const { gameId } = await BackendRequest.for("games")
            .withMethod("POST")
            .withBody({ questions: selectedList })
            .send();
    }

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
                                        <div onClick={() => handleSelect(selection)} className="transition-all ease-in-out duration-100 border p-3 hover:bg-destructive hover:text-underline cursor-pointer group">
                                            <p className="transition-all ease-in-out duration-100 text-lg font-semibold group-hover:line-through group-hover:text-destructive-foreground">{ selection.question }</p>
                                            <p className="transition-all ease-in-out duration-100 text-muted-foreground group-hover:line-through group-hover:text-destructive-foreground">{ selection.options[selection.answer] }</p>
                                        </div>
                                    )
                            }
                    </div>
                </ScrollArea>
            }
        </CardContent>
        <CardFooter>
            <Button onClick={createGame}>Create Game</Button>
        </CardFooter>
    </Card>
}

export default SelectionDisplay;
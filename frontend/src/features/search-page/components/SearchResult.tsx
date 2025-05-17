import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge.tsx";
import {Alert} from "@/components/ui/alert.tsx";

interface SearchResultProps {
    question: string,
    answer: string,
    tags: string[],
    onSelect?: () => void
}

const SearchResult =  ({ question, answer, tags, onSelect }: SearchResultProps) => {
    return (
        <div className="transition-all ease-in-out duration-300 border p-3 flex justify-between hover:bg-input/20 cursor-pointer" onClick={onSelect}>
            <div className="space-x-2">
                <span className="text-lg font-semibold">{ question }</span>
                <span className="text-sm text-muted-foreground">{ answer }</span>
            </div>
            <div>
                { tags.map(tag => <Badge className="bg-secondary mr-4">{ tag }</Badge>) }
            </div>
        </div>
    )
}

export default SearchResult;
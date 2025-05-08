import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge.tsx";

interface SearchResultProps {
    question: string,
    answer: string,
    tags: string[],
    onSelect?: () => void
}

const SearchResult =  ({ question, answer, tags, onSelect }: SearchResultProps) => {
    return (
        <Card className="transition-all ease-in-out duration-300 hover:bg-input/30 cursor-pointer" onClick={onSelect}>
            <CardHeader>
                <CardTitle>{ question }</CardTitle>
                <CardDescription>{ answer }</CardDescription>
            </CardHeader>
            <CardContent>
                { tags.map(tag => <Badge className="bg-secondary mr-4">{ tag }</Badge>) }
            </CardContent>
        </Card>
    )
}

export default SearchResult;
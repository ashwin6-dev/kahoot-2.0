import SearchResult from "@/features/search-page/components/SearchResult.tsx";
import {Result, useSearchPageContext} from "../contexts/SearchPageContext";

const ResultDisplay = ({results}: { results: Result[] }) => {
    const {handleSelect} = useSearchPageContext();

    return (
        <>
            {
                results.map(result => (
                    <SearchResult question={result.question}
                                  answer={result.answer}
                                  tags={result.tags}
                                  onSelect={() => handleSelect(result)}/>
                ))
            }
        </>
    );
}

export default ResultDisplay;
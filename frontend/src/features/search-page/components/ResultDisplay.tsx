import SearchResult from "@/features/search-page/components/SearchResult.tsx";
import {Result, useSearchPageContext} from "../contexts/SearchPageContext";
import {useEffect, useState} from "react";

const ResultDisplay = ({results}: { results: Result[] }) => {
    const {selectedMap, handleSelect} = useSearchPageContext();

    return (
        <div className="grid grid-cols-1 space-y-4">
            { results.length === 0 ? "No results" :
                <>
                    {
                        results.map(result => (
                            !selectedMap.get(result.question)
                            && <SearchResult question={result.question}
                                          answer={result.options[result.answer]}
                                          tags={result.tags}
                                          onSelect={() => handleSelect(result)}/>
                        ))
                    }
                </>
            }
        </div>
    );
}

export default ResultDisplay;
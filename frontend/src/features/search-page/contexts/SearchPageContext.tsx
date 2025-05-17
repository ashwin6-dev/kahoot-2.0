import {createContext, ReactNode, useContext, useState} from "react";

interface Result {
    options: string[];
    question: string,
    answer: number,
    tags: string[]
}

interface SearchPageContextValue {
    selectedList: Result[],
    selectedMap: Map<string, boolean>,
    handleSelect: (selection: Result) => void
}

const SearchPageContext = createContext<SearchPageContextValue | null>(null);

const SearchPageContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedList, setSelectedList] = useState<Result[]>([]);
    const [selectedMap, setSelectedMap] = useState<Map<string, boolean>>(new Map());

    const handleSelect = (selection: Result) => {
        setSelectedList(prevList => {
            if (prevList.some(item => selection.question == item.question)) {
                return prevList.filter(item => item.question !== selection.question);
            } else {
                return [...prevList, selection];
            }
        })

        setSelectedMap(prevMap => {
            const newMap = new Map(prevMap);
            const prev = newMap.get(selection.question) || false;
            newMap.set(selection.question, !prev);
            console.log(newMap);
            return newMap;
        });
    }

    return (
        <SearchPageContext.Provider value={{ selectedMap, selectedList, handleSelect }}>
            { children }
        </SearchPageContext.Provider>
    )
}

const useSearchPageContext = () => useContext(SearchPageContext);

export { SearchPageContextProvider, useSearchPageContext };
export type { Result };

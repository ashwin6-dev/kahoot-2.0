import {createContext, ReactNode, useContext, useState} from "react";

interface Result {
    question: string,
    answer: string,
    tags: string[]
}

interface SearchPageContextValue {
    selectedList: Result[],
    handleSelect: (selection: Result) => void
}

const SearchPageContext = createContext<SearchPageContextValue | null>(null);

const SearchPageContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedList, setSelectedList] = useState<Result[]>([]);

    const handleSelect = (selection: Result) => {
        setSelectedList(prevList => {
            if (prevList.some(item => selection.question == item.question)) {
                return prevList.filter(item => item.question !== selection.question);
            } else {
                return [...prevList, selection];
            }
        })
    }

    return (
        <SearchPageContext.Provider value={{ selectedList, handleSelect }}>
            { children }
        </SearchPageContext.Provider>
    )
}

const useSearchPageContext = () => useContext(SearchPageContext);

export { SearchPageContextProvider, useSearchPageContext };
export type { Result };

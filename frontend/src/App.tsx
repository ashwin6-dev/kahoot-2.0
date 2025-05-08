import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route } from 'react-router-dom';
import JoinPage from "./features/join-page/JoinPage";
import HomePage from "./features/home-page/HomePage";
import SearchPage from "@/features/search-page/SearchPage.tsx";

export default function App() {
    return (
        <ThemeProvider defaultTheme="light">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </ThemeProvider>
      )
}

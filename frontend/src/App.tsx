import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route } from 'react-router-dom';
import JoinPage from "./features/join-page/JoinPage";
import HomePage from "./features/home-page/HomePage";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/join" element={<JoinPage />} />
            </Routes>
        </ThemeProvider>
      )
}

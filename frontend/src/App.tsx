import HomePage from "./features/home-page/HomePage";
import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  )
}

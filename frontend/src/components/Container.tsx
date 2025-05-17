import {Link} from "react-router-dom";
import NavBreadcrumb from "@/components/NavBreadcrumb.tsx";

interface ContainerProps {
    children?: React.ReactNode;
    containerTitle: string;
    breadcrumb: boolean;
}

const Container = ({ containerTitle, breadcrumb = true, children }: ContainerProps) => {
    return <>
            <nav className="bg-background border-b border-border p-4 px-32 flex items-center justify-between">
                <div className="text-2xl font-bold tracking-tight">Mini Kahoot</div>
                <div className="flex items-center gap-4">
                    <Link to="/" className="ext-sm font-medium text-[#666] transition-colors hover:text-[#333]">Home</Link>
                    <Link to="/join" className="ext-sm font-medium text-[#666] transition-colors hover:text-[#333]">Join</Link>
                    <Link to="/search" className="ext-sm font-medium text-[#666] transition-colors hover:text-[#333]">Search</Link>
                </div>
            </nav>
            <div className="w-3/4 space-y-4 mx-auto mt-20">
                <p className="text-4xl font-bold">{ containerTitle }</p>
                { breadcrumb && <NavBreadcrumb/> }
                { children }
            </div>
        </>
}

export default Container;
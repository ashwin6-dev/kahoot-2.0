import {Link} from "react-router-dom";

interface ContainerProps {
    children?: React.ReactNode;
    containerTitle: string;
}

const Container = ({ containerTitle, children }: ContainerProps) => {
    return <>
            <nav className="bg-background border-b border-border p-4 px-8 flex items-center justify-between">
                <div className="font-bold text-xl">Mini Kahoot</div>
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <Link to="/join" className="hover:text-primary">Join</Link>
                    <Link to="/search" className="hover:text-primary">Search</Link>
                </div>
            </nav>
            <div className="w-3/4 space-y-4 mx-auto mt-20">
                <p className="text-4xl font-bold">{ containerTitle }</p>
                { children }
            </div>
        </>
}

export default Container;
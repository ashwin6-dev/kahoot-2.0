interface ContainerProps {
    children?: React.ReactNode;
    containerTitle: string;
}

const Container = ({ containerTitle, children }: ContainerProps) => {
    return <div className="w-3/4 space-y-4 mx-auto mt-64">
                <p className="text-4xl font-bold">{ containerTitle }</p>
                { children }
            </div>
}

export default Container;
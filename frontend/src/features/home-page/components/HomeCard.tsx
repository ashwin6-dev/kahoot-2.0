import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

interface HomeCardProps {
    icon: ReactNode,
    title: string,
    color: string,
    description: string,
    buttonText: string,
    to: string
}

const HomeCard = ({ icon, color, title, description, buttonText, to, ...props }: HomeCardProps) => {
    return (
        <Card {...props} className="flex flex-col h-full">
            <CardHeader>
                <div className={`inline-block bg-${color} p-2 text-white w-full`}>
                    { icon }
                </div>
                <CardTitle>{ title }</CardTitle>
                <CardDescription>{ description }</CardDescription>
            </CardHeader>
            <CardFooter>
                <Link to={to} className="w-full">
                    <Button className="w-full" variant={color == "primary" ? "default" : color}>{ buttonText }</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default HomeCard;
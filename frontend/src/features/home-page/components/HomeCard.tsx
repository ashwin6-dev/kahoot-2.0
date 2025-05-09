import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

interface HomeCardProps {
    icon: ReactNode,
    title: string,
    description: string,
    buttonText: string,
    to: string
}

const HomeCard = ({ icon, title, description, buttonText, to, ...props }: HomeCardProps) => {
    return (
        <Card {...props} >
            <CardHeader className="flex flex-col items-center justify-center">
                { icon }
                <CardTitle>{ title }</CardTitle>
                <CardDescription>{ description }</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-center justify-center">
                <Link to={to}>
                    <Button>{ buttonText }</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default HomeCard;
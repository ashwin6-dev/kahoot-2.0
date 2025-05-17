import { useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbLink
} from "./ui/breadcrumb";

const NavBreadcrumb = () => {
    const { pathname } = useLocation();
    const segments = pathname
        .split("/")
        .filter(segment => segment.length)
        .map(segment => segment[0].toUpperCase() + segment.slice(1));

    const breadcrumbItems = [{ name: 'Home', path: '/' }, ...segments.map((segment, index) => ({
        name: segment,
        path: `/${segments.slice(0, index + 1).join('/')}`
    }))];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {index === breadcrumbItems.length - 1 ? (
                            <BreadcrumbPage>{item.name}</BreadcrumbPage>
                        ) : (
                            <>
                                <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default NavBreadcrumb;
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb"

const NavBreadcrumb = ({ pages }: { pages: string[] }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    pages.map((page, index) => 
                        <BreadcrumbItem>
                            { index == pages.length - 1 ? 
                                <BreadcrumbPage>{ page }</BreadcrumbPage> 
                                : <>
                                    <BreadcrumbLink href={"/" + page}>{ page }</BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                  </>
                            }
                        </BreadcrumbItem>
                    )
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
  
}

export default NavBreadcrumb;
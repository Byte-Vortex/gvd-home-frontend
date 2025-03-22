import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function MoreCategoriesAuthorsSection({ data }) {
    return (
        <div className="space-y-16">

            <div className="space-y-4">
                <h3 className="text-2xl">More Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        data.categories.map((item, index) => (
                            <Link href={"/blogs/categories/" + item.slug} key={index}>
                                <Badge variant={"outline"} className={"text-sm hover:bg-primary hover:text-on-primary hover:border-transparent"}>
                                    {item.title}
                                </Badge>
                            </Link>
                        ))
                    }

                </div>
            </div>

            <div className="space-y-4">
                <h4>Authors</h4>
                <div className="flex flex-wrap gap-4">
                    {
                        data.authors.map((item, index) => (
                            <Link href={"/blogs/authors/" + item.slug} key={index}>
                                <Badge variant={"outline"} className={"text-sm hover:bg-primary hover:text-on-primary hover:border-transparent"}>
                                    {item.full_name}
                                </Badge>
                            </Link>
                        ))
                    }

                </div>
            </div>

        </div>
    )
}
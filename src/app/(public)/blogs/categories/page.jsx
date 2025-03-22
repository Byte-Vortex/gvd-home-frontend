import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Image } from "@/components/image";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { getScriptTags } from "@/app/_server/get-script-tags";


export default async function Page() {
    const [data, scripts] = await Promise.all([makeRequestServer("/blogs/category/"), getScriptTags("/blogs/categories/")]);

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12 py-12">
            <DynamicScripts pathname={"/blogs/categories/"} scripts={scripts} />
            <h1>All Categories</h1>
            <ProseInnerHtmlContainer html={"<p>The 'All Categories' page of a blog serves as a comprehensive hub for navigating the site's diverse content. Here, readers can easily explore various topics, from lifestyle and travel to technology and wellness. Each category is neatly organized, allowing visitors to quickly find articles that interest them. This page enhances user experience by providing a clear overview of the blog's offerings, making it simple to discover new insights and engaging stories.</p>"} />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    data?.map((card, index) => (
                        <Card key={index} data={card} />
                    ))
                }
            </div>
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={data.slug} className="bg-surface text-on-surface rounded-xl p-4 max-w-sm mx-auto w-full gap-2 flex flex-col">
            <h5>{data.title}</h5>
            <ProseInnerHtmlContainer className="line-clamp-2" html={data.description} />

            <Button className="p-0 max-w-max text-base" variant="link">
                View
            </Button>
            <div className="relative w-full aspect-w-16 aspect-h-9 mt-auto">
                <Image
                    fill
                    className="w-full h-full object-cover rounded-xl"
                    src={data.image}
                />
            </div>

        </Link>
    )
}
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecentBlogs } from "./_components/recent-blogs";
import { getScriptTags } from "@/app/_server/get-script-tags";
import { DynamicScripts } from "@/components/dynamic-scripts";


export async function generateStaticParams() {
    return [];
}


export default async function Page({ params }) {

    const { id } = params;
    let data = null;
    let scripts = null;
    try {
        [data, scripts] = await Promise.all([makeRequestServer("/blogs/category/" + id), getScriptTags("/blogs/categories/" + id + "/")]);
    } catch (err) {
        return notFound();
    }
    return (
        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 py-12 grid lg:grid-cols-10 gap-12">
            <DynamicScripts pathname={"/blogs/categories/" + id + "/"} scripts={scripts} />
            <div className="lg:col-span-3">
                <div className="size-32 relative">
                    <Image
                        sizes="128px"
                        fill
                        className="w-full h-full object-cover rounded-full"
                        src={data.image}
                    />
                </div>

                <h3 className="text-primary my-3">{data.title}</h3>

                <ProseInnerHtmlContainer html={data.description} />

            </div>

            <div className="lg:col-span-7 space-y-6">
                <h3>Featured Blog</h3>
                <div className="w-full aspect-h-9 aspect-w-16 rounded-xl relative">
                    <Image fill alt={data.featured_blog.image_alt} className="w-full h-full object-cover rounded-xl shadow-xl" src={data.featured_blog.imageLink} />
                </div>



                <h1>{data.featured_blog.title}</h1>
                <p className="line-clamp-2">{data.featured_blog.summary}</p>
                <Button asChild variant="link" className="block p-0">
                    <Link href={"/blogs/" + data.featured_blog.slug}>
                        Read More
                    </Link>
                </Button>

                <Separator className="bg-primary" />

                <RecentBlogs data={data.blogs} />
            </div>

        </div>
    )
}
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

export function BlogsSection({ data }) {
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h3 className="font-medium">{data.title}</h3>
                <Button className="p-0" variant="link">
                    <Link href={"/blogs"}>
                        View All
                    </Link>
                </Button>
            </div>
            <div className="grid lg:grid-cols-10 gap-8">
                <div className="lg:col-span-7">
                    <div className=" max-w-xl mx-auto lg:max-w-full mb-4">
                        <div className="w-full aspect-h-9 aspect-w-16 rounded-3xl overflow-hidden">
                            <Image fill className="w-full h-full object-cover" src={data.blogs[0].imageLink} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3>{data.blogs[0].title}</h3>
                        <div className="flex gap-2 items-center">
                            <div className="relative w-8 h-8">
                                <Image
                                    src={data.blogs[0].author_image}
                                    alt={data.blogs[0].author}
                                    fill
                                    className="object-cover w-full h-full object-top rounded-full"
                                />
                            </div>
                            {data.blogs[0].author}
                        </div>
                        <ProseInnerHtmlContainer html={data.blogs[0].summary} className="line-clamp-2" />
                        <span>{format(new Date(data.blogs[0].updated_at), 'MMM d, yyyy')}</span>

                        <Button asChild variant="link" className="block p-0">
                            <Link href={"/blogs/" + data.blogs[0].slug}>
                                Read More
                            </Link>
                        </Button>
                    </div>
                </div>


                <div className="lg:col-span-3 h-max grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {data.blogs.slice(1, Math.min(data.blogs.length, 5)).map((data, index) => (
                        <Link key={index} href={"/blogs/" + data.slug} className="bg-surface text-on-surface rounded-lg overflow-hidden w-full grid grid-cols-3 p-4 gap-4 max-w-md mx-auto group hover:bg-primary hover:text-on-primary duration-150">
                            <div className="col-span-2 md:min-h-28">
                                <div className="text-sm text-sub-text group-hover:text-on-primary font-semibold">{format(new Date(data.updated_at), 'MMM d, yyyy')}&nbsp;.<span className="text-primary group-hover:bg-on-primary px-1">{data.author}</span></div>
                                <p className="line-clamp-3">
                                    {data.title}
                                </p>
                            </div>

                            <div className="relative w-full h-max overflow-hidden aspect-w-4 aspect-h-3 rounded-lg mt-auto">
                                <Image
                                    sizes="200px"
                                    fill
                                    className="w-full h-full object-cover"
                                    src={data.imageLink}
                                />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>

    )
}
import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Image } from "@/components/image";


export default async function Page() {
    const data = (await makeRequestServer("/eventservices/events/"));
    data.events?.sort((a,b)=> new Date(a.date)- new Date(b.date))
    return (
        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 py-12">
            <h1>{data.title}</h1>
            <ProseInnerHtmlContainer html={data.text} className="mb-12 mt-2" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    data.events?.map((card, index) => (
                        <Card key={index} data={card} />
                    ))
                }
            </div>
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={data.buttonLink + "/"} className="bg-surface text-on-surface rounded-xl p-4 gap-1 max-w-sm mx-auto w-full space-y-2">
            <h5>{data.title}</h5>
            <p className="line-clamp-2">{data.text}</p>

            <Button className="p-0" variant="link" >
                {data.buttonText}
            </Button>
            <div className="relative w-full h-56">
                <Image
                    fill
                    className="w-full h-full object-cover rounded-xl"
                    src={data.imagelink}
                />
            </div>

        </Link>
    )
}
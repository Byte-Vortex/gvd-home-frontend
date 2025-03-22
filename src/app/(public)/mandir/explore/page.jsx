import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";


export default async function Page() {
    const data = await makeRequestServer("/explore_temple/");

    return (
        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 space-y-12 py-12">
            <h1>{data.title}</h1>

            <ProseInnerHtmlContainer html={data.text} />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    data.cards.map((card, index) => (
                        <Card key={index} data={card} />
                    ))
                }
            </div>
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={data.id + "/"} className="bg-surface text-on-surface rounded-xl overflow-hidden gap-1 max-w-sm mx-auto w-full">

            <div className="relative w-full h-64 mb-2">
                <Image
                    fill
                    className="w-full h-full object-cover"
                    src={data.image}
                />
            </div>

            <h5 className="p-4 text-center">
                {data.title}
            </h5>
        </Link>
    )
}
import { Image } from "@/components/image";
import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";
import { VideoImageSliderTab } from "@/components/video-image-slider-tab";
import { ProseInnerHtmlContainer } from "@/components/prose-container";


export default async function Page() {
    const data = await makeRequestServer("/sp_theguru/");
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12 py-12">
            <h1>{data.title}</h1>

            <VideoImageSliderTab videoId={data.video} images={data.images} />
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
        <Link href={data.link} className="bg-surface text-on-surface rounded-xl p-4 gap-2 max-w-sm mx-auto w-full">

            <div className="relative w-full h-64 mb-2">
                <Image
                    fill
                    className="w-full h-full object-cover rounded-xl"
                    src={data.image}
                />
            </div>

            <h5>{data.title}</h5>
        </Link>
    )
}
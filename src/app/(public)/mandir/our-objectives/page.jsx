import { Image } from "@/components/image";
import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";
import { VideoImageSliderTab } from "@/components/video-image-slider-tab";
import { Button } from "@/components/ui/button";
import { ProseInnerHtmlContainer } from "@/components/prose-container";


export default async function Page() {
    const data = await makeRequestServer("/our_objective/");
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12 py-12">
            <h1>{data.title}</h1>

            <VideoImageSliderTab videoId={data.video} images={data.images} />
            <ProseInnerHtmlContainer html={data.text} />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    data.cards.map((card, index) => (
                        <Card key={index} data={card} />
                    ))
                }
            </div>

            <ProseInnerHtmlContainer html={data.after_cards_text} />
        </div>
    )
}

function Card({ data }) {
    return (
        <div href={data.link} className="bg-surface text-on-surface rounded-xl p-4 gap-1 max-w-sm mx-auto w-full space-y-2">
            <h5>{data.title}</h5>
            <p className="line-clamp-2">{data.text}</p>

            <Button asChild className="p-0" variant="link" >
                <Link href={data.link}>
                    Read More
                </Link>
            </Button>
            <div className="relative w-full h-56">
                <Image
                    fill
                    className="w-full h-full object-cover rounded-xl"
                    src={data.image}
                />
            </div>

        </div>
    )
}
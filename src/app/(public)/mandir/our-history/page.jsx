import { Image } from "@/components/image";
import { makeRequestServer } from "@/lib/fetch"
import { VideoImageSliderTab } from "@/components/video-image-slider-tab";
import { ProseInnerHtmlContainer } from "@/components/prose-container";


export default async function Page() {
    const data = await makeRequestServer("/our_history/");
    return (
        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 space-y-12 py-12">
            <h1>{data.title}</h1>

            <VideoImageSliderTab videoId={data.video} images={data.images} />
            <ProseInnerHtmlContainer html={data.text} />

            <div className="flex justify-center flex-wrap gap-x-6">
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

        <div className="h-auto z-0 relative flex flex-col">

            <div className="relative h-28 w-28 top-14 overflow-hidden mx-auto bg-surface rounded-full border-surface border-8 z-10">
                <Image
                sizes="240px"
                    fill
                    className="w-full h-full object-cover object-top"
                    src={data.image}
                />
            </div>

            <p className="bg-surface flex-grow text-on-surface rounded-xl p-4 gap-1 pt-20 pb-10 max-w-sm mx-auto w-full relative">{data.text}</p>
        </div>
    )
}
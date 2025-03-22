import { makeRequestServer } from "@/lib/fetch"
import { VideoImageSliderTab } from "@/components/video-image-slider-tab";
import { ProseInnerHtmlContainer } from "@/components/prose-container";


export default async function Page() {
    const data = await makeRequestServer("/our_mission/");
    return (
        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 space-y-12 py-12">
            <h1>{data.title}</h1>

            <VideoImageSliderTab videoId={data.video} images={data.images} />
            <ProseInnerHtmlContainer html={data.text} />

        </div>
    )
}
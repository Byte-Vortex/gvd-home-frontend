import clsx from "clsx";
import { Image } from "@/components/image";
import "./timeline.css";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { makeRequestServer } from "@/lib/fetch";
import { VideoImageSliderTab } from "@/components/video-image-slider-tab";
import { PhotoView } from "@/app/_providers/photo-provider";

export default async function Page() {

    const data = await makeRequestServer("/sp_milestonetimeline/");
    return (

        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 space-y-12 py-12">
            <h1>{data.title}</h1>

            <VideoImageSliderTab videoId={data.video} images={data.images} />
            <ProseInnerHtmlContainer html={data.text} />

            <div className="timeline">
                {data.cards.map((data, index) => (
                    <div
                        key={index}
                        className={clsx(
                            "timeline-container",
                            index % 2 ? "timeline-right" : "timeline-left"
                        )}
                    >
                        <div className="timeline-content shadow-md flex flex-col sm:flex-row bg-surface text-on-surface rounded-xl overflow-hidden min-h-[12rem]">
                            <PhotoView src={data.image}>
                                <div className="sm:min-h-full sm:max-w-[12rem] sm:min-w-[12rem] overflow-hidden rounded-xl relative h-[200px]">
                                    <Image
                                        sizes="200px"
                                        fill
                                        className="w-full object-cover"
                                        src={data.image}
                                    />
                                </div>
                            </PhotoView>

                            <div className="p-4 sm:pl-4 sm:p-2 flex flex-col gap-4 sm:gap-2">
                                <h3 className="text-primary text-xl font-semibold">
                                    {data.date}
                                </h3>

                                <ProseInnerHtmlContainer html={data.text} />

                                <Button asChild variant="link" className="p-0 max-w-max mt-auto">
                                    <Link href={data.link}>
                                        Read More
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

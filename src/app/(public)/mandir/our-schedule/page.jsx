import { Image } from "@/components/image";
import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";
import { VideoImageSliderTab } from "@/components/video-image-slider-tab";
import { Button } from "@/components/ui/button";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { DiscoverSection } from "../../_components/discover-section/discover-section";
import { ClockIcon } from "lucide-react";
import ScrollShadowWrapper from "@/components/scroll-shadow-container";


export default async function Page() {
    const data = await makeRequestServer("/our_schedule/");
    return (

        <div>
            <div className="max-w-[100vw] lg:px-32 mx-auto px-4 space-y-12 py-12">
                <h1>{data.title}</h1>
                <ProseInnerHtmlContainer html={data.text} />

                <div className="grid md:grid-cols-10 gap-12">

                    <div className="md:col-span-6">
                        <h3>{data.subtitle}</h3>
                        <ProseInnerHtmlContainer html={data.subtext} />

                        <div className="mt-8">
                            <h5>Today&apos;s Special Event</h5>

                            <div className="space-y-6 mt-4">
                                {
                                    data.special_events?.map((event, index) => (
                                        <div key={index} className="space-y-3">
                                            <h3>{event.main_title}</h3>
                                            <ProseInnerHtmlContainer html={data.text} />
                                            {event.button_text &&
                                                <Button asChild>
                                                    <Link href={event.link}>
                                                        {event.button_text}
                                                    </Link>
                                                </Button>
                                            }
                                        </div>
                                    ))
                                }

                            </div>


                        </div>

                    </div>


                    <ScrollShadowWrapper className="md:col-span-4 max-h-96 space-y-6 scrollbar-hide">
                        {
                            data.cards.map((card, index) => (
                                <div key={index} className="rounded-xl shadow-md px-4 py-6 bg-surface text-on-surface flex items-center gap-4">
                                    <div className="bg-primary text-on-primary size-10 rounded-full flex gap-4 items-center justify-center">
                                        <ClockIcon />
                                    </div>

                                    <div>
                                        <h5>{card.event}</h5>
                                        <div className="text-sub-text">{card.time}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </ScrollShadowWrapper>


                </div>
            </div>
            <DiscoverSection />
        </div>
    )
}
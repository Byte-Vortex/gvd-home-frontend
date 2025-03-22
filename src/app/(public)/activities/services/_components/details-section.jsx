"use client"
import { DecorationProp2 } from "@/components/misc/decoration-prop-2";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { useState } from "react";
import { Button } from "@/components/ui/button";


export function DetailsSection({ data }) {

    const [readMore, setReadMore] = useState(false);
    return (

        !!data && <div className="space-y-12">


            <h3 className="text-center">{data.title}</h3>
            <DecorationProp2 className="block mx-auto" />

            <div className="grid md:grid-cols-2 gap-8">
                <div className="w-full max-h-max my-auto overflow-hidden rounded-xl min-h-28 shadow-landing-primary/60 shadow-lg">
                    <div className='aspect-w-16 aspect-h-9 relative'>

                        <YouTubeEmbed
                            videoId={data.video}
                            className="w-full h-full"
                        />

                    </div>
                </div>

                <div className="flex flex-col gap-4 py-2">
                    <h4 className="font-bold text-3xl">
                        {data.subtitle}
                    </h4>

                    <ProseInnerHtmlContainer className={readMore || "line-clamp-4"} html={data.text} />
                    <Button onClick={() => setReadMore(state => !state)} className='px-0 inline py-0 h-min max-w-max text-on-background' variant="link">{readMore ? "Read Less" : "Read More"}</Button>
                </div>
            </div>

            <DecorationProp2 className="block mx-auto rotate-180" />
        </div>

    )
}

"use client"

import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { useMemo, useState } from "react";
import { PlayIcon } from "lucide-react";
import clsx from "clsx";

export function VideoSection({ data }) {

    const cardsMap = useMemo(() => {
        const map = new Map();
        data.cards.forEach((card, index) => {
            map.set(index, card);
        })

        return map;
    }, [data]);

    const [selected, setSelected] = useState(0);

    const selectedCard = cardsMap.get(selected);
    return (
        <div>

            <h3 className="text-3xl md:text-4xl font-bold">{data.title}</h3>
            <ProseInnerHtmlContainer html={data.text} />

            <div className="grid md:grid-cols-3 gap-4 mt-5">
                <div className="col-span-2 aspect-h-9 aspect-w-16 rounded-xl overflow-hidden">
                    <YouTubeEmbed id={selected} videoId={selectedCard.video} autoplay={false} />
                </div>

                <div className="space-y-2">

                    <h3 className="text-2xl  md:text-3xl font-bold">{selectedCard.title}</h3>
                    <p className="text-sm md:text-base">{selectedCard.text}</p>

                    <Button variant="link" className="p-0">
                        <Link href={selectedCard.link}>{selectedCard.buttonText}</Link>
                    </Button>
                </div>
            </div>

            <div className='mt-2 md:mt-6'>
                <Swiper
                    centeredSlides
                    centeredSlidesBounds
                    centerInsufficientSlides
                    spaceBetween={10}
                    modules={[Mousewheel, Keyboard]}
                    keyboard={{
                        enabled: true,
                    }}
                    mousewheel={{
                        forceToAxis: true,
                    }}
                    slidesPerView={"auto"}
                    // breakpoints={{
                    //     420: {
                    //         slidesPerView: 1.4
                    //     },
                    //     550: {
                    //         slidesPerView: 2.2
                    //     },
                    //     864: {
                    //         slidesPerView: 3.2
                    //     },
                    //     1100: {
                    //         slidesPerView: 4.2
                    //     }
                    // }}
                >


                    {
                        Array.from(cardsMap).map(([key, card]) => (
                            <SwiperSlide
                                key={key}
                                onClick={setSelected.bind(null, key)}
                                className="group cursor-pointer w-max"
                            >

                                <div className="grid sm:grid-cols-2 gap-2 w-48 sm:w-96 mx-auto">
                                    <div className={clsx("aspect-h-9 aspect-w-16 relative rounded-xl overflow-hidden border-2", selected === key ? "border" : "border-transparent")}>
                                        <Image
                                            unoptimized
                                            fill
                                            src={card.thumbnailURL}
                                            className="h-full w-full object-contain bg-black brightness-50 group-hover:brightness-100"
                                        />
                                        <PlayIcon className="fill-white text-white w-8 h-8 mx-auto my-auto" />
                                    </div>
                                    <div className="my-auto group-hover:text-primary">
                                        {card.title}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }


                </Swiper>
            </div>
        </div>
    )
}
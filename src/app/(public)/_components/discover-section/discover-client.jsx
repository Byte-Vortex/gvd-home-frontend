"use client"

import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mousewheel, Keyboard } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { SwiperPrevNavigationButton, SwiperNextNavigationButton } from "@/components/ui/swiper-buttons";
import { useRef } from "react";
import { isValidUrl } from "@/lib/utils";

export function DiscoverClient({ data }) {

    const sliderRef = useRef(null);
    return (


        <div className="space-y-12 sm:grid sm:grid-cols-3">


            <div className="px-4 max-h-max max-w-md ml-auto relative">
                <h3 className="sm:mt-16">{data.title}</h3>
                <p>{data.subtitle}</p>

                <div className="flex text-4xl mt-2 gap-2">
                    <SwiperPrevNavigationButton ref={sliderRef} className="h-12 w-12 text-xl" />
                    <SwiperNextNavigationButton ref={sliderRef} className="h-12 w-12 text-xl" />
                </div>

            </div>

            <div className="pl-4 sm:pl-0 pr-4 min-w-full sm:col-span-2 w-full">
                <Swiper
                    ref={sliderRef}
                    spaceBetween={15}
                    mousewheel={{
                        releaseOnEdges: true,
                        forceToAxis: true,
                    }}

                    slidesPerView={1.1}
                    keyboard={true}
                    modules={[Keyboard, Mousewheel]}

                    breakpoints={{
                        500: {
                            slidesPerView: "auto"
                        },
                    }}
                >
                    {
                        data.cards.map((card, index) => (
                            <SwiperSlide key={index} className="max-w-96">
                                <Link href={(isValidUrl(card.link) ? card.link : ("/" + card.link))} className="block group">
                                    <div className="rounded-xl overflow-hidden h-60 relative aspect-h-9 aspect-w-16 group-hover:brightness-75 duration-150">
                                        <Image fill className="object-cover" src={card.image} />
                                    </div>

                                    <h5 className="pl-4 mt-2 text-xl">{card.title}</h5>
                                    <Button variant="link" className="pl-4 text-base">
                                        {card.link_text}
                                    </Button>
                                </Link>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

            </div>
        </div>
    )
}
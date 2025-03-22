"use client"
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

export function ExploreTemple({ data }) {
    const [sliderMoved, setSliderMoved] = useState(false);
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl md:text-4xl">{data.title}</h2>
                <Button className="p-0" variant="link">
                    <Link href={"/mandir/explore"}>
                        View All
                    </Link>
                </Button>
            </div>

            <ProseInnerHtmlContainer html={data.text} />

            {/* <div className='overflow-hidden rounded-3xl'> */}
            <Swiper
                className="rounded-xl"
                spaceBetween={10}
                centeredSlidesBounds
                centeredSlides={sliderMoved}
                onSlideChange={setSliderMoved.bind(null, true)}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Keyboard]}
                keyboard={{
                    enabled: true,
                }}
                mousewheel={{
                    forceToAxis: true,
                }}
                slidesPerView={1.1}
                breakpoints={{
                    600: {
                        slidesPerView: 2.1
                    },
                    864: {
                        slidesPerView: 3.1
                    },
                    1100: {
                        slidesPerView: 4.1
                    }
                }}
            >


                {

                    data.cards.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Card data={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/* </div> */}
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={"/mandir/explore/" + data.id} className="bg-surface text-on-surface rounded-xl overflow-hidden block gap-1 w-full">

            <div className="relative w-full h-64">
                <Image
                sizes="400px"
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
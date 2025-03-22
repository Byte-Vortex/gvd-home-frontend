"use client"

import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export function GallerySection({ data }) {
    const [sliderMoved, setSliderMoved] = useState(false);
    return (
        <div>
            <div className="flex items-center justify-between">
                <h3 className='text-3xl md:text-4xl font-bold'>{data.title}</h3>
                <Button asChild variant="link" className="p-0" >
                    <Link href={"/mandir/gallery"}>
                        View All
                    </Link>
                </Button>
            </div>
            <ProseInnerHtmlContainer className="mb-5" html={data.text} />

            <div className='overflow-hidden rounded-xl'>
                <Swiper
                    centeredSlidesBounds
                    centeredSlides={sliderMoved}
                    onSlideChange={setSliderMoved.bind(null, true)}
                    spaceBetween={10}
                    modules={[Mousewheel, Keyboard]}
                    keyboard={{
                        enabled: true,
                    }}
                    mousewheel={{
                        forceToAxis: true,
                    }}
                    slidesPerView={1.2}
                    breakpoints={{
                        420: {
                            slidesPerView: 1.4
                        },
                        550: {
                            slidesPerView: 2.2
                        },
                        864: {
                            slidesPerView: 3.2
                        },
                        1100: {
                            slidesPerView: 4.2
                        }
                    }}
                >


                    {
                        data.cards.map((item, index) => (
                            <SwiperSlide key={index} className="rounded-xl overflow-hidden !h-auto">
                                <Link href={item.link} className="h-full flex flex-col">

                                    <div className="relative h-56">
                                        <Image
                                            sizes="400px"
                                            fill
                                            className="w-full h-full object-cover"
                                            src={item.image}
                                        />
                                    </div>

                                    <div className="p-4 bg-surface text-on-surface flex-grow flex flex-col">
                                        <h5>{item.title}</h5>
                                    </div>
                                </Link>

                            </SwiperSlide>
                        ))
                    }


                </Swiper>
            </div>
        </div>
    )
}
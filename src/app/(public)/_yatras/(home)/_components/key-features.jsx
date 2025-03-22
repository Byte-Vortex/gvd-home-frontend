"use client"

import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from '@/components/prose-container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRef } from 'react';
import { Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export function KeyFeatures({ data }) {

    const sliderRef = useRef(null);

    return (

        <section className="space-y-12">

            <div className='space-y-2 max-w-7xl mx-auto px-4'>
                <h3 className='font-medium mb-2'>{data.title}</h3>



                <ProseInnerHtmlContainer className='sm:prose-lg' html={data.description} />

            </div>


            <Swiper
                className="h-max !ease-linear"
                spaceBetween={10}
                mousewheel={{
                    releaseOnEdges: true,
                    forceToAxis: true,
                }}
                slidesPerView={1.2}
                keyboard
                modules={[Keyboard, Mousewheel]}
                centeredSlides
                breakpoints={{
                    560: {
                        slidesPerView: 2.1
                    },
                    840: {
                        slidesPerView: 3.1
                    },
                    1024: {
                        slidesPerView: 3.6
                    },
                    1536: {
                        slidesPerView: "auto"
                    }
                }}
            >

                {
                    data.cards.map((card, index) => (
                        <SwiperSlide className="!h-auto max-w-sm" key={index}>
                            <Card data={card} />
                        </SwiperSlide>
                    ))
                }

            </Swiper>

        </section>

    )
}

function Card({ data }) {
    return (
        <Link href={data.slug ?? ""} target="_blank" rel="noopener"  className="h-full py-6 px-4 border rounded-xl bg-white text-black flex flex-col">
            <h4 className='font-light mt-auto relative z-10 mb-2'>{data.title}</h4>
            <ProseInnerHtmlContainer className='font-light text-inherit' html={data.content} />

            <Separator className="mt-2 mb-6 bg-surface" />

            <div className='w-full mt-auto aspect-w-16 aspect-h-9 rounded-xl relative overflow-hidden'>
                <Image
                    fill
                    className="w-full h-full object-cover"
                    src={data.image} alt={data.title}
                />
            </div>

        </Link>
    )
}

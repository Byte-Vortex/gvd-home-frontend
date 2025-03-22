"use client"

import { Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNextNavigationButton, SwiperPrevNavigationButton } from '@/components/ui/swiper-buttons';
import { useRef } from 'react';
import { Image } from "@/components/image";


export function ImportanceSection({ data }) {

    const sliderRef = useRef(null);

    return (

        !!data?.cards?.length && <section className="space-y-12">

            <div className='flex items-center gap-2 ml-3'>
                <h3>{data.impcard_title}</h3>

                <SwiperPrevNavigationButton className="ml-auto" ref={sliderRef} />

                <SwiperNextNavigationButton ref={sliderRef} />

            </div>


            <Swiper
                centeredSlides
                centeredSlidesBounds
                ref={sliderRef}
                className="w-full flex flex-col relative rounded-xl"
                spaceBetween={10}
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
                        slidesPerView: 2
                    },
                    864: {
                        slidesPerView: 3
                    },
                    1100: {
                        slidesPerView: 3.4
                    }
                }}
            >

                {
                    data.cards?.map((cardData, index) => (
                        <SwiperSlide key={index} className='!h-auto'>
                            <Card data={cardData} />
                        </SwiperSlide>
                    ))

                }

            </Swiper>

        </section>

    )
}

function Card({ data }) {
    return (
        <div className="overflow-hidden rounded-xl h-full bg-surface text-on-surface">
            <div className="w-full aspect-h-2 aspect-w-3 relative">
                <Image
                    fill
                    className="rounded-xl h-full w-full object-cover"
                    src={data.imagelink} alt={data.title}
                />
            </div>
            <div className="space-y-4 p-4 w-full">
                <p className="text-primary font-semibold text-center">{data.title}</p>

                <div className="font-semibold text-sm text-sub-text text-center">
                    {data.subtitle}
                </div>

                <p className="text-justify">{data.text}</p>
            </div>
        </div>
    )
}

"use client"

import { Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNextNavigationButton, SwiperPrevNavigationButton } from '@/components/ui/swiper-buttons';
import { useRef } from 'react';
import { Image } from "@/components/image";
import Link from 'next/link';
import { ProseInnerHtmlContainer } from '@/components/prose-container';
import { IoIosArrowRoundForward as RightIcon } from "react-icons/io";
import { IoIosArrowRoundBack as LeftIcon } from "react-icons/io";


export function UpcomingDestinationsSection({ data }) {

    const sliderRef = useRef(null);

    return (

        <section className="space-y-8">

            <div className='space-y-2'>

                <div className='flex w-full justify-between gap-2'>
                    <h3 className='font-medium mb-2'>{data.title}</h3>


                    <SwiperPrevNavigationButton className="ml-auto flex bg-on-surface text-surface text-3xl h-max px-4 sm:px-6 py-1 w-auto border" ref={sliderRef} >
                        <LeftIcon />
                    </SwiperPrevNavigationButton>

                    <SwiperNextNavigationButton className="flex bg-on-surface text-surface text-3xl h-max px-4 sm:px-6 py-1 w-auto border" ref={sliderRef} >
                        <RightIcon />
                    </SwiperNextNavigationButton>
                </div>

                <ProseInnerHtmlContainer className='sm:prose-lg' html={data.description} />

            </div>


            <Swiper
                centeredSlides
                centeredSlidesBounds
                ref={sliderRef}
                className="w-full flex flex-col relative rounded-3xl h-[480px]"
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
                slidesPerView={"auto"}
            >

                {
                    data.cards?.map((cardData, index) => (
                        <SwiperSlide key={index} className='!h-auto w-72'>
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
        <Link href={data.slug ?? ""} className="h-full overflow-hidden rounded-3xl relative flex group duration-150">

            <Image
                fill
                className="rounded-3xl h-full w-full object-cover group-hover:brightness-75"
                src={data.image} alt={data.title}
            />
            <div className='bg-gradient-to-t from-black via-transparent to-transparent absolute w-full h-full' />

            <h4 className='text-light mt-auto relative z-10 text-white mb-8 text-xl px-4'>{data.name}</h4>
        </Link>
    )
}

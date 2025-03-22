"use client"

import 'swiper/css/effect-coverflow';

import React, { useEffect, useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import { SwiperNextNavigationButton, SwiperPrevNavigationButton } from '@/components/ui/swiper-buttons';
import quoteImage from "@/assets/images/misc/quote.svg"
import { EffectCoverflow, Keyboard, Mousewheel } from 'swiper/modules';
import clsx from 'clsx';
import { Image } from '@/components/image';
import { YouTubeEmbed } from '@/components/ui/youtube-embed';
export function TestimonialsSection({ data }) {


    const sliderRef = useRef(null);


    const sliderMap = useMemo(() => {
        const map = new Map();
        data.reviews.forEach((card, index) => {
            map.set(index, card);
        });
        return map;
    }, [data.reviews]);

    const [activeId, setActiveId] = useState(null);
    const activeSlide = sliderMap.get(activeId);


    return (


        <div>

            <h3 className='text-center font-bold mb-2 text-3xl md:text-4xl'>{data.title}</h3>
            <p className='text-center mb-5 text-sm md:text-base'>{data.text}</p>

            <div className='relative z-0'>

                <Swiper
                    centeredSlides
                    className='rounded-xl'
                    ref={sliderRef}
                    effect={'coverflow'}
                    grabCursor
                    loop
                    slidesPerView={'auto'}
                    mousewheel={{
                        forceToAxis: true,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 100,
                        depth: 200,
                        modifier: 2, // 2,3
                        slideShadows: false,
                    }}
                    modules={[EffectCoverflow, Keyboard, Mousewheel]}
                >
                    {
                        Array.from(sliderMap).map(([id, value]) => (
                            <SwiperSlide key={id} className='w-[90%] max-w-2xl'>
                                {({ isActive }) => (
                                    <SliderBox
                                        setActiveId={setActiveId}
                                        id={id}
                                        isActive={isActive}
                                        video={value.video}
                                        imageLink={value.videThumbnail}
                                    />
                                )}
                            </SwiperSlide>
                        ))

                    }
                </Swiper>

                <div className='bg-gradient-to-r from-background to-transparent w-6 absolute h-full top-0 -left-0.5 z-10' />

                <div className='bg-gradient-to-l from-background to-transparent w-6 absolute h-full top-0 -right-0.5 z-10' />

            </div>


            {activeSlide && <div className='relative'>

                <div className='h-full absolute top-0 left-0 z-10 flex items-center'>
                    <SwiperPrevNavigationButton className="relative" ref={sliderRef} />
                </div>
                <div className='h-full absolute top-0 right-0 z-10 flex items-center'>
                    <SwiperNextNavigationButton ref={sliderRef} />
                </div>

                <div className='flex flex-wrap md:flex-nowrap px-12 justify-between items-center gap-x-12 gap-y-0 md:gap-y-12 max-w-6xl mx-auto mt-12 flex-col-reverse md:flex-row'>


                    <div className='flex flex-col max-w-[15rem] min-w-[15rem] mx-auto justify-center gap-4 items-center text-xl'>

                        <Image
                            height={96}
                            width={96}
                            className='object-cover rounded-full shadow-md max-h-24 max-w-24 min-h-24 min-w-24'
                            src={activeSlide.image}
                            alt=""
                        />

                        <div className='text-lg flex flex-col text-center'>
                            <div>{activeSlide.name}</div>
                            <div className='text-sm'>{activeSlide.designation}</div>
                        </div>

                    </div>

                    <div className='flex-grow relative z-[0] min-h-[9rem] flex items-center justify-center'>


                        <p className='text-lg text-justify py-8'>
                            {activeSlide.text}
                        </p>

                        <Image
                            height={56}
                            width={56}
                            src={quoteImage}
                            className='absolute -left-6 -top-2'
                        />

                        <Image
                            height={56}
                            width={56}
                            src={quoteImage}
                            className='absolute -right-6 -bottom-2 rotate-180'
                        />
                    </div>

                </div>
            </div>

            }

        </div>
    )
}

function SliderBox({ video, imageLink, isActive, id, setActiveId }) {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isActive) setActiveId(id);
    }, [isActive, setActiveId, id])


    return (

        <div className='aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden'>


            <div className='w-full h-full bg-black flex items-center justify-center text-white select-none z-0'>
                <img loading='lazy' alt='' className={clsx("h-full w-full object-cover duration-300", !isActive && "brightness-50")} src={imageLink}
                />
            </div>

            {
                isActive && isMounted &&
                <YouTubeEmbed
                    videoId={video}
                    className={`w-full h-full absolute z-50`}
                />
            }



        </div>
    )
}
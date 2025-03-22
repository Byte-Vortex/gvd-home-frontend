"use client"

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs, Mousewheel } from 'swiper/modules';
import { Image } from '@/components/image';
import clsx from 'clsx';

export function ThumbSlider({ data }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className='space-y-4'>
            <div className='w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden'>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    loop
                    navigation
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
                    mousewheel={{
                        forceToAxis: true
                    }}
                    className="w-full h-full"
                >
                    {
                        data.map((src, index) => (
                            <SwiperSlide key={index} className='h-full w-full'>
                                <div className='relative h-full w-full'>
                                    <Image
                                        fill
                                        className='h-full w-full object-cover object-top'
                                        src={src}
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

            <Swiper
                onSwiper={setThumbsSwiper}
                loop
                spaceBetween={10}
                slidesPerView={'auto'}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
                mousewheel={{
                    forceToAxis: true
                }}
                className='h-24 !ease-linear'
            >

                {
                    data.map((src, index) => (
                        <SwiperSlide key={index} className='h-full rounded-md overflow-hidden w-40'>
                            {({ isActive }) => (
                                <div className={clsx('relative h-full w-full duration-150', !isActive && "opacity-40")}>
                                    <Image
                                        fill
                                        className='h-full w-full object-cover object-top'
                                        src={src}
                                    />
                                </div>
                            )}

                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
}

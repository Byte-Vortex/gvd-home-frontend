"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Mousewheel } from 'swiper/modules';
import Link from 'next/link';
import { Image } from "@/components/image";
import 'swiper/css/effect-fade';
import clsx from 'clsx';
import { useState } from 'react';
import Spinner from '@/components/ui/spinner';

export function HeroSection({ data }) {
    return (

        <section
            id="home"
            className="aspect-h-1 overflow-hidden aspect-w-[0.59] min-[767px]:aspect-w-[2.63]"
        >
            <Swiper
                className="w-full h-full rounded-b-3xl !ease-linear"
                spaceBetween={0}
                keyboard={true}
                lazyPreloadPrevNext={1}
                mousewheel={{
                    forceToAxis: true
                }}
                modules={[Autoplay, Keyboard, Mousewheel]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    waitForTransition: true,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: true

                }}
            >

                {
                    data.map((item, index) => (

                        <SwiperSlide key={index} className='h-full w-full'>
                            <Slide item={item} index={index} />
                            {index && <Spinner className="swiper-lazy-preloader border-on-background" />}
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </section>
    )
}

function Slide({ item, index }) {

    const [imageLoaded, setImageLoaded] = useState(index === 0);
    return (
        <Link href={item.link} className={clsx('h-full w-full block relative duration-300', !imageLoaded && "opacity-0")}>

            <picture>
                <source media="(max-width: 767px)" srcSet={item.mobile_image} />
                <source srcSet={item.desktop_image} />

                <Image
                    onLoad={setImageLoaded.bind(null, true)}
                    loadingAnimation={false}
                    fill
                    priority={index === 0}
                    className='w-full h-full object-cover'
                    src={item.desktop_image}
                />

            </picture>

        </Link>
    )
}
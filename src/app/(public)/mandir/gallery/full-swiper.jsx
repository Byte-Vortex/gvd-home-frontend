"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel } from 'swiper/modules';
import { Image } from '@/components/image';

export function FullSwiper({ highlightedImages }) {
    return (
        <div className='overflow-hidden relative z-[0] pt-[50px]'>

            <div className='absolute w-[100vw] h-full'>
                <div className='bg-background w-[90%] scale-125 mx-auto  h-[100px] rounded-[50%] absolute -top-12 left-0 z-[2]' />
                <div className='bg-background w-[90%] scale-125 mx-auto  h-[100px] rounded-[50%] absolute bottom-4 left-0 z-[2]' />
            </div>

            <Swiper
                className="relative h-[60vh] md:h-[80vh] z-[1]"
                loop={true}
                // cssMode={true}
                spaceBetween={10}
                slidesPerView={1.1}
                breakpoints={{
                    512: {
                        slidesPerView: 1.5,
                        spaceBetween: 30
                    },
                }}
                centeredSlides={true}
                mousewheel={{
                    forceToAxis: true,

                }}
                keyboard={true}
                modules={[Keyboard, Mousewheel]}
            // slidesPerView={"auto"}
            >

                {
                    highlightedImages.map((imageLink, index) => (
                        <SwiperSlide key={index} className="h-full">
                            <div className='w-full h-full relative'>
                                <Image fill className='h-full w-full object-cover' src={imageLink} alt="" />
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>


        </div>
    )
}
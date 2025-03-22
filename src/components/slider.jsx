"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Image } from "./image";
import 'swiper/css/pagination';

export function Slider({ slides, className = "" }) {
    return (


        <Swiper
            className="w-full h-full swiper-bullet-active:!bg-primary swiper-bullet:opacity-100 swiper-bullet:bg-white swiper-bullet:w-4 swiper-bullet-active:!w-8 swiper-bullet:!rounded-md"
            spaceBetween={0}
            keyboard={true}
            mousewheel={{
                forceToAxis: true,
            }}
            pagination={{
                enabled: true,
                clickable: true
            }}
            modules={[Keyboard, Mousewheel, Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 3000,
                waitForTransition: true,
                pauseOnMouseEnter: true,
                disableOnInteraction: false

            }}
        >

            {
                slides.map((slide, index) => (

                    <SwiperSlide key={index} className='min-h-full h-full w-full relative'>
                        <Image fill className="w-full h-full object-cover" src={slide} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
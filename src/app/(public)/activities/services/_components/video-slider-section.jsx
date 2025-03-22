"use client"

import { Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperNextNavigationButton, SwiperPrevNavigationButton } from '@/components/ui/swiper-buttons';
import { useRef } from 'react';
import { ProseInnerHtmlContainer } from '@/components/prose-container';
import { YouTubeEmbed } from '@/components/ui/youtube-embed';


export function VideoSliderSection({ data }) {

    const sliderRef = useRef(null);

    return (

        !!data?.cards?.length && <section>

            <div className='flex items-center gap-2'>
                <h3>{data.title}</h3>

                <SwiperPrevNavigationButton className="ml-auto" ref={sliderRef} />

                <SwiperNextNavigationButton ref={sliderRef} />

            </div>

            <ProseInnerHtmlContainer html={data.text} className='mb-8' />


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
                    data.cards?.map((card, index) => (
                        <SwiperSlide key={index} className='!h-auto'>
                            {/* <Card data={cardData} /> */}
                            <div className='aspect-w-16 aspect-h-9 rounded-xl overflow-hidden'>
                                <YouTubeEmbed videoId={card.url} />
                            </div>
                            <div className='px-4 text-lg font-bold mt-1'>{card.title}</div>
                        </SwiperSlide>
                    ))

                }

            </Swiper>

        </section>

    )
}
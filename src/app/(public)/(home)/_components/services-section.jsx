"use client"
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

export function ServicesSection({ data }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <h2>{data.title}</h2>
                <Button className="p-0" variant="link">
                    <Link href={"/mandir/explore"}>
                        View All
                    </Link>
                </Button>
            </div>

            <ProseInnerHtmlContainer html={data.text} />

            {/* <div className='overflow-hidden rounded-3xl'> */}
            <Swiper
                centeredSlides
                centeredSlidesBounds
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
                slidesPerView="auto"
            >


                {

                    data.cards.map((item, index) => (
                        <SwiperSlide key={index} className="w-56">
                            <Card data={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/* </div> */}
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={"/mandir/services/" + data.id} className="block h-full">

            <div className="flex items-center justify-center overflow-hidden rounded-3xl bg-surface">
                <div className="w-full h-56 relative">
                    <Image
                        fill
                        className="w-full h-full object-cover"
                        src={data.image}
                    />
                </div>
            </div>

            <h5 className="mt-2 text-center">
                {data.title}
            </h5>
        </Link>
    )
}
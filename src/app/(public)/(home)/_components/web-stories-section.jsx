"use client"
import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

export function WebStoriesSection({ data }) {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-3xl md:text-4xl font-bold">{"Web Stories"}</h3>
                <Button className="p-0" variant="link">
                    <Link href={"/web-stories"}>
                        View All
                    </Link>
                </Button>
            </div>

            {/* <div className='overflow-hidden rounded-3xl'> */}
            <Swiper
                centeredSlides
                centeredSlidesBounds
                className="w-full flex flex-col relative rounded-xl h-[480px]"
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
                    data?.webstories.map((cardData, index) => (
                        <SwiperSlide key={index} className='!h-auto w-72'>
                            <Card data={cardData} />
                        </SwiperSlide>
                    ))

                }

            </Swiper>
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={"/web-stories/" + data.slug + "/"} className="h-full overflow-hidden rounded-xl relative flex group duration-150">

            <Image
                fill
                className="rounded-xl h-full w-full object-cover group-hover:brightness-75"
                src={data.first_post.image} alt={data.first_post.image_alt}
            />
            <div className='bg-gradient-to-t from-black via-black/30 to-transparent absolute w-full h-full' />
            <div className="mt-auto relative z-10 text-white mb-4 px-4">
                <h4 className='text-xl mb-2'>{data.first_post.title}</h4>
                <div>{format(new Date(data.first_post.created_at), 'MMM d, yyyy')}</div>
            </div>
        </Link>
    )
}
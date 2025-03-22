"use client"

import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function CategoriesSection({ data }) {
    return (
        <div className="space-y-16 mx-auto">
            {
                data.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 gap-6">
                        <div  className="flex justify-between items-center gap-6 max-w-7xl w-full mx-auto">
                            <h3 className="text-2xl">{item.title}</h3>
                            <Button variant="secondary" className="rounded-lg w-full max-w-max" asChild>
                                <Link href={"./categories/" + item.slug + "/"}>
                                    View All
                                </Link>
                            </Button>
                        </div>
                        <Swiper
                            className="w-full"
                            spaceBetween={10}
                            centeredSlidesBounds
                            centeredSlides
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
                                640: {
                                    slidesPerView: 3.2
                                },
                                992: {
                                    slidesPerView: 4.2
                                },
                            }}
                        >


                            {

                                item.blogs.map((item, index) => (
                                    <SwiperSlide className="!h-auto" key={index}>
                                        <Card data={item} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                ))
            }
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={data.slug + "/"} className="flex min-h-[268px] flex-col bg-surface justify-between text-on-surface rounded-xl overflow-hidden w-full group hover:bg-primary hover:text-on-primary duration-150">
            <div className="px-4 py-4">
                <div className="text-sm text-sub-text group-hover:text-on-primary font-semibold">{format(new Date(data.updated_at), 'MMM d, yyyy')}&nbsp;.<span className="text-primary group-hover:text-on-primary px-1">{data.author}</span></div>
                <p className="line-clamp-2">
                    {data.title}
                </p>
            </div>

            <div className="group-hover:scale-105 duration-150 relative w-full">
                <Image
                    width={290}
                    height={193}
                    className="max-w-full h-auto object-contain w-full"
                    src={data.imageLink}
                />
            </div>
        </Link>
    )
}
"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules"
import { Image } from "@/components/image"
import { ProseInnerHtmlContainer } from "@/components/prose-container"
import { Button } from "@/components/ui/button"
import BlogTag from "./blog-tag"
import Link from "next/link"
import "swiper/css/pagination"
import { format } from "date-fns"

export function HeroSection({ data }) {
  return (
    <div className="relative z-0">
      <Swiper
        className="w-full h-full relative rounded-xl overflow-hidden"
        spaceBetween={0}
        keyboard={true}
        mousewheel={{
          forceToAxis: true,
        }}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        modules={[Keyboard, Mousewheel, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 7000,
          waitForTransition: true,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
      >
        {data.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="!h-auto grid lg:grid-cols-10 gap-8"
          >
            <div className=" col-span-6 w-full max-w-xl mx-auto lg:max-w-full">
              <div className="w-full aspect-h-9 aspect-w-16 rounded-xl overflow-hidden">
                <Link href={slide.slug + "/"}>
                  <Image
                    fill
                    className="w-full h-full object-cover"
                    src={slide.imageLink}
                  />
                </Link>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="flex flex-wrap text-sm gap-2">
                {slide.tags.map((tag, index) => ( 
                    <BlogTag data={tag} key={index}></BlogTag>
                ))}
              </div>
              <h2 className="text-4xl">
                <Link
                  href={slide.slug + "/"}
                  className="hover:text-primary hover:underline"
                >
                  {slide.title}
                </Link>
              </h2>
              <div className="flex gap-2 items-center">
                <div className="relative w-8 h-8">
                  <Image
                    src={slide.author_image}
                    alt={slide.author}
                    fill
                    className="object-cover w-full h-full object-top rounded-full"
                  />
                </div>
                {slide.author}
              </div>
              <Link href={slide.slug + "/"}>
                <ProseInnerHtmlContainer
                  html={slide.summary}
                  className="line-clamp-2"
                />
              </Link>
              <span>{format(new Date(slide.updated_at), "MMM d, yyyy")}</span>

              <Button asChild variant="link" className="block p-0">
                <Link href={slide.slug + "/"}>Read More</Link>
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute -left-3 top-0 h-full w-6 bg-gradient-to-r from-background to-transparent z-50 pointer-events-none hidden sm:block" />

      <div className="absolute -right-3 top-0 h-full w-6 bg-gradient-to-l from-background to-transparent z-50 pointer-events-none hidden sm:block" />
    </div>
  )
}

"use client"

import { Image } from "@/components/image"
import { ProseInnerHtmlContainer } from "@/components/prose-container"
import { Mousewheel, Keyboard } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ActivitiesSection({ data }) {
  return (
    <div>
      <h3 className="text-3xl md:text-4xlmb-2 font-bold">{data.title}</h3>
      <ProseInnerHtmlContainer className="mb-5 mt-2" html={data.text} />

      <div className="overflow-hidden rounded-xl">
        <Swiper
          sizes="400px"
          centeredSlides
          centeredSlidesBounds
          spaceBetween={10}
          modules={[Mousewheel, Keyboard]}
          keyboard={{
            enabled: true,
          }}
          mousewheel={{
            forceToAxis: true,
          }}
          slidesPerView={1.1}
          breakpoints={{
            700: {
              slidesPerView: 2.1,
            },
            1000: {
              slidesPerView: 3.2,
            },
          }}
        >
          {data.cards.map((item, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div className="h-full flex flex-col rounded-xl overflow-hidden p-4 bg-surface">
                <h4 className="font-bold">{item.title}</h4>
                <ProseInnerHtmlContainer
                  html={item.text}
                  className="mb-4 mt-1 line-clamp-3 sm:!prose-sm min-h-[72px]"
                />

                <div className="relative w-full rounded-xl overflow-hidden mb-2">
                  <Image
                    width={351}
                    height={234}
                    className="w-full h-auto"
                    src={item.image}
                  />
                </div>

                <ul className="space-y-1">
                  {item.links.map((item, index) => (
                    <li id={index} key={index} className="group">
                      <Button
                        asChild
                        variant="link"
                        className="p-0 w-full text-left flex justify-start rounded-none h-max border-b py-1 hover:no-underline hover:border-primary text-on-surface hover:text-primary"
                      >
                        <Link href={item.link}>{item.title}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

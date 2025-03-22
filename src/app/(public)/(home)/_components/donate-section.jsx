"use client"

import { Image } from "@/components/image"
import { ProseInnerHtmlContainer } from "@/components/prose-container"
import { Mousewheel, Keyboard } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DecorationProp1 } from "@/components/misc/decoration-prop-1"
import { useState } from "react"

export function DonateSection({ data }) {
  const [sliderMoved, setSliderMoved] = useState(false)
  return (
    <div className="mt-12 md:mt-16 mb-12 md:mb-16 relative pb-12 md:pb-16 bg-donate-section-pattern bg-no-repeat bg-cover bg-center-top">

      <div className="max-w-7xl mx-auto px-4 pt-24">
        <h3 className="text-center font-bold mb-4">{data.title}</h3>
        <ProseInnerHtmlContainer
          className="text-center !max-w-3xl mx-auto min-w-[initial] mb-4"
          html={data.text}
        />

        <DecorationProp1 className="mb-12" />

        <Swiper
          centeredSlidesBounds
          centeredSlides={sliderMoved}
          onSlideChange={setSliderMoved.bind(null, true)}
          className="rounded-xl"
          spaceBetween={10}
          modules={[Mousewheel, Keyboard]}
          keyboard={{
            enabled: true,
          }}
          mousewheel={{
            forceToAxis: true,
          }}
          slidesPerView={1.2}
          breakpoints={{
            420: {
              slidesPerView: 1.4,
            },
            550: {
              slidesPerView: 2.2,
            },
            864: {
              slidesPerView: 3.2,
            },
            1100: {
              slidesPerView: 4.2,
            },
          }}
        >
          {data.cards.map((item, index) => (
            <SwiperSlide
              key={index}
              className="rounded-xl overflow-hidden !h-auto flex flex-col"
            >
              <div className="relative h-56">
                <Image
                  sizes="400px"
                  className="w-full h-full object-cover"
                  fill
                  src={item.image}
                />
              </div>

              <div className="p-4 bg-surface text-on-surface flex-grow flex flex-col">
                <h5 className="mb-2">{item.title}</h5>
                <Button className="w-full py-6 mt-auto rounded-xl" size="sm" asChild>
                  <Link href={item.link}>Donate</Link>
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

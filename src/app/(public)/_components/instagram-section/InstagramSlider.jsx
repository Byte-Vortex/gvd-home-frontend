"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel } from "swiper/modules";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

function InstagramSlider({ imagesData }) {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (sliderRef.current && sliderRef.current.swiper) {
            sliderRef.current.swiper.autoplay.start();
          }
        } else {
          if (sliderRef.current && sliderRef.current.swiper) {
            sliderRef.current.swiper.autoplay.stop();
          }
        }
      },
      {
        threshold: 0.5, // Adjust as needed
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      // Important: Stop autoplay on unmount to prevent memory leaks
      if (sliderRef.current && sliderRef.current.swiper) {
        sliderRef.current.swiper.autoplay.stop();
      }
    };
  }, []);
  return (
    <div ref={sectionRef} className="pb-12 md:pb-16">
      <Swiper
        className="rounded-xl"
        slidesPerView={2}
        ref={sliderRef}
        mousewheel={{
          forceToAxis: true,
        }}
        keyboard={true}
        modules={[Keyboard, Mousewheel, Autoplay]}
        loop={true}
        gap={0}
        autoplay={{
          delay: 4000,
          waitForTransition: true,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {imagesData.map((item, index) => {
          return (
            <SwiperSlide key={item.id} className="relative group">
              <Link
                className="aspect-w-4 aspect-h-5 z-0 w-full relative block"
                href={item.permalink}
                target="_blank"
              >
                <Image
                  fill
                  src={item.media_url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <div className="text-white hidden group-hover:flex items-center space-x-4">
                    {" "}
                    {/* Flex for icons and text */}
                    <div className="flex items-center">
                      <Heart className="h-5 w-5" fill="white" />{" "}
                      {/* Like icon */}
                      <span className="ml-1">{item.like_count}</span>{" "}
                      {/* Like count */}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle
                        className="h-5 w-5 scale-x-[-1]"
                        fill="white"
                      />{" "}
                      {/* Comment icon */}
                      <span className="ml-1">{item.comments_count}</span>{" "}
                      {/* Comment count */}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
        {imagesData.map((item, index) => {
          return (
            <SwiperSlide key={item.id} className="relative group">
              <Link
                className="aspect-w-4 aspect-h-5 z-0 w-full relative block"
                href={item.permalink}
              >
                <Image
                  fill
                  src={item.media_url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="text-white hidden group-hover:flex items-center space-x-4">
                    {" "}
                    {/* Flex for icons and text */}
                    <div className="flex items-center">
                      <Heart className="h-5 w-5" fill="white" />{" "}
                      {/* Like icon */}
                      <span className="ml-1">{item.like_count}</span>{" "}
                      {/* Like count */}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle
                        className="h-5 w-5 scale-x-[-1]"
                        fill="white"
                      />{" "}
                      {/* Comment icon */}
                      <span className="ml-1">{item.comments_count}</span>{" "}
                      {/* Comment count */}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default InstagramSlider;

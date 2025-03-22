"use client"

import { forwardRef, useCallback, useState, useEffect } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { cn } from "@/lib/utils";


export const SwiperPrevNavigationButton = forwardRef(({ children, className, ...rest }, ref) => {
    const sliderRef = ref;
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
        //eslint-disable-next-line
    }, [sliderRef.current]);



    const [hidden, setHidden] = useState();





    useEffect(() => {
        if (!sliderRef.current) return;

        const swiper = sliderRef.current.swiper;

        setHidden(swiper.isBeginning);
        swiper.on("activeIndexChange", (swiper) => {
            setHidden(swiper.isBeginning);
        })
        //eslint-disable-next-line
    }, [sliderRef.current?.swiper]);

    return (
        <div className={cn("cursor-pointer flex items-center justify-center text-lg text-on-surface", className, hidden && "opacity-0")} onClick={handlePrev} {...rest}>
            {children ? children : <IoChevronBack className="mr-0.5" />}
        </div>
    )
});

SwiperPrevNavigationButton.displayName = "SwiperPrevNavigationButton";


export const SwiperNextNavigationButton = forwardRef(({ children, className, ...rest }, ref) => {

    const sliderRef = ref;

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
        //eslint-disable-next-line
    }, []);

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (!sliderRef.current) return;

        const swiper = sliderRef.current.swiper;

        setHidden(swiper.isEnd);
        swiper.on("activeIndexChange", (swiper) => {
            setHidden(swiper.isEnd);
        })
        //eslint-disable-next-line
    }, [sliderRef.current?.swiper]);

    return (
        <div className={cn("cursor-pointer flex items-center justify-center text-lg text-on-surface", className, hidden && "opacity-0")} onClick={handleNext} {...rest}>
            {children ? children : <IoChevronForward className="ml-0.5" />}
        </div>
    )
});

SwiperNextNavigationButton.displayName = "SwiperNextNavigationButton";
"use client"

import { useEffect, useRef, useState } from 'react'
export function ScrollShadowWrapper({ children, className = '', style = {} }) {


    const [scrollTop, setScrollTop] = useState(0)
    const [scrollHeight, setScrollHeight] = useState(0)
    const [clientHeight, setClientHeight] = useState(0)

    const onScrollHandler = (event) => {
        setScrollTop(event.currentTarget.scrollTop)
        setScrollHeight(event.currentTarget.scrollHeight)
        setClientHeight(event.currentTarget.clientHeight)
    }

    const wrapperRef = useRef(null)

    useEffect(() => {
        const resetRefSizes = (ref) => {
            if (!ref.current) return

            setScrollTop(ref.current.scrollTop)
            setScrollHeight(ref.current.scrollHeight)
            setClientHeight(ref.current.clientHeight)
        }

        resetRefSizes(wrapperRef)
    }, [wrapperRef?.current?.clientHeight, wrapperRef])

    const getVisibleSides = () => {
        const isBottom = clientHeight === scrollHeight - scrollTop
        const isTop = scrollTop === 0
        const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop

        return {
            top: (isBottom || isBetween) && !(isTop && isBottom),
            bottom: (isTop || isBetween) && !(isTop && isBottom),
        }
    }

    return (
        <div
            ref={wrapperRef}
            style={style}
            className={`relative overflow-y-auto ${className}`}
            onScroll={onScrollHandler}
        >
            <div
                // style={{
                //     backgroundImage: "radial-gradient(farthest-side at 50% 0%, rgba(150, 150, 150, 0.4) 0%, rgba(0, 0, 0, 0) 100%)"
                // }}
                className={`pointer-events-none sticky -top-1 left-0 h-8 w-full transition-opacity duration-300 bg-gradient-to-b from-background to-transparent ${getVisibleSides().top ? 'opacity-100' : 'opacity-0'
                    }`}
            />
            {children}
            <div
                // style={{
                //     backgroundImage: "radial-gradient(farthest-side at 50% 100%, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)"
                // }}
                className={`pointer-events-none sticky -bottom-1 h-8 w-full bg-gradient-to-t from-background to-transparent transition-opacity duration-300 ${getVisibleSides().bottom ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </div>
    )
}

export default ScrollShadowWrapper
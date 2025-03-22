
"use client"
import Spinner from "@/components/ui/spinner"
import React from "react"
import { PhotoProvider as ReactPhotoProvider, PhotoView as ReactPhotoView } from "react-photo-view"

export function PhotoProvider({ children }) {
    return (
        <ReactPhotoProvider
            loadingElement={<Spinner className="swiper-lazy-preloader border-on-background w-8 h-8" />}
        >
            {children}
        </ReactPhotoProvider>
    )
}

export function PhotoView({ children, src, ...props }) {
    return <ReactPhotoView src={src} {...props}>

        {
            React.cloneElement(children, {
                ...children.props,
                className: `__viewer ${children.props.className || ""}`
            })
        }
    </ReactPhotoView>
}
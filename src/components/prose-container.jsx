"use client"


import { cn } from "@/lib/utils";
import { useEffect } from 'react';
import { PhotoSlider } from "react-photo-view";
import { useState } from "react";

export function ProseInnerHtmlContainer({ html, className = "" }) {

    const [images, setImages] = useState([]);
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(null);


    useEffect(() => {

        const obj = {};

        const images = document.querySelectorAll(`img.__viewer`);

        setImages(
            Array.from(images).map((img, index) => {
                const src = img.getAttribute('src');
                obj[src] = index;
                return {
                    key: "__viewer" + index,
                    src,
                }
            })
        )


        function handleWindowClick(e) {
            const target = e.target;
            if (target.tagName === 'IMG' && target.classList.contains('__viewer')) {
                setIndex(obj[target.getAttribute('src')]);
                setVisible(true);
            }
        }

        window.addEventListener('click', handleWindowClick)


        return () => {
            window.removeEventListener('click', handleWindowClick)
        };
    }, []);

    return (
        <>
            <div
                className={cn("prose prose-sm md:prose-base min-w-full text-on-background", className)}
                dangerouslySetInnerHTML={{ __html: html }}
            />
            <PhotoSlider index={index} onIndexChange={(index) => setIndex(index)} images={images} visible={visible} onClose={() => setVisible(false)} />
        </>
    )
}

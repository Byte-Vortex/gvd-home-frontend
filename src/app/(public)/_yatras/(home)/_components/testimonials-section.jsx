"use client"

import { Image } from "@/components/image"
import { ProseInnerHtmlContainer } from "@/components/prose-container"
import Ratings from "@/components/ui/ratings"
import { ShowMoreFadeContainer } from "@/components/ui/show-more-fade-container"
import { useEffect, useState } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export function TestimonialsSection({ data }) {

    const [mounted, setMounted] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    return (

        <section>
            <h3 className="mb-12 text-center font-normal">{data.title}</h3>
            <ShowMoreFadeContainer isShowMoreVisible={data.cards.length > 6} showMore={showMore} setShowMore={setShowMore}>
                {mounted && <ResponsiveMasonry
                    columnsCountBreakPoints={{
                        400: 1,
                        600: 2,
                        1024: 3,
                    }}>
                    <Masonry gutter="2rem">
                        {
                            data.cards.map((card, index) => (index < 6 || showMore) && <Card data={card} key={index} />)
                        }
                    </Masonry>

                </ResponsiveMasonry>
                }
            </ShowMoreFadeContainer>
        </section>
    )
}

function Card({ data }) {
    return (
        <div className="rounded-3xl p-4 sm:p-8 border-on-surface bg-surface text-on-surface border space-y-4 max-w-sm mx-auto">
            {/* <Ratings
                value={data.rating}
                variant="yellow"
            /> */}
            <ProseInnerHtmlContainer html={data.content} />

            <div className="flex gap-2">
                <div className="h-16 w-16 rounded-full border-primary border relative overflow-hidden">
                    <Image
                        fill
                        className="w-full h-full object-cover"
                        src={data.image}
                        alt={data.name}
                    />
                </div>
                <div className="font-light text-sm">{data.name}</div>
            </div>
        </div>
    )
}
"use client"

import { Image } from "@/components/image"

import { format } from "date-fns";
import Link from "next/link"
import { useState } from "react";
import { ShowMoreFadeContainer } from "@/components/ui/show-more-fade-container";

export function RecentBlogs({ data }) {

    const [showMore, setShowMore] = useState(false);

    return (
        <div>
            <h3 className="mb-4">Recent Blogs</h3>
            <ShowMoreFadeContainer isShowMoreVisible={data.length >= 6} showMore={showMore} setShowMore={setShowMore}>

                <div className="grid sm:grid-cols-2 gap-6">
                    {
                        data.map((item, index) => {
                            return index < 6 || showMore ? <Card key={index} data={item} /> : null
                        })
                    }
                </div>


            </ShowMoreFadeContainer>
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={"/blogs/" + data.slug} className="bg-surface text-on-surface rounded-lg overflow-hidden w-full grid md:grid-cols-3 p-4 gap-4 max-w-md mx-auto group hover:bg-primary hover:text-on-primary duration-150">
            <div className="md:col-span-2 md:min-h-28">
                <div className="text-sm text-sub-text group-hover:text-on-primary font-semibold">{format(new Date(data.updated_at), 'MMM d, yyyy')}&nbsp;.<span className="text-primary group-hover:bg-on-primary px-1">{data.author}</span></div>
                <p className="line-clamp-3">
                    {data.title}
                </p>
            </div>

            <div className="relative w-full h-max overflow-hidden aspect-w-4 aspect-h-3 rounded-lg mt-auto">
                <Image
                    sizes="200px"
                    fill
                    className="w-full h-full object-cover"
                    src={data.imageLink}
                />
            </div>
        </Link>
    )
}


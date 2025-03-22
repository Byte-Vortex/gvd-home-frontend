"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YouTubeEmbed } from "./ui/youtube-embed";
import { cn } from "@/lib/utils";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

const Slider = dynamic(() => import("@/components/slider").then(mod => mod.Slider), { ssr: false, loading: () => <Skeleton className={"w-full h-full"} /> });

export function VideoImageSliderTab({ videoId, images, className = "" }) {


    const [tab, setTab] = useState("video");

    if (!videoId && (!images || !images.length)) return null;

    if (!videoId) {
        <Slider slides={images} />
    }

    return (
        <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="gap-1">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>

            {tab === "video" ? <TabsContent value="video" className="max-w-6xl mx-auto">
                <div className={cn("rounded-xl aspect-w-16 aspect-h-9 overflow-hidden elevation-2", className)}>
                    <YouTubeEmbed videoId={videoId} className="w-full h-full" />
                </div>
            </TabsContent>
                :
                <TabsContent value="images" className="max-w-6xl mx-auto">
                    <div className={cn("rounded-xl aspect-w-16 aspect-h-9 overflow-hidden elevation-2", className)}>

                        <Slider slides={images} />
                    </div>
                </TabsContent>
            }

        </Tabs>

    )
}
"use client"
import { cn } from "@/lib/utils";
import { YouTubeEmbed as YoutubeEmbedNext } from "@next/third-parties/google";

export function YouTubeEmbed({
    videoId,
    className = "",
    params = "",
    loading = "lazy",
    autoplay = false,
    ...props
}) {
    const defaultParams = `showinfo=0&playlist=${videoId}&loop=1&mute=1&rel=0`;
    params = params || defaultParams;
    return (


        autoplay ?

            <iframe
                loading={loading}
                className={cn("bg-black", className)}
                src={"https://www.youtube.com/embed/" + videoId + "?" + "autoplay=1&" + params}
                title="YouTube video player"
                allow="accelerometer; autoplay; muted; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                {...props}
            />

            :

            <YoutubeEmbedNext
                title=""
                params={params}
                videoid={videoId}
                style='min-width:100%;max-width:100%;height:100%;background-color:black !important'
            />



    )
}
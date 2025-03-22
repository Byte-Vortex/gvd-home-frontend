"use client"

import { Button } from "@/components/ui/button"
import { Share2Icon } from "lucide-react"

export function ShareButton() {
    return (
        <Button className="text-sm gap-1" variant="ghost" onClick={() => navigator.share(window.location.href)}>
            <Share2Icon className="size-4" />
            Share
        </Button>
    )
}
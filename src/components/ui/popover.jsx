"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverArrow = PopoverPrimitive.Arrow

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = ({ className, align = "center", sideOffset = 4, children, ...props }) => {
    return (<PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            align={align}
            sideOffset={sideOffset}
            collisionPadding={8}
            className={cn(
                "z-50 w-full max-w-[96vw] mx-auto rounded-md border bg-surface p-4 text-on-surface shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        >
            {children}
        </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
    )
}
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverArrow }

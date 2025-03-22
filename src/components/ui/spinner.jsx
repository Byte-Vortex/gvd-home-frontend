import { cn } from "@/lib/utils"

export default function Spinner({ className }) {
    return (
        <div className={cn("animate-spin border-[2px] border-t-0 border-primary h-6 w-6 duration-500 rounded-full", className)} />
    )
}

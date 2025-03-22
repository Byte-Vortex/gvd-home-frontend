"use client"
import useIsTempleOpen from "@/hooks/use-is-temple-open";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

export function TempleTime() {
    const { isTempleOpen, timeRange, closedTimeRange } = useIsTempleOpen();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;

    return (
        <div className="group text-xs font-semibold rounded-xl py-2 px-6 bg-on-primary/90 hover:bg-[#e4dcfa] text-primary duration-150 flex gap-2 items-center ">
            <div className={clsx("w-2 h-2 rounded-xl", isTempleOpen ? "bg-green-600" : "bg-red-500")}>
                <div className="w-full h-full rounded-full animate-ping bg-inherit"></div>
            </div>
            <span> {isTempleOpen ? "Darshan Open" : "Darshan Closed"}</span>
            {
                isTempleOpen &&
                <span>
                    {`${timeRange.start.hoursString}:${timeRange.start.minutesString} - ${timeRange.end.hoursString}:${timeRange.end.minutesString}`}
                </span>
            }
            {
                !isTempleOpen &&
                <span>
                    {`${closedTimeRange.start.hoursString}:${closedTimeRange.start.minutesString} - ${closedTimeRange.end.hoursString}:${closedTimeRange.end.minutesString}`}
                </span>
            }

        </div>
    )
}
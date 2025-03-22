import { Button } from "./button"
import { cn } from "@/lib/utils"

export function ShowMoreFadeContainer({ className, isShowMoreVisible, setShowMore, showMore, children }) {

    return (
        <div className={cn("relative z-0 flex flex-col gap-6", className)}>
            {children}

            {!!isShowMoreVisible && <>
                {!showMore && <div className="absolute h-72 pointer-events-none bg-gradient-to-b from-transparent to-background bottom-0 w-full z-1" />}
                <Button className={"max-w-max mx-auto z-10"} variant="outline" onClick={setShowMore.bind(null, !showMore)}>Show {showMore ? "Less" : "More"}</Button>

            </>
            }
        </div>
    )
}
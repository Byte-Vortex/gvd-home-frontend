import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldErrorView } from "./field-error-view"


const Textarea = React.forwardRef(
  ({ className, label, error, hideAsterisk, ...props }, ref) => {
    return (
      <label className="relative flex flex-col gap-1">
        {label && (
          <div className="text-sm font-medium">
            <span>{label}</span>
            {!hideAsterisk && <span className="ml-1 text-red-500">*</span>}
          </div>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.4)]",
            className,
          )}
          ref={ref}
          {...props}
        />
        <FieldErrorView error={error} />
      </label>
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }

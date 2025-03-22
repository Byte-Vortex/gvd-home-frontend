import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldErrorView } from "./field-error-view"
import clsx from "clsx"

export const inputStyles =
  "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-background disabled:opacity-50 transition-colors dark:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.4)]"

const Input = React.forwardRef(
  (
    {
      prefixIcon,
      className,
      type,
      name,
      label,
      error,
      onChange,
      onOnChangeComplete,
      hideAsterisk = false,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) {
        onChange(e)
      }
      if (onOnChangeComplete) {
        onOnChangeComplete(e)
      }
    }

    return (
      <label className={clsx("relative flex flex-col gap-1 w-full",type==="file" && "cursor-pointer")}>
        {label && (
          <div className="text-sm font-medium">
            <span>{label}</span>
            {!hideAsterisk && <span className="ml-1 text-red-500">*</span>}
          </div>
        )}
        <div className="relative">
          {prefixIcon && <div className="absolute h-full w-8 flex items-center justify-center">
            {prefixIcon}
          </div>
          }
          <input
            ref={ref}
            type={type}
            name={name}
            className={cn(
              inputStyles,
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              error && "focus-visible:ring-destructive",
              className,
              type === "file" && "cursor-pointer",
              prefixIcon && "pl-8",
            )}
            {...props}
            onChange={handleChange}
          />
        </div>
        <FieldErrorView error={error} />
      </label>
    )
  },
)
Input.displayName = "Input"

export { Input }

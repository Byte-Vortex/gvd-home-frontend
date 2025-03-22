import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-outline focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:brightness-90",
        secondary: "bg-surface text-on-on-surface hover:brightness-90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        social:"rounded-[7px]"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, loading = false, children, asChild = false, ...props }, ref) => {
  if (asChild) {
    return (
      <Slot ref={ref} {...props}>
        <>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              className: cn(buttonVariants({ variant, size }), className),
              children: (
                <>
                  {loading && (
                    <Loader2Icon className={cn('h-4 w-4 animate-spin', children && 'mr-2')} />
                  )}
                  {child.props.children}
                </>
              ),
            });
          })}
        </>
      </Slot>
    );
  }

  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading}
      ref={ref}
      {...props}
    >
      <>
        {loading && <Loader2Icon className={cn('h-4 w-4 animate-spin', children && 'mr-2')} />}
        {children}
      </>
    </button>
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

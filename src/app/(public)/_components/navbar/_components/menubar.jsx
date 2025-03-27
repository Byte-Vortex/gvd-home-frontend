"use client";

import React, { useState, useRef } from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils";
import { BsChevronDown as ArrowIcon } from "react-icons/bs";

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
    <MenubarPrimitive.Root ref={ref} className={cn(className)} {...props} />
));
Menubar.displayName = "Menubar";

const MenubarMenu = ({ children, ...props }) => {
    const [open, setOpen] = useState(false);
    const closeTimeout = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(closeTimeout.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => setOpen(false), 100);
    };

    return (
        <MenubarPrimitive.Menu {...props} open={open} onOpenChange={setOpen}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { open, handleMouseEnter, handleMouseLeave })
            )}
        </MenubarPrimitive.Menu>
    );
};

const MenubarTrigger = React.forwardRef(({ className, children, open, handleMouseEnter, handleMouseLeave, isActive, ...props }, ref) => (
    <MenubarPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex cursor-default select-none items-center text-sm outline-none group rounded-full duration-150",
            "hover:text-primary focus:text-primary data-[state=open]:text-primary",
            isActive && "text-primary",
            className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
    >
        <div className="flex gap-1.5 items-center">
            {children}
            <ArrowIcon className={open ? "mt-1 rotate-180 duration-300" : "duration-300"} />
        </div>
    </MenubarPrimitive.Trigger>
));
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarContent = React.forwardRef(({ className, align = "center", alignOffset = 0, sideOffset = 8, handleMouseEnter, handleMouseLeave, ...props }, ref) => (
    <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
            ref={ref}
            align={align}
            alignOffset={alignOffset}
            sideOffset={sideOffset}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "z-50 min-w-[12rem] overflow-hidden shadow-md border border-outline/20 py-2 px-2 rounded-2xl",
                "data-[state=open]:animate-in data-[state=closed]:fade-out-0",
                "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
                "data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
                "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
                "data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        />
    </MenubarPrimitive.Portal>
));
MenubarContent.displayName = "MenubarContent";

const MenubarItem = React.forwardRef(({ className, inset, isActive, ...props }, ref) => (
    <MenubarPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex select-none items-center rounded-xl w-full py-1.5 px-4 text-sm outline-none",
            "focus:bg-primary focus:text-on-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            inset && "pl-8",
            isActive && "bg-primary text-on-primary",
            className
        )}
        {...props}
    />
));
MenubarItem.displayName = "MenubarItem";

const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => (
    <MenubarPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-gray-100", className)}
        {...props}
    />
));
MenubarSeparator.displayName = "MenubarSeparator";

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator };

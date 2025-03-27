"use client"

import * as Menubar from '@radix-ui/react-menubar';
import clsx from 'clsx';
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { IoIosArrowDown as ChevronDownIcon } from "react-icons/io";
import NextLink from 'next/link';



const Root = ({ children }) => (
    <Menubar.Root>

        <Menubar.Menu>
            {children}
        </Menubar.Menu>

    </Menubar.Root>
);


const Link = ({ to, icon, title }) => {

    return (
        <NextLink href={to} className={clsx("!outline-none focus:outline-none ring-0 border-none group-data-[state=open]:!text-primary/50 flex items-center flex-col font-semibold duration-150 hover:scale-110 hover:text-primary")}>

            <div className="rounded-full flex items-center justify-center">
                {icon}
            </div>
            {title}

        </NextLink>
    )
}


const Trigger = ({ title, icon }) => {

    return (
        <Menubar.Trigger className={clsx("!outline-none focus:outline-none ring-0 border-none group-data-[state=open]:!text-primary/50 flex items-center flex-col font-semibold hover:scale-110 hover:text-primary")}>

            <div className="rounded-full flex items-center justify-center">
                {icon}
            </div>

            {title}
        </Menubar.Trigger>
    )
};



const Content = ({ children, props }) => {
    return (

        <Menubar.Portal>
            <Menubar.Content
                avoidCollisions={true}
                collisionBoundary={[]}
                hideWhenDetached
                side="top"
                sideOffset={2}
                className="w-screen data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 min-h-max"
                {...props}
            >
                <div className="bg-surface text-on-surface flex flex-col w-full mx-auto min-h-[6rem] rounded-t-3xl px-3 py-4 text-sm border-b border-primary border-t border-outline/40 space-y-2">

                    {children}
                </div>

            </Menubar.Content>
        </Menubar.Portal>
    )
};


const LinkItem = ({ to = "", title }) => {

    return (
        <Menubar.Item
            asChild
            className={clsx("px-3 py-2 rounded-2xl outline-none cursor-pointer hover:bg-primary hover:text-on-primary duration-150")
            }
        >
            <NextLink href={to}>
                {title}
            </NextLink>
        </Menubar.Item>

    )
};

const Accordion = ({ className, ...props }) => (
    <AccordionPrimitive.Root
        type="single"
        collapsible
        className="w-full"
        {...props}
    />
);

const AccordionItem = ({ className, ...props }) => (
    <AccordionPrimitive.Item
        className={clsx("w-full px-3 data-[state=open]:bg-on-surface/5 rounded-3xl", className)}
        {...props}
    />
)

const AccordionTrigger = ({ className, children, ...props }) => (
    <AccordionPrimitive.Header className="flex w-full">
        <AccordionPrimitive.Trigger
            className={clsx(
                "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
);

const AccordionContent = ({ className, children, ...props }) => (
    <AccordionPrimitive.Content
        className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={clsx("pb-4 pt-0 flex flex-col gap-1", className)}>{children}</div>
    </AccordionPrimitive.Content>
)





export {
    Root,
    Trigger,
    Link,
    Content,
    LinkItem,

    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
}
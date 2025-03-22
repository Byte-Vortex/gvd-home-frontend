"use client"

import { useEffect, forwardRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const ActiveLink = forwardRef(({ className = "", href = "", onActive, ...props }, ref) => {
    const pathname = usePathname();

    const isActive = pathname === href;

    useEffect(() => {
        if (isActive && typeof onActive === "function") onActive();
    }, [isActive, onActive]);

    let resolvedClassName = "";

    resolvedClassName = typeof className === "function" ? className(isActive) : className;

    return (
        <Link
            className={resolvedClassName}
            href={href}
            ref={ref}
            {...props}
        />
    )

})

ActiveLink.displayName = ActiveLink;
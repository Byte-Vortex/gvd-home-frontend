'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function RootTransition({ children }) {

    const pathname = usePathname();
    const initPathname = useRef(pathname);

    useEffect(() => {
        initPathname.current = "";
    }, []);
    return (

        <div key={pathname}>
            <motion.div
                key={pathname === initPathname.current ? "no" : "animate"}
                initial={pathname === initPathname.current ? {} : { opacity: 0, translateY: "5px", scale: 0.99 }}
                animate={{ opacity: 1, translateY: "0px", scale: 1 }}
                transition={{ ease: 'anticipate', duration: 0.75 }}
            >
                {children}
            </motion.div>
        </div>
    )
}
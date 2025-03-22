import { useState, useEffect, useRef } from "react"

export function useWindowResize() {
    const [width, setWidth] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResize = () => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setWidth(window.innerWidth), 200);
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])


    return width;
}


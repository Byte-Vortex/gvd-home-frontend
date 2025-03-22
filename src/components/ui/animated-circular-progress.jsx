"use client"

import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const AnimatedCircularProgress = ({ maxPercentage = 100 }) => {
    const [percentage, setPercentage] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (percentage * 100 + 1 >= maxPercentage * 100) return;
                        const updatedPercentage = (percentage * 100 + 1) / 100;
                        setPercentage(updatedPercentage);
                    }
                });
            },
            { threshold: 0 } // Change the threshold value as per your requirements
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [percentage, maxPercentage]);
    return (
        <div ref={containerRef} className="h-full w-full font-bold">
            <CircularProgressbar
                strokeWidth={10}
                styles={buildStyles({
                    // // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',

                    // // Colors
                    pathColor: `#349c03`,
                    textColor: `#349c03`,
                    trailColor: `rgba(var(--background))`

                })}
                value={percentage}
                text={`${percentage.toFixed(2)}%`}
            />
        </div>
    );
};

export default AnimatedCircularProgress;
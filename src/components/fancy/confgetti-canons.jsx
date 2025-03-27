"use client";

import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

export function ConfettiSideButton({ children, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(); // First, trigger the main functionality (e.g., handleNext)
    }

    const end = Date.now() + 3 * 1000; // Confetti duration: 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <Button className="w-40 bg-green-800" onClick={handleClick}>
      {children}
    </Button>
  );
}
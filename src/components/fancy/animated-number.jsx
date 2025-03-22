"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Component({
  value,
  format = (num) => num.toLocaleString(),
  precision = 0,
}) {
  const display = format(parseFloat(value.toFixed(precision)));

  const framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2, ease: 'easeOut' },

  }
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={display}
        {...framerProps}
      >
        {display}
      </motion.div>
    </AnimatePresence>
  )
}

export const AnimatedNumber = memo(Component);

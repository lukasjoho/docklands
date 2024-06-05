"use client";
import { motion } from "framer-motion";
export default function ImageAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="w-full h-full z-0 absolute left-0 top-0"
      initial={{
        scale: 1.3,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        duration: 3,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export const EASE = [0.16, 1, 0.3, 1];

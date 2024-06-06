"use client";

import { motion } from "framer-motion";

export default function WhileTapper({
  children,
  scale = 0.95,
  className,
}: {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div className={className} whileTap={{ scale: scale }}>
      {children}
    </motion.div>
  );
}

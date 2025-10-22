"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat } from "lucide-react";

export const ChefHatAnimation = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 500);

    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            rotate: [0, 10, -10, 0],
            opacity: 1,
            y: [0, -20, 0]
          }}
          exit={{ 
            scale: 0,
            rotate: 180,
            opacity: 0,
            y: -50
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
              y: [0, -10, 0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <div className="bg-primary/90 backdrop-blur-sm rounded-full p-8 shadow-2xl">
              <ChefHat className="h-24 w-24 text-primary-foreground" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
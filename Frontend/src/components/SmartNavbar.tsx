"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Bell, User } from "lucide-react";

export function SmartNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 inset-x-0 z-50 h-16 bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-semibold text-lg tracking-tight">SubTrack</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <button className="hover:text-white transition-colors hover:bg-white/5 p-2 rounded-full">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition-colors hover:bg-white/5 p-2 rounded-full">
              <User className="w-5 h-5" />
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useRef, useState } from "react";
import { Subscription } from "@/actions/fetchSubscriptions";
import { CreditCard, CalendarDays } from "lucide-react";

export function SubscriptionCard({ subscription }: { subscription: Subscription }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const isTrial = subscription.is_trial;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-6 transition-colors duration-500"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      
      <div className="flex justify-between items-start mb-6 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <CreditCard className="w-5 h-5 text-zinc-300" />
          </div>
          <h2 className="text-xl font-medium text-white tracking-tight">
            {subscription.vendor_name}
          </h2>
        </div>
        
        {isTrial ? (
          <span className="px-2.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
            Trial Active
          </span>
        ) : (
          <span className="px-2.5 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Active
          </span>
        )}
      </div>

      <div className="mt-auto z-10 relative">
        <p className="text-sm text-zinc-400 mb-1 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" /> Billed Amount
        </p>
        <p className="text-3xl font-semibold text-white">
          <span className="text-xl text-zinc-500">$</span>
          {subscription.billed_amount.toFixed(2)}
          <span className="text-sm font-normal text-zinc-500 ml-1">/{subscription.currency}</span>
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { Subscription } from "@/actions/fetchSubscriptions";

export function SummaryWidget({ subscriptions }: { subscriptions: Subscription[] }) {
  const activeSubs = subscriptions.filter(s => !s.is_trial);
  const trialSubs = subscriptions.filter(s => s.is_trial);

  const totalMonthlySpend = activeSubs.reduce((acc, curr) => acc + curr.billed_amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-8">
      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Monthly Spend</h3>
        <p className="text-4xl font-semibold text-white tracking-tight flex items-baseline gap-1">
          <span className="text-2xl text-zinc-500">$</span>
          {totalMonthlySpend.toFixed(2)}
        </p>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-zinc-400 text-sm font-medium mb-2">Active Subscriptions</h3>
        <p className="text-4xl font-semibold text-white tracking-tight">
          {activeSubs.length}
        </p>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-zinc-400 text-sm font-medium mb-2">Active Trials</h3>
        <p className="text-4xl font-semibold text-white tracking-tight">
          {trialSubs.length}
        </p>
      </div>
    </div>
  );
}

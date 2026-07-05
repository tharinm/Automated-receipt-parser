import React from "react";
import { Subscription } from "@/actions/fetchSubscriptions";
import { SubscriptionCard } from "./SubscriptionCard";

export function DashboardGrid({ subscriptions }: { subscriptions: Subscription[] }) {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-500">
        No subscriptions found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {subscriptions.map((sub) => (
        <SubscriptionCard key={sub.id} subscription={sub} />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
      ))}
    </div>
  );
}

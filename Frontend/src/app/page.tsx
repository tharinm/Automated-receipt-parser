import { Suspense } from "react";
import { fetchSubscriptions } from "@/actions/fetchSubscriptions";
import { SummaryWidget } from "@/components/SummaryWidget";
import { DashboardGrid, DashboardSkeleton } from "@/components/DashboardGrid";
import { SmartNavbar } from "@/components/SmartNavbar";
import { AddSubscription } from "@/components/AddSubscription";

// Force dynamic rendering to ensure fresh DB data is always fetched
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const subscriptions = await fetchSubscriptions();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black -z-10" />
      
      <SmartNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">
            Overview
          </h1>
          <p className="text-zinc-400">
            Track your subscriptions, trials, and monthly spend.
          </p>
        </header>

        <Suspense fallback={<DashboardSkeleton />}>
          <SummaryWidget subscriptions={subscriptions} />
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-6">
            All Subscriptions
          </h2>
          <DashboardGrid subscriptions={subscriptions} />
        </Suspense>
      </main>

      <AddSubscription />
    </div>
  );
}

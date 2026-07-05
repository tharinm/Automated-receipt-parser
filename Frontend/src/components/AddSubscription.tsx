"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, Zap, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/subscription-etl";

export function AddSubscription() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rawText, setRawText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!rawText.trim()) {
      toast.error("Please paste some text before processing.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw_text: rawText }),
      });

      if (!res.ok) {
        throw new Error(`Webhook returned ${res.status}`);
      }

      // Success
      setOpen(false);
      setRawText("");
      toast.success("Subscription extracted!", {
        description: "Your AI pipeline received the receipt successfully.",
      });
      
      // Refresh the page data in the background
      router.refresh();
    } catch (error) {
      console.error("ETL webhook error:", error);
      toast.error("Failed to process receipt.", {
        description: "Make sure your n8n workflow is running.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [rawText, router]);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="add-subscription-trigger"
        onClick={() => setOpen(true)}
        className="group fixed bottom-8 right-8 z-40 flex items-center gap-2.5 rounded-full bg-indigo-600 px-5 py-3.5 text-sm font-medium text-white shadow-2xl shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
          <div className="absolute inset-0 animate-ping opacity-20">
            <Plus className="w-5 h-5" />
          </div>
        </div>
        <span>Add Subscription</span>
        <Sparkles className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Dialog Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl bg-zinc-950 border-zinc-800/80 text-white overflow-hidden">
          {/* Glow effect behind modal */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <DialogHeader className="relative">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-white">
                  AI Receipt Processor
                </DialogTitle>
                <DialogDescription className="text-zinc-400 text-sm">
                  Paste any invoice, receipt, or email confirmation below.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="relative space-y-4 mt-2">
            {/* Feature chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: FileText, label: "Emails" },
                { icon: Sparkles, label: "Invoices" },
                { icon: CheckCircle2, label: "Receipts" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-1 text-xs text-zinc-400 border border-zinc-700/50"
                >
                  <Icon className="w-3 h-3 text-indigo-400" />
                  {label}
                </span>
              ))}
            </div>

            {/* Textarea */}
            <div className="relative group/textarea">
              <Textarea
                id="receipt-input"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your messy email receipt or invoice here..."
                disabled={isLoading}
                className="min-h-[200px] resize-none bg-zinc-900/60 border-zinc-700/50 text-white placeholder:text-zinc-500 text-sm leading-relaxed focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 transition-all duration-200"
              />
              {/* Subtle glow on focus */}
              <div className="absolute inset-0 rounded-lg bg-indigo-500/5 opacity-0 group-focus-within/textarea:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Character count */}
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>
                {rawText.length > 0
                  ? `${rawText.length.toLocaleString()} characters`
                  : "Supports any text format"}
              </span>
              {rawText.length > 0 && (
                <button
                  onClick={() => setRawText("")}
                  className="hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Submit Button */}
            <Button
              id="process-ai-button"
              onClick={handleSubmit}
              disabled={isLoading || !rawText.trim()}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden cursor-pointer border-0"
              size="lg"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    {/* Glowing spinner */}
                    <div className="relative">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <div className="absolute inset-0 w-4 h-4 border-2 border-transparent border-t-indigo-300 rounded-full animate-spin blur-[2px]" />
                    </div>
                    <span>Processing with AI...</span>

                    {/* Pulsing background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-400/20 to-indigo-600/0 animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Process with AI</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

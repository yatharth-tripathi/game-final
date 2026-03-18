"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X } from "lucide-react";

interface SplitLayoutProps {
  topBar: React.ReactNode;
  children: React.ReactNode;
  insightsPanel: React.ReactNode;
  insightsPanelTitle?: string;
  bottomBar?: React.ReactNode;
}

export function SplitLayout({
  topBar,
  children,
  insightsPanel,
  insightsPanelTitle = "AI COACH",
  bottomBar,
}: SplitLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-full w-full flex flex-col relative">
      {/* TOP BAR — full width */}
      {topBar}

      {/* SPLIT AREA */}
      <div className="split-layout flex-1 min-h-0">
        {/* LEFT — Chat */}
        <div className="split-chat">
          <div className="flex-1 overflow-y-auto relative">{children}</div>
          {bottomBar && (
            <div className="shrink-0 relative z-10">{bottomBar}</div>
          )}
        </div>

        {/* RIGHT — Insights (desktop) */}
        <div className={`split-insights ${mobileOpen ? "open" : ""}`}>
          <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between"
            style={{
              background: "rgba(7,10,15,0.95)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid var(--border)",
            }}>
            <div className="flex items-center gap-2">
              <Brain size={12} style={{ color: "var(--accent-gold)" }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "3px",
                color: "var(--accent-gold)",
              }}>
                {insightsPanelTitle}
              </span>
            </div>
            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="hidden max-md:flex items-center justify-center w-6 h-6 rounded"
              style={{ color: "var(--text-ghost)" }}
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-4 space-y-0">
            {insightsPanel}
          </div>
        </div>
      </div>

      {/* Mobile FAB to open insights */}
      <AnimatePresence>
        {!mobileOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setMobileOpen(true)}
            className="insights-toggle-mobile"
            aria-label="Open AI Coach panel"
          >
            <Brain size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, X } from "lucide-react";

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
  insightsPanelTitle = "Live Analysis",
  bottomBar,
}: SplitLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-full w-full flex flex-col relative">
      {/* TOP BAR -- full width */}
      {topBar}

      {/* SPLIT AREA */}
      <div className="split-layout flex-1 min-h-0">
        {/* LEFT -- Chat */}
        <div className="split-chat">
          <div className="flex-1 overflow-y-auto relative">{children}</div>
          {bottomBar && (
            <div className="shrink-0 relative z-10">{bottomBar}</div>
          )}
        </div>

        {/* RIGHT -- Insights (desktop) */}
        <div className={`split-insights ${mobileOpen ? "open" : ""}`}>
          <div
            className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 size={14} style={{ color: "var(--accent-primary)" }} />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {insightsPanelTitle}
              </span>
              {/* Session Active badge */}
              <span
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--success-bg)",
                  border: "1px solid var(--success-border)",
                }}
              >
                <span
                  className="dot dot-success"
                  style={{ width: 5, height: 5 }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "var(--success)",
                  }}
                >
                  Session Active
                </span>
              </span>
            </div>
            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="hidden max-md:flex items-center justify-center w-7 h-7 rounded-md"
              style={{
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                background: "var(--bg-surface)",
              }}
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-3 sm:p-4 space-y-0">{insightsPanel}</div>
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
            aria-label="Open Live Analysis panel"
          >
            <BarChart3 size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { Component, type ReactNode } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex items-center justify-center" style={{ background: "var(--bg-void)" }}>
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: "rgba(229,62,62,0.1)", border: "1px solid rgba(229,62,62,0.2)" }}>
              <AlertTriangle size={28} style={{ color: "var(--danger)" }} />
            </div>
            <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
              Something went wrong
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="btn-gold px-6 py-2.5 inline-flex items-center gap-2"
            >
              <RotateCcw size={14} /> Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

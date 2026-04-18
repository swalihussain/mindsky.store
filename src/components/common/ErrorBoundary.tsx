"use client";

import React, { ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Layout Crash Detected:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-40 px-6 text-center bg-gray-50 flex flex-col items-center justify-center min-h-[400px]">
           <h2 className="text-3xl font-black text-[#1F2937] italic mb-4">"Something went wrong. Please reload."</h2>
           <p className="text-gray-400 font-bold mb-8">The digital playground encountered an unexpected bounce.</p>
           <button 
             onClick={() => window.location.reload()}
             className="bg-[#024fe7] text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest"
           >
             Re-Initialize System
           </button>
        </div>
      );
    }

    return this.props.children;
  }
}


'use client';

import React, { useState } from 'react';
import { DragDropZone } from '@/components/DragDropZone';
import { SubscriptionTable } from '@/components/SubscriptionTable';
import { SummaryCard } from '@/components/SummaryCard';
import { ParseResult } from '@/lib/detectSubscriptions';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<ParseResult | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-gray-300">100% Client-Side Privacy</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Subscription Auditor
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Drag and drop your bank statement to instantly discover hidden subscriptions.
            <br className="hidden md:block" />
            Your financial data never leaves your browser.
          </p>
        </div>

        {/* Main Interface */}
        <div className="space-y-12">
          {!data ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <DragDropZone onAnalysisComplete={setData} />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
              <div className="flex justify-end">
                <button
                  onClick={() => setData(null)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Analyze another file
                </button>
              </div>
              <SummaryCard
                totalSpend={data.totalSpend}
                subscriptionCount={data.subscriptions.length}
              />
              <SubscriptionTable subscriptions={data.subscriptions} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-50">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Subscription Auditor. Built for privacy.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Data Retention Policy</span>
          </div>
        </div>

      </div>
    </main>
  );
}

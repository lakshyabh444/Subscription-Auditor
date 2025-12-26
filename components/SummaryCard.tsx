
import React from 'react';
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';

interface SummaryCardProps {
    totalSpend: number;
    subscriptionCount: number;
}

export function SummaryCard({ totalSpend, subscriptionCount }: SummaryCardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Spend Card */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <DollarSign className="w-24 h-24 text-white" />
                </div>
                <p className="text-indigo-200 mb-1 font-medium">Monthly Potential Spend</p>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2 tracking-tight">
                    ₹{totalSpend.toFixed(2)}
                </h3>
                <p className="text-xs text-indigo-300 bg-indigo-500/20 inline-block px-2 py-1 rounded-lg">
                    Based on current upload
                </p>
            </div>

            {/* Subscription Count Card */}
            <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CreditCard className="w-24 h-24 text-white" />
                </div>
                <p className="text-emerald-200 mb-1 font-medium">Active Subscriptions</p>
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    {subscriptionCount}
                </h3>
                <p className="text-xs text-emerald-300 bg-emerald-500/20 inline-block px-2 py-1 rounded-lg">
                    Detected services
                </p>
            </div>

            {/* Yearly Projection Card */}
            <div className="bg-gradient-to-br from-rose-900/50 to-pink-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-24 h-24 text-white" />
                </div>
                <p className="text-rose-200 mb-1 font-medium">Yearly Projection</p>
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    ₹{(totalSpend * 12).toFixed(2)}
                </h3>
                <p className="text-xs text-rose-300 bg-rose-500/20 inline-block px-2 py-1 rounded-lg">
                    Est. Annual Cost
                </p>
            </div>
        </div>
    );
}

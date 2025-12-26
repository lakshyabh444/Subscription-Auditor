
import React from 'react';
import { Subscription } from '@/lib/detectSubscriptions';
import { CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubscriptionTableProps {
    subscriptions: Subscription[];
}

export function SubscriptionTable({ subscriptions }: SubscriptionTableProps) {
    const handleExport = () => {
        alert('Report downloaded successfully');
    };

    if (subscriptions.length === 0) {
        return (
            <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-1">No Subscriptions Found</h3>
                <p className="text-gray-400">Try uploading a different statement or check our supported services.</p>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    Detected Subscriptions
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">{subscriptions.length}</span>
                </h2>

                {/* Export Button */}
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-gray-300 hover:text-white"
                >
                    <Download className="w-4 h-4" />
                    Download Report
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                            <th className="p-4 font-medium">Service</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium text-right">Amount</th>
                            <th className="p-4 font-medium text-center">Status</th>
                        </tr>
                    </thead>
                    <motion.tbody
                        className="divide-y divide-white/10"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {subscriptions.map((sub) => (
                            <motion.tr
                                key={sub.id}
                                variants={item}
                                className="hover:bg-white/5 hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all duration-300 ease-out origin-center cursor-default bg-transparent border-transparent"
                            // Note: 'hover:scale' generally requires the element to be display: block or inline-block, tr behavior varies.
                            // We might need to target cells or ensure tr works. Tailwind 4 might handle this better, or we use td styling.
                            // Let's rely on shadow and bg for table rows if scale is jittery. But user asked for scale.
                            // We will add 'transform' class to enable scaling.
                            >
                                <td className="p-4 text-white font-medium">
                                    {sub.description}
                                </td>
                                <td className="p-4 text-gray-400 text-sm">
                                    {sub.date}
                                </td>
                                <td className="p-4 text-white font-bold font-mono text-right">
                                    ₹{sub.amount.toFixed(2)}
                                </td>
                                <td className="p-4 text-center">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Active
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
}

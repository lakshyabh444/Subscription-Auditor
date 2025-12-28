'use client';

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Subscription } from '@/lib/detectSubscriptions';

interface SpendChartProps {
    subscriptions: Subscription[];
}

const COLORS = ['#8b5cf6', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6'];

export function SpendChart({ subscriptions }: SpendChartProps) {
    const data = useMemo(() => {
        const categoryMap: Record<string, number> = {};
        subscriptions.forEach(sub => {
            const cat = sub.category || 'Other';
            categoryMap[cat] = (categoryMap[cat] || 0) + sub.amount;
        });

        return Object.entries(categoryMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [subscriptions]);

    if (data.length === 0) return null;

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Spend Distribution
                </span>
            </h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number | undefined) => [`₹${(value || 0).toFixed(2)}`, 'Spend']}
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                            itemStyle={{ color: '#e4e4e7' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

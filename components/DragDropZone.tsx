
'use client';

import React, { useState, useCallback } from 'react';
import { UploadCloud, FileSpreadsheet, Sparkles } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { detectSubscriptions, ParseResult, getDemoData } from '@/lib/detectSubscriptions';

interface DragDropZoneProps {
    onAnalysisComplete: (data: ParseResult) => void;
}

export function DragDropZone({ onAnalysisComplete }: DragDropZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFile = async (file: File) => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const result = await detectSubscriptions(file);
            onAnalysisComplete(result);
        } catch (error) {
            console.error('Error processing file:', error);
            alert('Failed to process CSV file. Please check the format.');
        } finally {
            setIsProcessing(false);
            setIsDragging(false);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
            processFile(file);
        } else {
            alert('Please upload a valid CSV file.');
        }
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDemoMode = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsProcessing(true);
        // Simulate slight delay for effect
        setTimeout(() => {
            const demoData = getDemoData();
            onAnalysisComplete(demoData);
            setIsProcessing(false);
        }, 800);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={twMerge(
                    'relative w-full rounded-3xl border-4 border-dashed transition-all duration-300 ease-in-out p-12 text-center cursor-pointer group mb-6',
                    isDragging
                        ? 'border-blue-500 bg-blue-500/10 scale-[1.02]'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5',
                    isProcessing ? 'animate-pulse pointer-events-none' : ''
                )}
            >
                <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileInput}
                />
                <label htmlFor="file-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <div className={twMerge(
                        "w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20 transition-transform duration-300",
                        isDragging ? "scale-110 rotate-3" : "group-hover:scale-105"
                    )}>
                        {isProcessing ? (
                            <FileSpreadsheet className="w-10 h-10 text-white animate-bounce" />
                        ) : (
                            <UploadCloud className="w-10 h-10 text-white" />
                        )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                        {isProcessing ? 'Analyzing Statement...' : 'Drop your Bank Statement'}
                    </h3>
                    <p className="text-gray-400 max-w-sm mx-auto mb-6">
                        {isProcessing
                            ? 'We are locally scanning for subscriptions...'
                            : 'Drag & drop your .csv file here, or click to browse.'}
                    </p>
                </label>
            </div>

            {/* Demo Mode Toggle */}
            <div className="flex justify-center">
                <button
                    onClick={handleDemoMode}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-gray-300 hover:text-white"
                >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Try Demo Data (Indian Context)
                </button>
            </div>

        </div>
    );
}

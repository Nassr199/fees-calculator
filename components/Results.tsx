
import React, { useState } from 'react';
import { I18nData, CalculationResult } from '../types';
import { GlassCard } from './GlassCard';
import { IconCalc, IconPlus, IconMinus } from './Icons';

interface ResultsProps {
    langData: I18nData;
    results: CalculationResult;
}

export const Results: React.FC<ResultsProps> = ({ langData, results }) => {
    const [mainExpanded, setMainExpanded] = useState(false);
    const suffix = langData.currencySuffix;

    const format = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const totalFees = results.totalServiceFee + results.S_final;
    const profitPercent = results.X > 0 ? (results.P_input / results.X) * 100 : (results.P_input > 0 ? 100 : 0);
    const feesPercent = results.X > 0 ? (totalFees / results.X) * 100 : 0;

    return (
        <div className="flex flex-col h-full justify-center perspective-1000 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Unified Main Card */}
            <div className="relative group">
                {/* Ambient Glow */}
                <div className="absolute inset-4 bg-blue-400/10 dark:bg-blue-500/5 blur-3xl rounded-full opacity-50 pointer-events-none"></div>

                <GlassCard 
                    className="relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl"
                    noPadding
                >
                    {/* --- HEADER SECTION (Always Visible) --- */}
                    <div 
                        className="p-8 pb-6 cursor-pointer relative z-20"
                        onClick={() => setMainExpanded(!mainExpanded)}
                    >
                         {/* Header Interior Gradient */}
                         <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            {/* Top Row: Labels & Logos */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-1.5 opacity-80">
                                        {langData.labels[4]}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${mainExpanded ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-gray-300 dark:bg-gray-600'} transition-all duration-500`}></div>
                                        <p className="text-[10px] font-medium text-gray-400">{langData.combinedTitle}</p>
                                    </div>
                                </div>
                                <div className="flex -space-x-2 rtl:space-x-reverse opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <LogoBadge src="https://cdn.tamara.co/assets/png/tamara-logo-badge-en.png" />
                                    <LogoBadge src="https://cdn.salla.sa/BmwbV/Ea1Kx4SfpK2Vy3Lx3aVPvZKBMkSM5dio2eKveTwm.png" />
                                </div>
                            </div>

                            {/* Middle: The Big Number */}
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-[5rem] leading-none font-light tracking-tighter text-gray-900 dark:text-white drop-shadow-sm font-sans">
                                    {format(results.X)}
                                </span>
                                <span className="text-xl font-light text-gray-400 transform -translate-y-4 inline-block">{suffix.trim()}</span>
                            </div>

                            {/* Bottom: Trigger Button */}
                            <div className="flex justify-between items-end mt-4">
                                <button className={`
                                    px-5 py-2.5 rounded-[14px] text-[10px] font-bold tracking-widest uppercase transition-all duration-500 flex items-center gap-3 border
                                    ${mainExpanded 
                                        ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-black shadow-lg translate-y-1' 
                                        : 'bg-white/40 border-white/40 text-gray-600 dark:bg-white/5 dark:border-white/5 dark:text-gray-400 hover:bg-white hover:border-white hover:shadow-md'
                                    }
                                `}>
                                    <span>{mainExpanded ? langData.hideDetailsText : langData.showDetailsText}</span>
                                    <span className={`w-4 h-4 rounded-full flex items-center justify-center bg-white/20 transition-all duration-500`}>
                                        {mainExpanded ? <IconMinus size={10} strokeWidth={3} /> : <IconPlus size={10} strokeWidth={3} />}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- DETAILS SECTION (Expandable) --- */}
                    <div className={`
                        grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10
                        ${mainExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                    `}>
                        <div className="overflow-hidden">
                            {/* Separator Line */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent opacity-50"></div>

                            {/* Scrollable Content Area */}
                            <div className="p-6 pt-6 bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm">
                                
                                <div className="flex flex-col gap-3">
                                    <DetailRow 
                                        label={langData.labels[0]} 
                                        value={format(results.baseFee)} suffix={suffix} index={0} 
                                        details={langData.calculationDetails.baseFee(format(results.X), format(results.baseFee), suffix)}
                                    />
                                    
                                    <DetailRow 
                                        label={langData.labels[1]} 
                                        value={format(results.vat)} suffix={suffix} index={1} 
                                        details={langData.calculationDetails.vat(format(results.baseFee), format(results.vat), suffix)}
                                    />

                                    <DetailRow 
                                        label={langData.labels[2]} 
                                        value={format(results.totalServiceFee)} suffix={suffix} index={2} highlight="orange"
                                        details={langData.calculationDetails.totalServiceFee(format(results.baseFee), format(results.vat), format(results.totalServiceFee), suffix)}
                                    />

                                    <DetailRow 
                                        label={results.settlementType === 'bank_transfer' ? langData.settlementFeeLabel_transfer : langData.settlementFeeLabel_provider} 
                                        value={format(results.S_final)} suffix={suffix} index={3} highlight={results.S_final > 0 ? "red" : undefined}
                                        details={langData.calculationDetails.settlementFee(results.settlementType, results.providerForSettlement, format(results.S_final), suffix, results.settlementFeeActive, results.X)}
                                    />

                                    <div className="my-2 h-px bg-gray-200 dark:bg-white/5 border-t border-dashed border-gray-300 dark:border-white/10"></div>

                                    <DetailRow 
                                        label={langData.labels[5]} 
                                        value={format(results.P_input)} suffix={suffix} index={4} highlight="green" isLarge
                                        details={langData.calculationDetails.netProfit(format(results.P_input), suffix)}
                                    />
                                </div>

                                {/* Visualization Bar Embedded */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/5">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                                        <span>{langData.vizProfitTitle}</span>
                                        <span>{langData.vizFeeTitle}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden flex shadow-inner">
                                        <div 
                                            className="h-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-1000 relative" 
                                            style={{ width: `${Math.min(100, Math.max(0, profitPercent))}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20"></div>
                                        </div>
                                         <div 
                                            className="h-full bg-gray-400 dark:bg-gray-600 transition-all duration-1000" 
                                            style={{ width: `${Math.min(100, Math.max(0, feesPercent))}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2 text-[10px] font-mono opacity-60">
                                        <span>{profitPercent.toFixed(1)}%</span>
                                        <span>{feesPercent.toFixed(1)}%</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

// Sub-components
const LogoBadge = ({ src }: { src: string }) => (
    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg p-2 border border-white/40 ring-1 ring-black/5 z-10 first:z-20">
        <img src={src} className="w-full h-full object-contain" alt="Provider" />
    </div>
);

interface DetailRowProps {
    label: string;
    value: string;
    suffix: string;
    index: number;
    details: string;
    highlight?: 'green' | 'red' | 'orange';
    isLarge?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, suffix, index, details, highlight, isLarge }) => {
    const [open, setOpen] = useState(false);
    
    // Status Dot Color
    const dotColor = highlight === 'green' ? 'bg-emerald-500 shadow-emerald-500/50' : 
                     highlight === 'red' ? 'bg-rose-500 shadow-rose-500/50' : 
                     highlight === 'orange' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-gray-300 dark:bg-gray-600';
    
    const textColor = 'text-gray-900 dark:text-white';

    return (
        <div 
            onClick={() => setOpen(!open)}
            className={`
                group rounded-[18px] overflow-hidden transition-all duration-300 cursor-pointer border
                ${open 
                    ? 'bg-white shadow-lg border-white/60 dark:bg-white/10 dark:border-white/20 transform scale-[1.01]' 
                    : 'bg-white/40 border-white/20 hover:bg-white/70 hover:border-white/40 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10'
                }
            `}
        >
            <div className="px-5 py-4 flex justify-between items-center relative">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${dotColor} shadow-sm`}></div>
                    <span className={`text-[11px] font-semibold transition-colors ${open ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
                        {label}
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className={`flex items-baseline gap-1.5 ${textColor}`}>
                        <span className={`${isLarge ? 'text-xl font-bold tracking-tight' : 'text-[15px] font-semibold tracking-normal'}`}>{value}</span>
                        <span className="text-[10px] opacity-60 font-medium uppercase">{suffix.trim()}</span>
                    </div>
                    {/* Plus/Minus Icon */}
                    <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                        ${open ? 'bg-gray-100 dark:bg-white/20 text-gray-900 dark:text-white rotate-180' : 'bg-transparent text-gray-400 group-hover:bg-white/50 dark:group-hover:bg-white/10'}
                    `}>
                         {open ? <IconMinus size={10} strokeWidth={3} /> : <IconPlus size={10} strokeWidth={3} />}
                    </div>
                </div>
            </div>
            
            {/* Inner Details Accordion */}
            <div className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="px-5 pb-4 pt-0">
                        <div className="p-3 bg-gray-50 dark:bg-black/40 rounded-xl text-[10px] font-mono text-gray-600 dark:text-gray-300 flex items-start gap-3 border border-gray-100 dark:border-white/5 leading-relaxed">
                            <IconCalc size={14} className="shrink-0 mt-0.5 text-blue-500 opacity-80" />
                            <div dangerouslySetInnerHTML={{ __html: details }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

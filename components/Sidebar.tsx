
import React, { useState } from 'react';
import { I18nData, Provider } from '../types';
import { GlassCard } from './GlassCard';
import { IconClear, IconPrinter, IconShare, IconLang, IconSun, IconMoon, IconPlus, IconMinus, IconCheck } from './Icons';
import { SETTLEMENT_TABBY, SETTLEMENT_TAMARA } from '../constants';

interface SidebarProps {
    langData: I18nData;
    price: string;
    setPrice: (v: string) => void;
    provider: Provider;
    setProvider: (p: Provider) => void;
    includeSettlement: boolean;
    setIncludeSettlement: (v: boolean) => void;
    isDark: boolean;
    toggleTheme: () => void;
    toggleLang: () => void;
    handlePrint: () => void;
    handleShare: () => void;
    currentLang: 'ar' | 'en';
}

export const Sidebar: React.FC<SidebarProps> = ({
    langData, price, setPrice, provider, setProvider,
    includeSettlement, setIncludeSettlement,
    isDark, toggleTheme, toggleLang, handlePrint, handleShare, currentLang
}) => {
    
    const [isInputFocused, setIsInputFocused] = useState(false);
    
    const handleClear = () => {
        setPrice('');
        // Keep focus logic consistent if needed
    };
    
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9.]/g, '');
        if ((val.match(/\./g) || []).length > 1) return;
        setPrice(val);
    };

    const cleanSettlementLabel = langData.includeSettlementLabel.split('(')[0].trim();

    return (
        <div className="flex flex-col h-full animate-slide-up">
            <GlassCard className="flex flex-col gap-6 shadow-2xl relative overflow-visible h-full bg-white/40 dark:bg-[#121212]/40">
                
                {/* 1. Header & Controls */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between w-full" dir="ltr">
                        {/* Logo - Embedded Crystal Concept */}
                        <div className="w-[72px] h-[72px] rounded-[20px] flex items-center justify-center p-1 relative overflow-hidden group">
                            {/* Background Layer */}
                            <div className="absolute inset-0 bg-white/40 dark:bg-transparent backdrop-blur-md border border-white/50 dark:border-white/10 rounded-[20px] shadow-sm transition-all duration-500 group-hover:bg-white/60 dark:group-hover:bg-white/5"></div>
                            
                            {/* Inner Shine/Spotlight */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                            <img 
                                src="https://www2.0zz0.com/2025/04/29/23/183916568.png" 
                                alt="Store Logo" 
                                className="w-full h-full object-contain relative z-10 drop-shadow-sm transform transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        
                        {/* Control Bar - Unified Minimalist Capsule */}
                        <div className="flex items-center p-1 bg-[#EFEFF4] dark:bg-[#0A0A0A] rounded-full border border-white/50 dark:border-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
                            <MinimalToolBtn onClick={toggleLang} icon={<IconLang />} title={langData.langToggle} />
                            <div className="w-px h-4 bg-gray-300 dark:bg-white/10 mx-0.5"></div>
                            <MinimalToolBtn onClick={toggleTheme} icon={isDark ? <IconMoon /> : <IconSun />} title={langData.themeToggle} />
                            <div className="w-px h-4 bg-gray-300 dark:bg-white/10 mx-0.5"></div>
                            <MinimalToolBtn onClick={handlePrint} icon={<IconPrinter />} title={langData.printButtonLabel} />
                            <div className="w-px h-4 bg-gray-300 dark:bg-white/10 mx-0.5"></div>
                            <MinimalToolBtn onClick={handleShare} icon={<IconShare />} title={langData.shareButtonLabel} />
                        </div>
                    </div>

                    <div className="px-1">
                        <h1 className="text-2xl font-black text-gray-800 dark:text-white leading-tight tracking-tight">
                            {langData.mainTitle}
                        </h1>
                    </div>
                </div>

                {/* 2. Input Field - Deep Matte Surface with Stronger Separation */}
                <div className="relative group mb-2">
                    <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-b from-[#EFEFF4] to-[#E5E5EA] dark:from-[#1A1A1A] dark:to-[#0A0A0A] border border-white/50 dark:border-white/20 shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] px-4 pt-5 pb-2 flex flex-col items-center justify-center min-h-[95px] transition-all duration-300">
                        
                        {/* Header Row: Label & Clear Button */}
                        <div className="w-full flex justify-between items-center absolute top-3 px-3 z-20">
                             <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest select-none">
                                {langData.inputLabel}
                            </label>
                            
                            {/* Clear Button */}
                            <button 
                                onClick={handleClear}
                                className={`
                                    bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-red-500 hover:text-white 
                                    rounded-full p-1 transition-all duration-300 ease-out scale-90
                                    ${price ? 'opacity-100 scale-90 translate-y-0' : 'opacity-0 scale-50 -translate-y-2 pointer-events-none'}
                                `}
                                title={langData.clearButtonTitle}
                            >
                                <IconClear size={12} />
                            </button>
                        </div>
                        
                        {/* Input Area */}
                        <div className="flex flex-col items-center justify-center w-full relative z-10 mt-1">
                            <input 
                                type="text" 
                                inputMode="decimal" 
                                placeholder={isInputFocused ? "" : "0"}
                                value={price}
                                onChange={handlePriceChange}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                className="w-full text-center bg-transparent text-4xl leading-none font-light text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 outline-none font-sans tracking-tight transition-all duration-200"
                                style={{ fontVariantNumeric: 'tabular-nums' }}
                            />
                             <span className={`text-[10px] font-semibold text-gray-400 select-none mt-2 tracking-wide uppercase transition-opacity duration-300 ${!price && !isInputFocused ? 'opacity-60' : 'opacity-100'}`}>
                                {langData.currencySuffix.trim()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Controls Group */}
                <div className="space-y-5">
                    {/* Provider Toggle */}
                    <div className="bg-[#EFEFF4] dark:bg-[#151515] p-1.5 rounded-[24px] flex relative shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] border border-white/50 dark:border-white/20">
                        <SegmentOption 
                            isActive={provider === 'tabby'} 
                            onClick={() => setProvider('tabby')}
                            label={langData.providerTabbyLabel.split('(')[0]}
                            sub={`(${SETTLEMENT_TABBY})`}
                            activeColor="bg-white dark:bg-[#2C2C2E] text-gray-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10"
                        />
                         <SegmentOption 
                            isActive={provider === 'tamara'} 
                            onClick={() => setProvider('tamara')}
                            label={langData.providerTamaraLabel.split('(')[0]}
                            sub={`(${SETTLEMENT_TAMARA})`}
                            activeColor="bg-white dark:bg-[#2C2C2E] text-gray-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10"
                        />
                    </div>

                    {/* Settlement Toggle */}
                    <div 
                        className="bg-white/60 dark:bg-[#1A1A1A]/60 border border-white/60 dark:border-white/20 rounded-[24px] p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10 group shadow-sm" 
                        onClick={() => setIncludeSettlement(!includeSettlement)}
                    >
                        <div className="flex flex-col gap-2 flex-1 min-w-0 pr-4 rtl:pr-0 rtl:pl-4">
                            <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                {cleanSettlementLabel}
                            </span>
                            <span className="inline-flex items-center text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-black/5 dark:border-white/5 w-fit">
                                 {currentLang === 'ar' ? 'لأقل من 2500 ريال' : 'Below 2500 SAR'}
                            </span>
                        </div>
                        
                        {/* Custom iOS Toggle */}
                        <div className={`w-12 h-7 rounded-full p-0.5 transition-all duration-500 relative shrink-0 shadow-inner border flex items-center ${includeSettlement ? 'bg-gray-900 dark:bg-blue-600 border-transparent' : 'bg-gray-300 dark:bg-white/10 border-transparent'}`}>
                             <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center justify-center ${includeSettlement ? (currentLang === 'ar' ? '-translate-x-5' : 'translate-x-5') : ''}`}>
                                {includeSettlement && <IconCheck size={12} className="text-gray-900 dark:text-blue-600 stroke-[4]" />}
                             </div>
                        </div>
                    </div>
                </div>

                {/* 4. Notes - Professional Accordion */}
                <div className="mt-2 pt-4 border-t border-gray-200/50 dark:border-white/5">
                   <NestedNotesAccordion langData={langData} />
                </div>
            </GlassCard>
        </div>
    );
};

/* --- Sub Components --- */

const MinimalToolBtn: React.FC<{ onClick: () => void, icon: React.ReactNode, title: string }> = ({ onClick, icon, title }) => (
    <button 
        onClick={onClick}
        title={title}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 active:scale-90"
    >
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 18, strokeWidth: 1.5 }) : icon}
    </button>
);

const SegmentOption: React.FC<{ isActive: boolean, onClick: () => void, label: string, sub: string, activeColor: string }> = ({ isActive, onClick, label, sub, activeColor }) => (
    <button 
        onClick={onClick}
        className={`flex-1 flex flex-col items-center justify-center py-3 rounded-[20px] transition-all duration-300 relative group
        ${isActive 
            ? activeColor 
            : 'text-gray-500 dark:text-gray-500 hover:bg-black/5 dark:hover:bg-white/5'
        }`}
    >
        <span className={`text-[11px] font-bold transition-colors ${isActive ? '' : 'group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>{label}</span>
        {isActive && <span className="text-[9px] opacity-70 font-mono mt-0.5">{sub}</span>}
    </button>
);

const NestedNotesAccordion: React.FC<{ langData: I18nData }> = ({ langData }) => {
    const [mainOpen, setMainOpen] = useState(false);

    return (
        <div className="">
            <button 
                onClick={() => setMainOpen(!mainOpen)}
                className="w-full flex justify-between items-center py-2 group select-none"
            >
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors uppercase tracking-wider">
                    {langData.notesTitle}
                </span>
                <div className={`w-6 h-6 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center transition-all duration-300 ${mainOpen ? 'bg-gray-200 dark:bg-white/20 rotate-180' : ''} shadow-sm group-hover:shadow-md`}>
                     {mainOpen ? <IconMinus size={12} className="text-gray-600 dark:text-gray-300"/> : <IconPlus size={12} className="text-gray-500 dark:text-gray-400"/>}
                </div>
            </button>

            <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mainOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-2 pt-2 pb-2 px-1">
                        {langData.noteItems.map((note, idx) => (
                            <SingleNoteItem key={idx} question={note.question} answer={note.answer} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SingleNoteItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`
            rounded-2xl transition-all duration-300 overflow-hidden border
            ${isOpen 
                ? 'bg-white/80 border-blue-200/50 dark:bg-white/10 dark:border-white/10' 
                : 'bg-white/40 border-white/50 hover:bg-white/60 dark:bg-white/5 dark:border-white/20 dark:hover:bg-white/10'
            }
        `}>
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 text-right rtl:text-right ltr:text-left gap-3 relative z-10"
            >
                <span className={`text-[10px] font-semibold leading-tight transition-colors duration-300 ${isOpen ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    {question}
                </span>
                <span className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gray-600 dark:text-gray-300' : ''}`}>
                    <IconPlus size={10} strokeWidth={3} className={isOpen ? 'hidden' : 'block'} />
                    <IconMinus size={10} strokeWidth={3} className={isOpen ? 'block' : 'hidden'} />
                </span>
            </button>
            
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="px-3 pb-3 pt-0 text-[10px] leading-relaxed text-gray-500 dark:text-gray-400">
                        <div dangerouslySetInnerHTML={{ __html: answer }} className="[&>ul]:list-disc [&>ul]:pr-4 rtl:[&>ul]:pr-4 ltr:[&>ul]:pl-4 opacity-90 marker:text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

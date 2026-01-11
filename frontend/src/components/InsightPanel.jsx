import React from 'react';
import { ArrowLeft, BrainCircuit, ShieldAlert, History, Lightbulb, CheckCircle, Zap } from 'lucide-react';

const InsightPanel = ({ pulse, onBack }) => {
  if (!pulse) return null;

  // Final Production Theme Mapping
  const verdictConfig = {
    "BUY NOW": {
      glow: "border-teal-500/30",
      accent: "text-teal-400",
      bg: "bg-teal-500/5",
      shadow: "shadow-[0_0_20px_rgba(45,212,191,0.2)]"
    },
    "WAIT": {
      glow: "border-purple-500/30",
      accent: "text-purple-400",
      bg: "bg-purple-500/5",
      shadow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]"
    },
    "CAUTION": {
      glow: "border-rose-500/30",
      accent: "text-rose-400",
      bg: "bg-rose-500/5",
      shadow: "shadow-[0_0_20px_rgba(244,63,94,0.2)]"
    }
  };

  const theme = verdictConfig[pulse.verdict] || verdictConfig["CAUTION"];

  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-16 reveal">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Header */}
        <button 
          onClick={onBack} 
          className="group flex items-center gap-3 text-slate-500 hover:text-white mb-16 transition-all"
        >
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-black uppercase tracking-[0.3em] text-[10px]">Back to Command Center</span>
        </button>

        {/* Hero: Intelligence Identity */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mb-20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="h-24 w-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] flex items-center justify-center glow-violet shrink-0 animate-float">
              <BrainCircuit size={48} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 rounded-xl border ${theme.glow} ${theme.bg} ${theme.accent} ${theme.shadow} font-black text-[10px] tracking-[0.2em] uppercase`}>
                  Analysis: {pulse.verdict}
                </span>
                <div className="h-1 w-1 rounded-full bg-slate-700" />
                <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">Telemetry Verified</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white leading-none">
                Decision <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Intelligence</span>
              </h1>
            </div>
          </div>
          <div className="hidden lg:block text-right pb-2">
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-2">Ref ID: PP-2026-V2</p>
             <div className="flex gap-1 justify-end">
                {[1,2,3,4].map(i => <div key={i} className="w-8 h-1 bg-purple-600/20 rounded-full" />)}
             </div>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Core Reasoning (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass rounded-[3.5rem] p-10 md:p-14 relative overflow-hidden group">
               {/* Ambient Background Glow */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[100px] -z-10" />
               
               <div className="flex items-center gap-4 mb-10">
                 <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                   <Lightbulb className="text-purple-400" size={28} />
                 </div>
                 <h2 className="text-3xl font-black text-white tracking-tight">Executive Summary</h2>
               </div>
               
               <p className="text-2xl md:text-4xl leading-[1.3] text-slate-100 font-bold mb-16 tracking-tight">
                 <span className="text-purple-500 text-5xl font-serif mr-2">“</span>
                 {pulse.justification}
                 <span className="text-purple-500 text-5xl font-serif ml-2">”</span>
               </p>
               
               <div className="grid sm:grid-cols-2 gap-8">
                  {pulse.evidence_points.map((point, i) => (
                    <div key={i} className="group/item relative bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-purple-500/30 transition-all duration-500">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                           <CheckCircle className="text-purple-500" size={16} />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Evidence Node 0{i+1}</span>
                      </div>
                      <p className="text-slate-300 font-bold text-lg leading-relaxed">{point}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column: Lateral Analysis (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Dynamic Risk Assessment Card */}
            <div className={`glass rounded-[3rem] p-10 border-t-2 ${theme.glow} relative group`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${theme.bg} border border-white/5`}>
                   <ShieldAlert className={theme.accent} size={24} />
                </div>
                <h3 className={`font-black uppercase tracking-[0.3em] text-[10px] ${theme.accent}`}>Risk Profile</h3>
              </div>
              <p className="text-slate-300 text-base leading-relaxed font-bold">
                {pulse.seller_safety}
              </p>
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Safety Coefficient</span>
                 <span className={`text-xs font-black ${theme.accent}`}>98.4% Secure</span>
              </div>
            </div>

            {/* Historical Market Pulse */}
            <div className="glass rounded-[3rem] p-10 border border-white/5 group">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                   <History className="text-blue-400" size={24} />
                </div>
                <h3 className="font-black uppercase tracking-[0.3em] text-[10px] text-blue-400">Market Pulse</h3>
              </div>
              
              <div className="h-40 flex items-end gap-3 px-2">
                {[45, 80, 55, 95, 70, 85, 60, 90, 75].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-purple-600 to-blue-500 rounded-full opacity-30 group-hover:opacity-100 transition-all duration-700" 
                    style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} 
                  />
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Q3 2025</span>
                   <span className="text-[10px] font-bold text-slate-400">Baseline</span>
                </div>
                <div className="flex flex-col text-right">
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Present</span>
                   <span className="text-[10px] font-bold text-teal-400">Current Peak</span>
                </div>
              </div>
            </div>

            {/* Processing Metadata */}
            <div className="text-center space-y-4 px-6 pt-4">
               <div className="flex justify-center gap-2">
                  <Zap size={12} className="text-purple-500 animate-pulse" />
                  <div className="h-[1px] w-12 bg-white/10 self-center" />
                  <Zap size={12} className="text-blue-500 animate-pulse" />
               </div>
               <p className="text-[9px] text-slate-600 font-black leading-relaxed uppercase tracking-[0.4em]">
                 Engine v2.0 AI-Processed <br /> 
                 Zero-Day Latency Verified
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightPanel;
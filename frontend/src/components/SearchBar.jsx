import React, { useState } from 'react';
import { Search, Zap, Loader2 } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [val, setVal] = useState('');

  const trigger = (e) => {
    e.preventDefault();
    if (val) onSearch(val);
  };

  return (
    <form onSubmit={trigger} className="relative max-w-3xl mx-auto reveal">
      {/* Dynamic Background Glow behind the bar */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
      
      <div className="relative flex items-center glass rounded-[2.5rem] p-2 border border-white/10 transition-all duration-500 focus-within:border-purple-500/50">
        
        {/* Search Icon Decor */}
        <div className="pl-6 text-slate-500">
          <Search size={22} strokeWidth={2.5} />
        </div>

        <input 
          type="text" 
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Try 'Sony XM5' or paste product link..."
          className="flex-1 bg-transparent px-4 py-4 text-xl outline-none text-white placeholder:text-slate-500 font-medium"
        />

        {/* Action Button */}
        <button 
          type="submit"
          className="group relative bg-purple-600 text-white px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 overflow-hidden transition-all active:scale-95 glow-violet"
        >
          {/* Internal Shine Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          <Zap size={20} fill="white" className="group-hover:animate-pulse" />
          <span className="tracking-widest uppercase text-sm">Pulse Check</span>
        </button>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="flex justify-center gap-4 mt-6 opacity-60">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trending:</span>
        {['Sony XM5', 'iPhone 15', 'MacBook Air'].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setVal(item)}
            className="text-[10px] font-bold text-purple-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            {item}
          </button>
        ))}
      </div>
    </form>
  );
};

export default SearchBar;
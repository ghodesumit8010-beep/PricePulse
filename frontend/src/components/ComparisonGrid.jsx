import React from 'react';
import { Tag, Zap, Star, ExternalLink, Sparkles, Shield } from 'lucide-react';

const ComparisonGrid = ({ items, onAnalyze }) => {
  // Safety check: Ensure items and platforms exist and have valid data
  if (!items || !items.platforms || items.platforms.length === 0) return null;

  return (
    <div className="space-y-24 py-10 reveal">
      
      {/* Dynamic Grid Matrix: Center-aligned and responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        {items.platforms.map((p, i) => {
          // Determine the brand color dynamically
          const getTheme = (platform, badge) => {
            const platformName = platform.toLowerCase();
            const badgeType = badge?.toLowerCase() || '';
            
            if (badgeType.includes('verified')) {
              return { 
                color: "from-emerald-500 to-emerald-600",
                text: "text-emerald-400",
                border: "border-emerald-500/30",
                bg: "bg-emerald-500/20"
              };
            }
            if (platformName.includes('amazon')) {
              return { 
                color: "from-orange-500 to-orange-600",
                text: "text-orange-400", 
                border: "border-orange-500/30",
                bg: "bg-orange-500/20"
              };
            }
            if (platformName.includes('flipkart')) {
              return { 
                color: "from-blue-500 to-cyan-600",
                text: "text-blue-400",
                border: "border-blue-500/30",
                bg: "bg-blue-500/20"
              };
            }
            if (platformName.includes('reliance')) {
              return { 
                color: "from-red-500 to-red-600",
                text: "text-red-400",
                border: "border-red-500/30",
                bg: "bg-red-500/20"
              };
            }
            if (platformName.includes('myntra')) {
              return { 
                color: "from-pink-500 to-pink-600",
                text: "text-pink-400",
                border: "border-pink-500/30",
                bg: "bg-pink-500/20"
              };
            }
            if (badgeType.includes('market')) {
              return { 
                color: "from-blue-500 to-blue-600",
                text: "text-blue-400",
                border: "border-blue-500/30",
                bg: "bg-blue-500/20"
              };
            }
            if (badgeType.includes('predicted') || badgeType.includes('sale')) {
              return { 
                color: "from-amber-500 to-amber-600",
                text: "text-amber-400",
                border: "border-amber-500/30",
                bg: "bg-amber-500/20"
              };
            }
            if (badgeType.includes('retailer')) {
              return { 
                color: "from-purple-500 to-purple-600",
                text: "text-purple-400",
                border: "border-purple-500/30",
                bg: "bg-purple-500/20"
              };
            }
            if (badgeType.includes('stock') || badgeType.includes('ready')) {
              return { 
                color: "from-green-500 to-green-600",
                text: "text-green-400",
                border: "border-green-500/30",
                bg: "bg-green-500/20"
              };
            }
            return { 
              color: "from-purple-500 to-purple-600",
              text: "text-purple-400",
              border: "border-purple-500/30",
              bg: "bg-purple-500/20"
            };
          };

          const theme = getTheme(p.platform, p.badge);

          return (
            <div 
              key={i} 
              className="glass rounded-2xl p-6 hover:scale-[1.03] transition-all duration-500 group relative overflow-hidden border border-white/5 hover:border-purple-500/30"
            >
              {/* Badge Position - Top Right */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${theme.border} ${theme.bg} ${theme.text}`}>
                  {p.badge || "Verified Deal"}
                </span>
              </div>

              {/* Platform Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${theme.color}`}>
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    {p.platform}
                  </h3>
                  {p.rating && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, idx) => (
                          <Star 
                            key={idx}
                            size={12}
                            className={idx < Math.floor(p.rating) ? 
                              "fill-amber-400 text-amber-400" : 
                              "fill-slate-700 text-slate-700"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-400">
                        {p.rating === "Live" ? "Live" : 
                         typeof p.rating === 'number' ? p.rating.toFixed(1) : 
                         p.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">LIVE TARGET</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-white">
                    ₹{p.price.toLocaleString()}
                  </span>
                  {/* Show price difference for competitors */}
                  {i > 0 && items.platforms[0] && (
                    <span className={`text-sm font-bold px-2 py-1 rounded ${
                      p.price < items.platforms[0].price ? 
                      'bg-emerald-500/20 text-emerald-400' : 
                      'bg-rose-500/20 text-rose-400'
                    }`}>
                      {p.price < items.platforms[0].price ? '↓' : '↑'} 
                      ₹{Math.abs(p.price - items.platforms[0].price).toLocaleString()}
                    </span>
                  )}
                </div>
                
                {/* Value Assurance Indicator */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">VALUE ASSURANCE</p>
                    <Shield size={12} className="text-emerald-400" />
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${theme.color.split(' ')[0]} ${theme.color.split(' ')[1]}`}
                      style={{ 
                        width: `${p.badge?.includes('Verified') ? '95' : 
                                p.badge?.includes('Market') ? '88' : 
                                p.badge?.includes('Predicted') ? '82' : 
                                '85'}%`,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full glass py-3.5 px-4 rounded-xl hover:border-purple-500/50 transition-all duration-300 overflow-hidden group/btn border border-white/10 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white tracking-wide">EXPLORE STORE</span>
                  <ExternalLink size={16} className="text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                </div>
              </button>

              {/* Market Telemetry */}
              <div className="pt-6 border-t border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">MARKET TELEMETRY</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">
                      {p.badge?.includes('Verified Live') ? 'Direct Source • Live Feed' :
                       p.badge?.includes('Market Match') ? 'Price Matched • 24h Stable' :
                       p.badge?.includes('Predicted Sale') ? 'AI Predicted • High Confidence' :
                       p.badge?.includes('In Stock') ? 'Fulfilled by Amazon • Prime' :
                       p.badge?.includes('Sale Ready') ? 'Flipkart Assured • Free Delivery' :
                       p.badge?.includes('Retailer') ? 'Verified Retailer • Secure Payment' :
                       'Verified Retailer • Secure Payment'}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decision Intelligence Trigger - KEEPING ORIGINAL STRUCTURE */}
      <div className="flex flex-col items-center justify-center pt-24 border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-purple-600/10 blur-[120px] -z-10" />

        <div className="flex items-center gap-2.5 mb-8 text-purple-400 font-black uppercase tracking-[0.4em] text-[10px] bg-purple-400/10 px-4 py-1.5 rounded-full border border-purple-400/20">
           <Zap size={14} fill="currentColor" />
           Decision Intelligence Active
        </div>
        
        <h4 className="text-white text-4xl md:text-5xl font-black mb-12 tracking-tighter text-center leading-[1.1]">
           Should you pull the <br /> 
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">trigger today?</span>
        </h4>
        
        <button 
          onClick={onAnalyze}
          className="group relative px-20 py-7 bg-purple-600 rounded-[2.5rem] font-black text-2xl text-white flex items-center gap-4 glow-violet hover:scale-105 transition-all active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Zap size={28} fill="white" className="group-hover:animate-pulse" />
          ANALYZE FURTHER
        </button>
        
        <div className="mt-12 flex items-center gap-6 opacity-40">
           <div className="h-px w-12 bg-slate-500" />
           <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em]">
             Powered by PricePulse reasoning engine v2.0
           </p>
           <div className="h-px w-12 bg-slate-500" />
        </div>
      </div>
    </div>
  );
};

export default ComparisonGrid;
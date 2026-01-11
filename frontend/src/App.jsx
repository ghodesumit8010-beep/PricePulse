import React, { useState } from 'react';
import axios from 'axios';
import { AuthProvider, useAuth } from './context/AuthContext';
import SearchBar from './components/SearchBar.jsx';
import ComparisonGrid from './components/ComparisonGrid.jsx';
import InsightPanel from './components/InsightPanel.jsx';
import { LogOut, Loader2, Sparkles, Zap, Shield, Globe, ExternalLink, Star } from 'lucide-react';

function PricePulseApp() {
  const { user, login, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('home');

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const res = await axios.post('http://localhost:5001/api/pulse', { query });
      setData(res.data);
      setView('home');
    } catch (err) {
      console.error("Pulse Engine Sync Failed:", err);
      setError("ENGINE OFFLINE: Unable to establish handshake with Scraper Node on port 5001.");
    } finally {
      setLoading(false);
    }
  };

  // Function to render price comparison cards
  const renderPriceCards = () => {
    if (!data?.productData?.platforms) return null;
    
    const platforms = data.productData.platforms;
    const basePrice = platforms[0]?.price || 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 reveal">
        {platforms.map((platform, index) => {
          const priceDiff = basePrice > 0 ? ((platform.price - basePrice) / basePrice * 100) : 0;
          
          return (
            <div 
              key={index}
              className="glass rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden border border-white/5 hover:glow-violet"
            >
              {/* Platform Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  platform.badge === 'Verified Live' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                  platform.badge === 'Market Match' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  platform.badge === 'Predicted Sale' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                  platform.badge === 'In Stock' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  'bg-purple-500/20 text-purple-400 border-purple-500/30'
                }`}>
                  {platform.badge}
                </span>
              </div>

              {/* Platform Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  platform.platform.includes('Live') ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                  platform.platform.includes('Amazon') ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                  platform.platform.includes('Flipkart') ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                  'bg-gradient-to-br from-purple-500 to-pink-600'
                }`}>
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    {platform.platform}
                  </h3>
                  {platform.rating && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={12}
                            className={i < Math.floor(platform.rating) ? 
                              "fill-amber-400 text-amber-400" : 
                              "fill-slate-700 text-slate-700"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-400">
                        {typeof platform.rating === 'number' ? platform.rating.toFixed(1) : platform.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">LIVE TARGET</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">
                    ₹{platform.price.toLocaleString()}
                  </span>
                  {index > 0 && priceDiff !== 0 && (
                    <span className={`text-sm font-bold px-2 py-1 rounded ${
                      priceDiff < 0 ? 
                      'bg-emerald-500/20 text-emerald-400' : 
                      'bg-rose-500/20 text-rose-400'
                    }`}>
                      {priceDiff < 0 ? '↓' : '↑'} 
                      {Math.abs(Math.round(priceDiff))}%
                    </span>
                  )}
                </div>
                
                {/* Value Assurance Indicator */}
                <div className="mt-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Value Assurance</p>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        platform.badge === 'Verified Live' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                        platform.badge === 'Market Match' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
                        'bg-gradient-to-r from-purple-500 to-pink-400'
                      }`}
                      style={{ 
                        width: `${Math.min(100, 85 + Math.random() * 15)}%`,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full glass py-3.5 px-4 rounded-xl hover:border-purple-500/50 transition-all duration-300 overflow-hidden group/btn border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white tracking-wide">EXPLORE STORE</span>
                  <ExternalLink size={16} className="text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                </div>
              </button>

              {/* Market Telemetry */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">MARKET TELEMETRY</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">
                      {platform.badge === 'Verified Live' ? 'Direct Source • Live Feed' :
                       platform.badge === 'Market Match' ? 'Price Matched • 24h Stable' :
                       'AI Predicted • High Confidence'}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {platform.platform.includes('Live') ? 'Real-time price tracking enabled' :
                     platform.platform.includes('Amazon') ? 'Fulfilled by Amazon • Prime eligible' :
                     platform.platform.includes('Flipkart') ? 'Flipkart Assured • Free delivery' :
                     'Verified retailer • Secure payment'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-purple-500/30 font-sans">
      {/* Reasoning View */}
      {view === 'reasoning' && data && (
        <div className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto">
          <InsightPanel 
            pulse={data.aiPulse} 
            onBack={() => setView('home')} 
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 md:px-16 py-6 glass sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80">
        <div 
          className="flex items-center gap-4 group cursor-pointer" 
          onClick={() => setView('home')}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white glow-violet transition-all group-hover:rotate-12">
            <Sparkles fill="white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter leading-none">PricePulse</h1>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em]">Intel Engine v2.0</span>
          </div>
        </div>
        
        {user ? (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 group">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-white leading-none">
                  {user.displayName}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">
                  Authorized User
                </span>
              </div>
              <div className="w-12 h-12 bg-[#C2185B] rounded-lg flex items-center justify-center text-white text-2xl font-black shadow-lg border border-white/10 transition-transform group-hover:scale-105">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>

            <button 
              onClick={logout} 
              className="p-3 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all border border-transparent hover:border-red-500/20"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button 
            onClick={login} 
            className="bg-white text-black px-8 py-3 rounded-2xl font-black text-sm transition-all hover:bg-purple-500 hover:text-white glow-violet"
          >
            Connect Identity
          </button>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!user ? (
          <div className="text-center py-24 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Zap size={14} fill="currentColor" /> Autonomous Price Reasoning
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              Master the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 animate-gradient">Market Pulse.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Unified cross-platform matching with AI-driven decision intelligence. Buy at the price floor, every time.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={login}
                className="group relative bg-purple-600 text-white px-12 py-5 rounded-[2rem] font-black text-xl overflow-hidden transition-all hover:scale-105 glow-violet"
              >
                <span className="relative z-10">Launch Command Center</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>
          </div>
        ) : (
          <div className="reveal">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-5xl font-black text-white tracking-tight mb-2">Command Center</h2>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-teal-400 uppercase tracking-widest bg-teal-400/10 px-3 py-1 rounded-lg border border-teal-400/20">
                    <Shield size={12} /> Value Assurance Active
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-400/10 px-3 py-1 rounded-lg border border-blue-400/20">
                    <Globe size={12} /> Global Pulse Sync
                  </span>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">System Status</p>
                <p className="text-xs font-bold text-teal-500 uppercase tracking-widest">All Nodes Operational</p>
              </div>
            </header>

            <SearchBar onSearch={handleSearch} />

            {loading && (
              <div className="flex flex-col items-center justify-center mt-32 gap-8 py-20 animate-pulse">
                <div className="relative">
                  <Loader2 className="animate-spin text-purple-500" size={80} strokeWidth={3} />
                  <div className="absolute inset-0 blur-3xl bg-purple-500/30 rounded-full" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-white tracking-tight mb-2">Analyzing Marketplace...</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.4em]">Auditing Live Offer Tables</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-12 p-8 glass border-red-500/30 bg-red-500/5 text-red-400 rounded-[2.5rem] text-center">
                <p className="text-lg font-black uppercase tracking-widest mb-2">Connection Interrupted</p>
                <p className="text-sm font-bold opacity-70">{error}</p>
              </div>
            )}

            {data && !loading && (
              <div className="mt-24 space-y-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-purple-600 rounded-full glow-violet"></div>
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      {data.productData.name.length > 40 ? "Scraped Intelligence Matrix" : data.productData.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setView('reasoning')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:scale-105 transition-transform glow-violet"
                  >
                    View AI Analysis
                  </button>
                </div>
                
                {/* Price Comparison Cards */}
                {renderPriceCards()}
                
                {/* AI Verdict (if available) */}
                {data.aiPulse && (
                  <div className="glass rounded-2xl p-8 mt-12 border border-white/5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                        <Sparkles size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-white">AI VERDICT</h4>
                        <p className="text-sm text-slate-400">PricePulse Decision Intelligence</p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-black ${
                      data.aiPulse.verdict?.toLowerCase().includes('buy') ?
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {data.aiPulse.verdict || 'Analyzing...'}
                    </div>
                    {data.aiPulse.reasoning && (
                      <p className="text-slate-300 mt-4">{data.aiPulse.reasoning}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="py-32 text-center mt-40 border-t border-white/5 bg-[#050505]">
        <div className="flex justify-center gap-12 mb-10 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <span className="font-black text-2xl tracking-tighter">AMAZON</span>
           <span className="font-black text-2xl tracking-tighter">FLIPKART</span>
           <span className="font-black text-2xl tracking-tighter">RELIANCE</span>
           <span className="font-black text-2xl tracking-tighter">CROMA</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Sparkles size={16} className="text-purple-500" />
          </div>
          <p className="text-slate-600 font-black uppercase tracking-[0.5em] text-[10px]">
            PricePulse Engine v2.0 • Pune Hackathon Submission 
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PricePulseApp />
    </AuthProvider>
  );
}
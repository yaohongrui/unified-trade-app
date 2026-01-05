import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  Wallet, 
  Activity, 
  Check, 
  Search, 
  Star, 
  X,
  Settings,
  Zap,
  ChevronDown,
  TrendingUp
} from 'lucide-react';

// 模拟的收藏数据
const MOCK_FAVORITES = {
  binance: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'DOGE/USDT'],
  bybit: ['BTC/USDT', 'ETH/USDT', 'XRP/USDT', '1000PEPE/USDT']
};

export const DashboardMockup = () => {
  const [symbol, setSymbol] = useState('BTC/USDT');
  const [price, setPrice] = useState(68420.50);
  const [isSymbolModalOpen, setIsSymbolModalOpen] = useState(false);
  const [favTab, setFavTab] = useState<'binance' | 'bybit'>('binance');
  
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [targets, setTargets] = useState({ binance: true, bybit: true });
  const [leverage, setLeverage] = useState(20);
  const [autoCancel, setAutoCancel] = useState(true); // 默认开启
  
  // 模拟价格跳动
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(p => p + (Math.random() - 0.5) * 10);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTarget = (key: 'binance' | 'bybit') => {
    setTargets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* 顶部行情栏 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex items-center justify-between shadow-lg">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition-colors group"
          onClick={() => setIsSymbolModalOpen(true)}
        >
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{symbol}</h2>
              <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
            </div>
            <div className="text-xs text-slate-500 flex gap-2">
              <span className="bg-slate-800 px-1.5 rounded text-slate-400">Perpetual</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
           <div className={`text-2xl font-mono font-bold flex items-center gap-2 ${price > 68420 ? 'text-emerald-400' : 'text-rose-400'}`}>
             {price.toFixed(2)}
             {price > 68420 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
           </div>
           <div className="text-xs text-slate-500">Mark Price</div>
        </div>
      </div>

      {/* 标的选择弹窗 */}
      {isSymbolModalOpen && (
        <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-sm rounded-xl p-4 flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Select Symbol</h3>
            <button onClick={() => setIsSymbolModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search coin..." className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500" />
          </div>

          <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
             <button 
               onClick={() => setFavTab('binance')}
               className={`pb-2 text-sm font-bold transition-colors ${favTab === 'binance' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-500'}`}
             >
               Binance Favs
             </button>
             <button 
               onClick={() => setFavTab('bybit')}
               className={`pb-2 text-sm font-bold transition-colors ${favTab === 'bybit' ? 'text-white border-b-2 border-slate-500' : 'text-slate-500'}`}
             >
               Bybit Favs
             </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {MOCK_FAVORITES[favTab].map((s) => (
              <button 
                key={s}
                onClick={() => { setSymbol(s); setIsSymbolModalOpen(false); }}
                className="w-full flex items-center justify-between p-3 hover:bg-slate-800 rounded-lg group transition-colors"
              >
                <span className="font-mono text-slate-200 font-bold">{s}</span>
                <Star className="w-4 h-4 text-yellow-500/50 group-hover:text-yellow-500 fill-current" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            
            {/* Target & Leverage Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Targets</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleTarget('binance')}
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition-all text-sm font-bold ${targets.binance ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500' : 'border-slate-800 bg-slate-950 text-slate-600'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${targets.binance ? 'bg-yellow-500' : 'bg-slate-700'}`} />
                    Binance
                  </button>
                  <button 
                    onClick={() => toggleTarget('bybit')}
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition-all text-sm font-bold ${targets.bybit ? 'border-slate-400/30 bg-slate-400/10 text-slate-200' : 'border-slate-800 bg-slate-950 text-slate-600'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${targets.bybit ? 'bg-slate-200' : 'bg-slate-700'}`} />
                    Bybit
                  </button>
                </div>
              </div>
              
              <div className="w-full sm:w-32">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block flex justify-between">
                  Leverage
                  <span className="text-indigo-400 cursor-pointer hover:underline">Edit</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={leverage}
                    onChange={(e) => setLeverage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-3 pr-8 text-white font-mono font-bold focus:border-indigo-500 focus:outline-none" 
                  />
                  <span className="absolute right-3 top-2 text-slate-500 font-bold">x</span>
                </div>
              </div>
            </div>

            {/* Order Settings */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-lg">
                <button 
                  onClick={() => setSide('buy')}
                  className={`py-2 text-sm font-bold rounded-md transition-all ${side === 'buy' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Buy / Long
                </button>
                <button 
                  onClick={() => setSide('sell')}
                  className={`py-2 text-sm font-bold rounded-md transition-all ${side === 'sell' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Sell / Short
                </button>
              </div>

              <div className="flex gap-2">
                 <button 
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-all ${orderType === 'limit' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 'border-slate-800 text-slate-500'}`}
                >
                  Limit
                </button>
                 <button 
                  onClick={() => setOrderType('market')}
                  className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-all ${orderType === 'market' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 'border-slate-800 text-slate-500'}`}
                >
                  Market
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {orderType === 'limit' && (
                  <div className="col-span-2">
                    <label className="text-xs text-slate-500 block mb-1">Price (USDT)</label>
                    <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white font-mono focus:border-indigo-500 focus:outline-none" placeholder={price.toFixed(2)} />
                  </div>
                )}
                <div className="col-span-2">
                  <label className="text-xs text-slate-500 block mb-1">Amount ({symbol.split('/')[0]})</label>
                  <div className="relative">
                     <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white font-mono focus:border-indigo-500 focus:outline-none" placeholder="0.01" />
                     <div className="absolute right-2 top-2 flex gap-1">
                        <button className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 hover:text-white">25%</button>
                        <button className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 hover:text-white">50%</button>
                     </div>
                  </div>
                </div>
              </div>

              {/* Advanced TP/SL Section */}
              <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> TP / SL
                  </span>
                  <div className="flex items-center gap-2">
                     <label 
                       className="flex items-center gap-1 cursor-pointer group"
                       onClick={() => setAutoCancel(!autoCancel)}
                     >
                        <div className={`w-3 h-3 border border-slate-600 rounded flex items-center justify-center transition-colors ${autoCancel ? 'bg-indigo-500/20 border-indigo-500' : ''}`}>
                          <Check className={`w-2 h-2 text-indigo-400 ${autoCancel ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                        <span className={`text-[10px] transition-colors ${autoCancel ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>Auto-cancel on close</span>
                     </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                     <div className="flex justify-between mb-1">
                        <label className="text-[10px] text-emerald-500">Take Profit</label>
                        <select className="bg-transparent text-[10px] text-slate-500 outline-none">
                          <option>Limit</option>
                          <option>Market</option>
                        </select>
                     </div>
                     <input type="number" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono focus:border-emerald-500/50 focus:outline-none" placeholder="TP Price" />
                  </div>
                  <div>
                     <div className="flex justify-between mb-1">
                        <label className="text-[10px] text-rose-500">Stop Loss</label>
                        <select className="bg-transparent text-[10px] text-slate-500 outline-none">
                          <option>Market</option>
                          <option>Limit</option>
                        </select>
                     </div>
                     <input type="number" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono focus:border-rose-500/50 focus:outline-none" placeholder="SL Price" />
                  </div>
                </div>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-lg mt-2 shadow-lg transition-transform active:scale-95 ${side === 'buy' ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20' : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'}`}>
                {side === 'buy' ? 'Open Long' : 'Open Short'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Positions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 text-xs font-bold uppercase">Live Positions</span>
            </div>
            <button className="text-xs text-slate-500 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-1 rounded transition-colors">
              <RefreshCw className="w-3 h-3" /> Sync
            </button>
          </div>

          {/* Position Card 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
             <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
             <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">BTC/USDT</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">20x</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Binance
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold font-mono text-sm">+$124.50</div>
                  <div className="text-[10px] text-emerald-500/70">+15.2%</div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-2 text-xs mt-3 pt-3 border-t border-slate-800/50">
               <div>
                 <span className="text-slate-500 block text-[10px] uppercase">Entry</span>
                 <span className="text-slate-300 font-mono">67,500</span>
               </div>
               <div className="text-right">
                 <span className="text-slate-500 block text-[10px] uppercase">Size</span>
                 <span className="text-slate-300 font-mono">0.1 BTC</span>
               </div>
             </div>
             <div className="mt-3 flex gap-2">
               <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs py-1.5 rounded text-slate-300">TP/SL</button>
               <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs py-1.5 rounded text-slate-300">Close</button>
             </div>
          </div>

          {/* Position Card 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
             <div className="absolute top-0 left-0 w-1 h-full bg-slate-200"></div>
             <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">ETH/USDT</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">10x</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div> Bybit
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-rose-400 font-bold font-mono text-sm">-$12.40</div>
                  <div className="text-[10px] text-rose-500/70">-2.1%</div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-2 text-xs mt-3 pt-3 border-t border-slate-800/50">
               <div>
                 <span className="text-slate-500 block text-[10px] uppercase">Entry</span>
                 <span className="text-slate-300 font-mono">3,450</span>
               </div>
               <div className="text-right">
                 <span className="text-slate-500 block text-[10px] uppercase">Size</span>
                 <span className="text-slate-300 font-mono">1.5 ETH</span>
               </div>
             </div>
             <div className="mt-3 flex gap-2">
               <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs py-1.5 rounded text-slate-300">TP/SL</button>
               <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs py-1.5 rounded text-slate-300">Close</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Copy, Terminal } from 'lucide-react';

export const BackendBlueprint = () => {
  const pythonCode = `
# main.py
# 部署在你的 Azure Server 上
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ccxt.async_support as ccxt
import asyncio
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# 允许你的 React 前端访问 (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 生产环境建议替换为你的前端域名
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化交易所实例
def get_exchange(name):
    config = {
        'apiKey': os.getenv(f"{name.upper()}_API_KEY"),
        'secret': os.getenv(f"{name.upper()}_SECRET"),
        'enableRateLimit': True,
        'options': {'defaultType': 'future'}, # 默认做合约
    }
    if name == 'binance':
        return ccxt.binance(config)
    elif name == 'bybit':
        return ccxt.bybit(config)
    return None

class OrderRequest(BaseModel):
    symbol: str
    side: str  # 'buy' or 'sell'
    amount: float
    price: float = None
    type: str = 'limit'
    exchanges: list[str] = ['binance', 'bybit'] # 默认全选

@app.get("/balance")
async def get_balance():
    """获取多交易所余额"""
    results = {}
    exchanges = ['binance', 'bybit']
    
    async def fetch_balance(exch_name):
        exchange = get_exchange(exch_name)
        try:
            balance = await exchange.fetch_balance()
            # 简化返回，只返回 USDT
            return exch_name, balance['total'].get('USDT', 0)
        except Exception as e:
            return exch_name, 0
        finally:
            await exchange.close()

    tasks = [fetch_balance(ex) for ex in exchanges]
    data = await asyncio.gather(*tasks)
    
    for name, balance in data:
        results[name] = balance
        
    return results

@app.post("/trade")
async def place_order(order: OrderRequest):
    """同时下单 (Broadcast)"""
    results = {}
    
    async def execute(exch_name):
        if exch_name not in order.exchanges:
            return
        
        exchange = get_exchange(exch_name)
        try:
            # CCXT 统一 API
            res = await exchange.create_order(
                symbol=order.symbol,
                type=order.type,
                side=order.side,
                amount=order.amount,
                price=order.price
            )
            results[exch_name] = {"status": "success", "id": res['id']}
        except Exception as e:
            results[exch_name] = {"status": "error", "msg": str(e)}
        finally:
            await exchange.close()

    tasks = [execute(name) for name in ['binance', 'bybit']]
    await asyncio.gather(*tasks)
    
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Backend Boilerplate</h2>
        <p className="text-slate-400 text-sm">
          这是你的 Azure 服务器需要的核心逻辑。使用 <code className="text-indigo-400">FastAPI</code> 和 <code className="text-indigo-400">ccxt</code>。
          它处理了 API 签名、异步请求和跨域问题。
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative group">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
            <Terminal className="w-4 h-4" />
            main.py
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4 overflow-x-auto">
          <pre className="text-xs md:text-sm font-mono text-indigo-100 leading-relaxed">
            {pythonCode}
          </pre>
        </div>
      </div>

      <div className="mt-6 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-sm text-amber-200">
        <strong>Vibe Coding 提示：</strong> 你可以将这段代码喂给 AI，并要求它："增加一个 /positions 接口来获取当前持仓，并确保 ccxt 配置支持合约交易 (future/swap)"。
      </div>
    </div>
  );
};
import React from 'react';
import { Copy, Terminal, Shield } from 'lucide-react';

export const BackendBlueprint = () => {
  const gitIgnoreCode = `
# .gitignore
# 这个文件告诉 Git 忽略哪些文件
# 放在项目根目录下

# Python
__pycache__/
*.py[cod]
venv/
.env  <-- 关键！绝对不能传这个

# Node / Frontend
node_modules/
dist/
.DS_Store
`;

  const pythonCode = `
# main.py
# 部署在你的 Azure Server 上 (backend/main.py)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ccxt.async_support as ccxt
import asyncio
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv() # 加载 .env 文件中的 API Key

app = FastAPI()

# 允许跨域 (CORS) - 生产环境建议把 allow_origins 改为你的 Vercel 域名
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# ... (Get Exchange & OrderRequest Code remains same) ...

# 初始化交易所实例
def get_exchange(name):
    config = {
        'apiKey': os.getenv(f"{name.upper()}_API_KEY"),
        'secret': os.getenv(f"{name.upper()}_SECRET"),
        'enableRateLimit': True,
        'options': {'defaultType': 'future'},
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
    leverage: int = 20
    exchanges: list[str] = ['binance', 'bybit']

@app.get("/positions")
async def get_positions():
    """获取多交易所实时持仓"""
    results = {}
    async def fetch_pos(exch_name):
        exchange = get_exchange(exch_name)
        try:
            positions = await exchange.fetch_positions()
            # 过滤掉持仓量为 0 的标的
            active = [p for p in positions if float(p['contracts']) > 0]
            return exch_name, active
        except Exception as e:
            print(f"Error fetching {exch_name}: {e}")
            return exch_name, []
        finally:
            await exchange.close()

    tasks = [fetch_pos(name) for name in ['binance', 'bybit']]
    data = await asyncio.gather(*tasks)
    for name, pos in data:
        results[name] = pos
    return results

@app.post("/trade")
async def place_order(order: OrderRequest):
    """同时下单 (Broadcast) 并自动调整杠杆"""
    results = {}
    
    async def execute(exch_name):
        if exch_name not in order.exchanges:
            return
        
        exchange = get_exchange(exch_name)
        try:
            # 1. 尝试设置杠杆
            try:
                await exchange.set_leverage(order.leverage, order.symbol)
            except Exception as e:
                print(f"Set leverage failed for {exch_name}: {e}")

            # 2. 下单
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
    # 0.0.0.0 代表允许外部访问
    uvicorn.run(app, host="0.0.0.0", port=8000)
`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Backend Code & Security</h2>
        <p className="text-slate-400 text-sm">
          这是后端的核心代码。记得要在根目录创建一个 <code className="text-rose-400">.gitignore</code> 文件，防止私钥泄露。
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold">
            <Shield className="w-4 h-4" />
            .gitignore (MUST HAVE)
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <pre className="text-xs font-mono text-slate-300">
            {gitIgnoreCode}
          </pre>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative group">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
            <Terminal className="w-4 h-4" />
            backend/main.py
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
    </div>
  );
};
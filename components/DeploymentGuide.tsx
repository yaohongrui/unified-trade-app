import React from 'react';
import { Server, GitBranch, Globe, CloudLightning, Terminal, ShieldAlert, Command } from 'lucide-react';

export const DeploymentGuide = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">从代码到上线：详细实操指南</h2>
        <p className="text-slate-400 text-sm">
          这里是手把手的操作步骤。请在你的本地电脑（Win/Mac）上操作第1步，在 Azure 服务器上操作第2步。
        </p>
      </div>

      {/* 1. Local Setup & GitHub */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-indigo-500/20 pb-2">
           <GitBranch className="w-5 h-5" />
           <h3>1. 本地整理与上传 GitHub</h3>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950/50">
            <h4 className="font-bold text-white text-sm mb-1">第一步：创建文件夹结构</h4>
            <p className="text-xs text-slate-400">在你的电脑上新建一个文件夹 <code className="bg-slate-800 px-1 rounded">trade-sync</code>，然后照着下面建立文件：</p>
          </div>
          <div className="p-5 font-mono text-xs text-slate-300 space-y-2">
             <div className="pl-2 border-l-2 border-slate-700">trade-sync/</div>
             <div className="pl-6 border-l-2 border-indigo-500/30 text-indigo-300">backend/ <span className="text-slate-500 text-[10px] ml-2"># 放 Python 代码</span></div>
             <div className="pl-10 text-slate-400">main.py <span className="text-slate-600">// 把 App 里的 Python 代码复制进去</span></div>
             <div className="pl-10 text-slate-400">requirements.txt <span className="text-slate-600">// 内容: fastapi uvicorn ccxt python-dotenv</span></div>
             <div className="pl-10 text-rose-400">.env <span className="text-rose-500 font-bold ml-2">!!! 绝对不要上传到 GitHub !!!</span></div>
             <div className="pl-6 border-l-2 border-emerald-500/30 text-emerald-300 pt-2">frontend/ <span className="text-slate-500 text-[10px] ml-2"># 放 React 代码 (Vite)</span></div>
             <div className="pl-10 text-slate-400">src/ <span className="text-slate-600">// 放 App.tsx 和 components 文件夹</span></div>
             <div className="pl-10 text-slate-400">package.json</div>
             <div className="pl-2 border-l-2 border-slate-700 pt-2 text-slate-500">.gitignore <span className="text-slate-400 ml-2"># 必须包含: .env, node_modules, venv</span></div>
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-950/50">
            <h4 className="font-bold text-white text-sm mb-2">第二步：推送到 GitHub</h4>
            <div className="bg-black rounded-lg p-3 font-mono text-xs text-emerald-400 space-y-1">
              <p><span className="text-slate-500">$</span> git init</p>
              <p><span className="text-slate-500">$</span> git add .</p>
              <p><span className="text-slate-500">$</span> git commit -m "Initial commit"</p>
              <p><span className="text-slate-500">$</span> git branch -M main</p>
              <p><span className="text-slate-500">$</span> git remote add origin https://github.com/你的用户名/你的仓库.git</p>
              <p><span className="text-slate-500">$</span> git push -u origin main</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Backend Deployment */}
      <section className="space-y-4">
           <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-indigo-500/20 pb-2">
             <Server className="w-5 h-5" />
             <h3>2. 后端部署 (Azure/VPS)</h3>
           </div>
           
           <div className="grid gap-4">
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
               <div className="flex items-start gap-3">
                 <Terminal className="w-5 h-5 text-slate-400 mt-1" />
                 <div>
                   <h4 className="font-bold text-white text-sm">连接服务器</h4>
                   <p className="text-xs text-slate-400 mt-1">
                     在你的电脑终端输入：<code className="text-indigo-300">ssh azureuser@你的服务器IP</code>
                   </p>
                 </div>
               </div>
             </div>

             <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">服务器端指令 (逐行执行)</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Ubuntu/Debian</span>
                </div>
                <div className="bg-black p-4 font-mono text-xs space-y-2 overflow-x-auto">
                  <div className="group">
                    <span className="text-slate-500"># 1. 更新系统并安装 Python 工具</span><br/>
                    <span className="text-emerald-400">sudo apt update && sudo apt install python3-pip git -y</span>
                  </div>
                  <div className="group pt-2">
                    <span className="text-slate-500"># 2. 下载你的代码</span><br/>
                    <span className="text-emerald-400">git clone https://github.com/你的用户名/你的仓库.git</span><br/>
                    <span className="text-emerald-400">cd 你的仓库/backend</span>
                  </div>
                  <div className="group pt-2">
                    <span className="text-slate-500"># 3. 安装依赖</span><br/>
                    <span className="text-emerald-400">pip3 install -r requirements.txt</span>
                  </div>
                  <div className="group pt-2">
                    <span className="text-slate-500"># 4. 创建 .env 文件 (手动输入 API Key)</span><br/>
                    <span className="text-emerald-400">nano .env</span><br/>
                    <span className="text-slate-500 ml-4">-> 粘贴内容: BINANCE_API_KEY=xxx...</span><br/>
                    <span className="text-slate-500 ml-4">-> 按 Ctrl+X, 然后按 Y, 回车保存</span>
                  </div>
                  <div className="group pt-2">
                    <span className="text-slate-500"># 5. 后台运行 (关掉终端也能跑)</span><br/>
                    <span className="text-emerald-400">nohup uvicorn main:app --host 0.0.0.0 --port 8000 &</span>
                  </div>
                </div>
             </div>

             <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0" />
                <div className="text-xs text-yellow-200/80">
                  <strong className="text-yellow-500 block mb-1">防火墙设置 (关键)</strong>
                  如果不做这一步，你无法访问。去 Azure Portal -> 你的虚拟机 -> Networking (左侧菜单) -> Add inbound port rule -> Destination port ranges 填 <strong>8000</strong> -> Add.
                </div>
             </div>
           </div>
      </section>

      {/* 3. Frontend Deployment */}
      <section className="space-y-4">
           <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-emerald-500/20 pb-2">
             <Globe className="w-5 h-5" />
             <h3>3. 前端部署 (Vercel)</h3>
           </div>
           <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-sm text-slate-300 space-y-4">
              <p>
                前端稍微修改一下代码里的 URL。找到前端代码里请求后端的地方（通常是 fetch），把 <code className="bg-slate-800 px-1 rounded">http://localhost:8000</code> 改成你 Azure 的 IP <code className="bg-slate-800 px-1 rounded">http://123.45.67.89:8000</code>。
              </p>
              <ol className="list-decimal pl-5 space-y-2 marker:text-emerald-500">
                <li>注册/登录 <a href="https://vercel.com" target="_blank" className="text-emerald-400 underline">Vercel.com</a>。</li>
                <li>点击 <strong>Add New Project</strong>，导入你的 GitHub 仓库。</li>
                <li>在 <strong>Build & Output Settings</strong> 里的 <strong>Root Directory</strong>，点击 Edit 选择 <code className="font-mono text-emerald-300">frontend</code> 文件夹。</li>
                <li>点击 Deploy。等待 1 分钟，你就会获得一个全球可访问的网址。</li>
              </ol>
           </div>
      </section>

      {/* 4. Troubleshooting */}
      <section className="bg-slate-950 border border-slate-800 rounded-xl p-5">
         <h3 className="font-bold text-white mb-3 flex items-center gap-2">
           <Command className="w-4 h-4 text-slate-500" /> 
           常见问题
         </h3>
         <div className="space-y-3 text-xs text-slate-400">
           <div className="flex gap-2">
             <span className="bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded h-fit">报错</span>
             <p><strong>Mixed Content Error:</strong> 浏览器控制台显示 HTTPS 页面无法请求 HTTP 资源。<br/>
             <span className="text-slate-500">解决：最简单的办法是先不要用 Vercel 自动生成的 HTTPS，或者给你的 Azure 服务器配一个域名和 SSL 证书（进阶）。临时测试时，点击浏览器地址栏的小盾牌，允许加载不安全内容。</span></p>
           </div>
           <div className="flex gap-2">
             <span className="bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded h-fit">连不上</span>
             <p><strong>Connection Refused:</strong> <br/>
             <span className="text-slate-500">解决：检查 Azure 防火墙 8000 端口是否开了。检查后端是否正在运行 (`ps aux | grep uvicorn`)。</span></p>
           </div>
         </div>
      </section>

    </div>
  );
};
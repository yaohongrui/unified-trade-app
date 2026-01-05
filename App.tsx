import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Code2, 
  Rocket, 
  Terminal,
  Settings,
  RefreshCw
} from 'lucide-react';
import { DashboardMockup } from './components/DashboardMockup';
import { BackendBlueprint } from './components/BackendBlueprint';
import { DeploymentGuide } from './components/DeploymentGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState<'ui' | 'backend' | 'deploy'>('ui');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="text-indigo-500 w-5 h-5" />
            <h1 className="text-lg font-bold tracking-tight">TradeSync <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded ml-2">PHASE 2</span></h1>
          </div>
          <div className="flex gap-2">
             {/* Mobile/Desktop Tab Switcher */}
            <div className="flex bg-slate-800/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('ui')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'ui' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <LayoutDashboard className="w-3 h-3" />
                <span className="hidden sm:inline">UI Mockup</span>
              </button>
              <button
                onClick={() => setActiveTab('backend')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'backend' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Code2 className="w-3 h-3" />
                <span className="hidden sm:inline">Python Code</span>
              </button>
              <button
                onClick={() => setActiveTab('deploy')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'deploy' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Rocket className="w-3 h-3" />
                <span className="hidden sm:inline">Azure Setup</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        {activeTab === 'ui' && <DashboardMockup />}
        {activeTab === 'backend' && <BackendBlueprint />}
        {activeTab === 'deploy' && <DeploymentGuide />}
      </main>

      {/* Mobile Bottom Nav (Visual only, to simulate app feel) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 flex justify-around z-40 text-xs text-slate-500">
        <div className="flex flex-col items-center gap-1 text-indigo-400">
          <LayoutDashboard className="w-5 h-5" />
          <span>Trade</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RefreshCw className="w-5 h-5" />
          <span>Positions</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
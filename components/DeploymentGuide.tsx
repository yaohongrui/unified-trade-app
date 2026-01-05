import React from 'react';
import { Server, Layout, GitBranch, Globe, ArrowRight } from 'lucide-react';

export const DeploymentGuide = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Setup & Deployment</h2>
        <p className="text-slate-400 text-sm">
          是的，你完全可以将这些代码上传到 GitHub。这是一个标准的前后端分离项目。
        </p>
      </div>

      <div className="grid gap-6">
        
        {/* Repo Structure */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex gap-4">
            <div className="bg-
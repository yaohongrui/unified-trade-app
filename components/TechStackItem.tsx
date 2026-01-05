import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TechStackItemProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const TechStackItem: React.FC<TechStackItemProps> = ({ icon: Icon, title, desc }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl flex flex-col items-center text-center hover:bg-slate-800 transition-colors">
      <div className="p-3 bg-indigo-500/10 rounded-full mb-3">
        <Icon className="w-8 h-8 text-indigo-400" />
      </div>
      <h4 className="font-bold text-white mb-2">{title}</h4>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  );
};
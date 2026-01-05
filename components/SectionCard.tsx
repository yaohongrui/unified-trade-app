import React from 'react';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-200 mb-4">{title}</h3>
      <div className="text-slate-400 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};
import React from 'react';

export default function KanbanColumn({ title, count, children }) {
  return (
    <div className="flex flex-col w-[300px] shrink-0">
      <div className="flex items-center justify-between mb-4 px-1 border-b border-slate-200 pb-2">
        <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

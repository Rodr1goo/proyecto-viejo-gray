import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function OrderCard({ name, book, copies, details }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between mb-1">
        <h4 className="font-semibold text-slate-800 text-sm">{name}</h4>
        <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
      </div>
      <p className="text-xs text-slate-600 mb-1">{book}</p>
      <p className="text-xs text-slate-500 mb-3">{copies} {copies === 1 ? 'copia' : 'copias'}</p>
      
      <div className="flex items-center gap-1.5 text-brand-teal text-xs font-medium hover:underline cursor-pointer w-fit">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        WhatsApp
      </div>
      
      {details && (
        <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-100 italic">
          {details}
        </p>
      )}
    </div>
  );
}

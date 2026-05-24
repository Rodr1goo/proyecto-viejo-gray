import React from 'react';
import StatusBadge from '../ui/StatusBadge';
import { MoreHorizontal } from 'lucide-react';

export default function PedidoCard({ name, book, status }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-slate-800 text-sm">{name}</h4>
        <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
      </div>
      <p className="text-xs text-slate-600 mb-3">{book}</p>
      
      <StatusBadge status={status} />
    </div>
  );
}

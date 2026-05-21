import React from 'react';
import { Search, Plus } from 'lucide-react';

export default function OrdersToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6 shrink-0 gap-4">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Buscar por nombre o material..." 
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
        />
      </div>
      <button className="flex items-center gap-2 bg-brand-teal hover:bg-brand-tealHover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        <Plus className="w-4 h-4" />
        Nuevo Pedido
      </button>
    </div>
  );
}

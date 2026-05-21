import React from 'react';
import { Search, Plus } from 'lucide-react';

export default function InventoryToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar insumo..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>
        <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-teal outline-none">
          <option>Todas las categorías</option>
          <option>Papel</option>
          <option>Tóner</option>
          <option>Encuadernación</option>
        </select>
      </div>
      <button className="flex items-center gap-2 bg-brand-teal hover:bg-brand-tealHover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        <Plus className="w-4 h-4" />
        Agregar Insumo
      </button>
    </div>
  );
}

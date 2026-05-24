import React from 'react';

export default function Pagination() {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 bg-white rounded-b-xl">
      <p className="text-sm text-slate-500">Mostrando resultados</p>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm text-slate-500 bg-slate-100 rounded hover:bg-slate-200 transition-colors">Anterior</button>
        <button className="px-3 py-1 text-sm text-slate-500 bg-slate-100 rounded hover:bg-slate-200 transition-colors">Siguiente</button>
      </div>
    </div>
  );
}

import React from 'react';
import PedidoCard from './PedidoCard';

export default function PedidosTablero({ pedidos }) {
  return (
    <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar mt-6">
      <div className="flex gap-6 min-w-max h-full">
        {pedidos.map((columna, idx) => (
          <div key={idx} className="flex flex-col w-[300px] shrink-0">
            <div className="flex items-center justify-between mb-4 px-1 border-b border-slate-200 pb-2">
              <h3 className="font-bold text-slate-700 text-sm">{columna.status}</h3>
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {columna.items.length}
              </span>
            </div>
            <div className="space-y-3">
              {columna.items.map((item, i) => (
                <PedidoCard key={i} name={item.name} book={item.book} status={columna.status} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

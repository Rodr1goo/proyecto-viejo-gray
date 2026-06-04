import React from 'react';
import PedidoCard from './PedidoCard';

export default function PedidosTablero({ pedidos, onUpdateStatus }) {
  
  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el evento drop
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const pedidoId = e.dataTransfer.getData("pedidoId");
    if (pedidoId && onUpdateStatus) {
      onUpdateStatus(pedidoId, targetStatus);
    }
  };

  return (
    <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar mt-6">
      <div className="flex gap-6 min-w-max h-full">
        {pedidos.map((columna, idx) => (
          <div 
            key={idx} 
            className="flex flex-col w-[300px] shrink-0 bg-slate-50/50 rounded-xl p-3 border border-slate-200 shadow-sm"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columna.status)}
          >
            <div className="flex items-center justify-between mb-4 px-1 border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-700 text-sm">{columna.status}</h3>
              <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded-full">
                {columna.items.length}
              </span>
            </div>
            
            <div className="space-y-3 flex-1 min-h-[150px]">
              {columna.items.map((item) => (
                <PedidoCard key={item.id} pedido={item} />
              ))}
              
              {/* Zona visual si está vacío */}
              {columna.items.length === 0 && (
                <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm font-medium opacity-50">
                  Soltar pedido aquí
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

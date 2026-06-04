import React, { useState } from 'react';
import StatusBadge from '../ui/StatusBadge';
import { MoreHorizontal, DollarSign, ChevronDown, ChevronUp, Clock } from 'lucide-react';

export default function PedidoCard({ pedido }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const clienteNombre = pedido.clientes?.nombre_referencia || 'Cliente Anónimo';
  const total = pedido.total ? `$${pedido.total}` : '---';
  const detalles = pedido.detalles_pedido || [];
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData("pedidoId", pedido.id);
  };

  // Prevenir que el click en el botón de expandir arrastre la tarjeta
  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`bg-white p-4 rounded-xl border ${isExpanded ? 'border-brand-teal shadow-md' : 'border-slate-200 shadow-sm'} hover:shadow-md transition-all cursor-grab active:cursor-grabbing hover:border-brand-teal`}
      draggable
      onDragStart={handleDragStart}
      onClick={toggleExpand}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-slate-800 text-sm">{clienteNombre}</h4>
        <button 
          className="text-slate-400 hover:text-brand-teal bg-slate-50 p-1 rounded-md"
          onClick={toggleExpand}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <MoreHorizontal className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
        <span className="font-medium px-2 py-0.5 bg-slate-100 rounded text-slate-600">
          Canal: {pedido.canal_venta || 'LOCAL'}
        </span>
        <span className="text-slate-400">{detalles.length} items</span>
      </div>
      
      {/* SECCIÓN EXPANDIDA DE DETALLES */}
      {isExpanded && (
        <div className="mb-4 pt-3 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-700 mb-2">Detalles del Pedido:</p>
          <ul className="space-y-2">
            {detalles.map((det) => (
              <li key={det.id} className="bg-slate-50 p-2 rounded-lg text-xs">
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>{det.cantidad}x {det.precios?.servicio || 'Servicio General'}</span>
                  <span>${det.subtotal}</span>
                </div>
                {det.descripcion && (
                  <div className="flex items-start gap-1 text-amber-600 font-medium mt-1 bg-amber-50 p-1.5 rounded border border-amber-100">
                    <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <p>{det.descripcion}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
          <DollarSign className="w-3.5 h-3.5" />
          {total}
        </div>
        <StatusBadge status={pedido.estado} />
      </div>
    </div>
  );
}

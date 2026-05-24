import React from 'react';
import PedidoCard from './PedidoCard';

// Componente 'Feature': Se encarga exclusivamente de renderizar la lógica visual del Tablero Kanban.
// Desacopla la lógica pesada de la página principal (GestionPedidosPage), manteniendo el código limpio.
// Recibe el array completo de 'pedidos' agrupados por estado desde su componente Padre.
export default function PedidosTablero({ pedidos }) {
  return (
    // Contenedor principal con scroll horizontal (útil si hay muchas columnas)
    <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar mt-6">
      <div className="flex gap-6 min-w-max h-full">
        
        {/* Iteramos por cada 'columna' del estado (ej: PENDIENTE, EN PROCESO, ENTREGADO) */}
        {pedidos.map((columna, idx) => (
          <div key={idx} className="flex flex-col w-[300px] shrink-0">
            
            {/* Cabecera superior de la columna Kanban */}
            <div className="flex items-center justify-between mb-4 px-1 border-b border-slate-200 pb-2">
              <h3 className="font-bold text-slate-700 text-sm">{columna.status}</h3>
              {/* Contador de cuántos pedidos hay dentro de esta columna */}
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {columna.items.length}
              </span>
            </div>
            
            {/* Contenedor vertical de Tarjetas (Cards) */}
            <div className="space-y-3">
              {/* Iteramos los items individuales de la columna y delegamos el render a PedidoCard */}
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

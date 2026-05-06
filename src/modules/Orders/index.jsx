import React from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

const Column = ({ title, count, children }) => (
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

const OrderCard = ({ name, book, copies, details }) => (
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

export default function Orders() {
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-800">Gestión de Pedidos</h1>
      </div>
      
      {/* Filters/Actions Bar */}
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

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 min-w-max h-full">
          <Column title="Pendiente" count={3}>
            <OrderCard name="María García López" book="Atlas de Anatomía Netter" copies={1} details="Encuadernado anillado" />
            <OrderCard name="Carlos Rodríguez" book="Manual de Fisiología Guyton" copies={1} />
            <OrderCard name="Mateo González" book="Semiología Médica Argente" copies={1} />
          </Column>
          
          <Column title="En Prensa" count={2}>
            <OrderCard name="Juan Martínez" book="Compendio de Histología" copies={2} />
            <OrderCard name="Ana Paula Sánchez" book="Microbiología Médica Murray" copies={3} />
          </Column>
          
          <Column title="Listo para Retirar" count={2}>
            <OrderCard name="Lucía Fernández" book="Guías de Embriología 2024" copies={1} />
            <OrderCard name="Valentina Torres" book="Farmacología Goodman & Gilman" copies={2} />
          </Column>

          <Column title="Entregado" count={1}>
            <OrderCard name="Diego Moreno" book="Patología Robbins Básica" copies={1} />
          </Column>
        </div>
      </div>
    </div>
  );
}

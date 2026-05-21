import React from 'react';
import { ClipboardList, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Resumen</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-slate-600 font-medium text-sm">Pedidos de Hoy</h3>
            <ClipboardList className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">7</p>
            <p className="text-xs text-slate-500 mt-1">7 pedidos activos en total</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-slate-600 font-medium text-sm">Insumos Críticos</h3>
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-rose-600">5</p>
            <p className="text-xs text-slate-500 mt-1">Items bajo el stock mínimo</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-slate-600 font-medium text-sm">Ventas del Día</h3>
            <DollarSign className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">$17.500</p>
            <p className="text-xs text-brand-teal font-medium mt-1">+12% vs. ayer</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-slate-600 font-medium text-sm">En Producción</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">2</p>
            <p className="text-xs text-slate-500 mt-1">Trabajos en prensa actualmente</p>
          </div>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos Recientes */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-1">Pedidos Recientes</h3>
          <p className="text-sm text-slate-500 mb-6">Últimos pedidos recibidos hoy</p>
          
          <div className="space-y-4">
            {[
              { name: 'María García López', desc: 'Atlas de Anatomía Netter', status: 'Pendiente', color: 'bg-amber-500' },
              { name: 'Juan Martínez', desc: 'Compendio de Histología', status: 'En Prensa', color: 'bg-brand-teal' },
              { name: 'Lucía Fernández', desc: 'Guías de Embriología 2024', status: 'Listo para Retirar', color: 'bg-green-600' },
              { name: 'Carlos Rodríguez', desc: 'Manual de Fisiología Guyton', status: 'Pendiente', color: 'bg-amber-500' },
              { name: 'Ana Paula Sánchez', desc: 'Microbiología Médica Murray', status: 'En Prensa', color: 'bg-brand-teal' },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <span className={`px-2.5 py-1 rounded text-[11px] font-semibold text-white ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas de Stock */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-1">Alertas de Stock</h3>
          <p className="text-sm text-slate-500 mb-6">Insumos que requieren reposición</p>

          <div className="space-y-4">
            {[
              { name: 'Resmas A4 75g', stock: '45', min: '50' },
              { name: 'Resmas Oficio 75g', stock: '8', min: '15' },
              { name: 'Tóner Negro HP 26A', stock: '2', min: '5' },
              { name: 'Espirales 16mm Negro', stock: '25', min: '50' },
              { name: 'Tapas Cartón Negro A4', stock: '35', min: '80' },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500">Stock: {item.stock} / Mínimo: {item.min}</p>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold text-white bg-rose-600">
                  Bajo Stock
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

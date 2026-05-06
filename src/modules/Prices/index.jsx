import React from 'react';
import { Search, Plus, Pencil } from 'lucide-react';

export default function Prices() {
  const categories = [
    {
      name: 'Impresión',
      count: 4,
      items: [
        { name: 'Impresión B/N Simple faz', price: 50, unit: 'por hoja' },
        { name: 'Impresión B/N Doble faz', price: 80, unit: 'por hoja' },
        { name: 'Impresión Color Simple faz', price: 200, unit: 'por hoja' },
        { name: 'Impresión Color Doble faz', price: 350, unit: 'por hoja' },
      ]
    },
    {
      name: 'Encuadernación',
      count: 5,
      items: [
        { name: 'Anillado hasta 100 hojas', price: 800, unit: 'por unidad' },
        { name: 'Anillado hasta 200 hojas', price: 1200, unit: 'por unidad' },
        { name: 'Anillado hasta 300 hojas', price: 1600, unit: 'por unidad' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Lista de Precios</h1>
      </div>

      {/* Filters/Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar servicio..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>
        <button className="flex items-center gap-2 bg-brand-teal hover:bg-brand-tealHover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Nuevo Precio
        </button>
      </div>

      {/* Category Tables */}
      <div className="space-y-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-5 flex items-center justify-between border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-800 text-lg">{cat.name}</h2>
                <p className="text-sm text-slate-500">{cat.count} servicios</p>
              </div>
              <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                {cat.name}
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-white text-slate-800 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Servicio</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4">Unidad</th>
                    <th className="px-6 py-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cat.items.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-800">{row.name}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">${row.price}</td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded text-xs font-medium">
                          {row.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-slate-400 hover:text-brand-teal transition-colors">
                          <Pencil className="w-4 h-4 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

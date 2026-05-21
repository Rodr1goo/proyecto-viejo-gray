import React from 'react';
import { Pencil } from 'lucide-react';

export default function InventoryTable() {
  const data = [
    { item: 'Resmas A4 75g', cat: 'Papel', stock: '45', min: '50', unit: 'resmas', state: 'bajo' },
    { item: 'Resmas A4 90g', cat: 'Papel', stock: '30', min: '20', unit: 'resmas', state: 'ok' },
    { item: 'Resmas Oficio 75g', cat: 'Papel', stock: '8', min: '15', unit: 'resmas', state: 'bajo' },
    { item: 'Tóner Negro HP 26A', cat: 'Tóner', stock: '2', min: '5', unit: 'unidades', state: 'bajo' },
    { item: 'Tóner Negro HP 58A', cat: 'Tóner', stock: '4', min: '3', unit: 'unidades', state: 'ok' },
    { item: 'Espirales 12mm Negro', cat: 'Encuadernación', stock: '150', min: '100', unit: 'unidades', state: 'ok' },
    { item: 'Espirales 16mm Negro', cat: 'Encuadernación', stock: '25', min: '50', unit: 'unidades', state: 'bajo' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100">
        <h2 className="font-bold text-slate-800 text-lg">Inventario de Insumos</h2>
        <p className="text-sm text-slate-500">Gestiona el stock de materiales de la imprenta</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-white text-slate-800 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Insumo</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Stock Actual</th>
              <th className="px-6 py-4">Mínimo</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">{row.item}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-medium">
                    {row.cat}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">{row.stock} <span className="font-normal text-slate-500">{row.unit}</span></td>
                <td className="px-6 py-4">{row.min} <span className="font-normal text-slate-500">{row.unit}</span></td>
                <td className="px-6 py-4">
                  {row.state === 'bajo' ? (
                    <span className="bg-rose-600 text-white px-2.5 py-1 rounded text-xs font-semibold">Bajo Stock</span>
                  ) : (
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded text-xs font-semibold border border-emerald-200">OK</span>
                  )}
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
  );
}

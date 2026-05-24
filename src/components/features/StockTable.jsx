import React from 'react';
import DataTable from '../ui/DataTable';
import StockRow from './StockRow';
import Pagination from '../ui/Pagination';

export default function StockTable({ items }) {
  return (
    <>
      <div className="bg-white border border-slate-200 rounded-t-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 text-lg">Inventario de Insumos</h2>
          <p className="text-sm text-slate-500">Gestiona el stock de materiales de la imprenta</p>
        </div>
      </div>
      <DataTable headers={['Insumo', 'Categoría', 'Stock Actual', 'Mínimo', 'Estado', 'Acciones']}>
        {items.map((item, index) => (
          <StockRow key={index} item={item} index={index} />
        ))}
      </DataTable>
      <Pagination />
    </>
  );
}

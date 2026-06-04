import React from 'react';
import PriceTable from './PriceTable';

export default function PriceListSection({ category, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
      <div className="p-5 flex items-center justify-between border-b border-slate-100">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">{category.name}</h2>
          <p className="text-sm text-slate-500">{category.items.length} servicios</p>
        </div>
        <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
          {category.name}
        </span>
      </div>
      <PriceTable items={category.items} onDelete={onDelete} />
    </div>
  );
}

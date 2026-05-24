import React from 'react';

export default function StatCard({ icono: Icon, titulo, valor }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-slate-600 font-medium text-sm">{titulo}</h3>
        {Icon && <Icon className="w-5 h-5 text-slate-400" />}
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800">{valor}</p>
      </div>
    </div>
  );
}

import React from 'react';

export default function StatusBadge({ status }) {
  let colorClass = "bg-slate-100 text-slate-600"; // default

  switch (status?.toUpperCase()) {
    case 'PENDIENTE':
      colorClass = "bg-amber-500 text-white";
      break;
    case 'EN PROCESO':
      colorClass = "bg-brand-teal text-white";
      break;
    case 'ENTREGADO':
    case 'OK':
      colorClass = "bg-emerald-100 text-emerald-700 border border-emerald-200";
      break;
    case 'BAJO STOCK':
      colorClass = "bg-rose-600 text-white";
      break;
    case 'LISTO PARA RETIRAR':
      colorClass = "bg-green-600 text-white";
      break;
  }

  return (
    <span className={`inline-block whitespace-nowrap px-2.5 py-1 rounded text-[11px] font-semibold ${colorClass}`}>
      {status}
    </span>
  );
}

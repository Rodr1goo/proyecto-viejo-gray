import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import ActionButton from '../ui/ActionButton';
import DataRow from '../ui/DataRow';
import { Pencil, Trash2 } from 'lucide-react';

export default function StockRow({ item, onDelete }) {
  const navigate = useNavigate();
  return (
    <DataRow>
      <td className="px-6 py-4 font-semibold text-slate-800">{item.nombre}</td>
      <td className="px-6 py-4">
        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-medium">{item.categoria || 'Sin Cat'}</span>
      </td>
      <td className="px-6 py-4 font-medium text-slate-700">{item.stock_actual}</td>
      <td className="px-6 py-4">{item.stock_minimo}</td>
      <td className="px-6 py-4">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <ActionButton variant="icon" onClick={() => navigate(`/admin/inventory/edit/${item.id}`)}>
            <Pencil className="w-4 h-4 mx-auto" />
          </ActionButton>
          <button 
            onClick={() => onDelete(item.id)}
            className="p-2 bg-white border border-slate-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 text-rose-500 transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </td>
    </DataRow>
  );
}

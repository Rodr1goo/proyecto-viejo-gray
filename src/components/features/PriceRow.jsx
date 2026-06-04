import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataRow from '../ui/DataRow';
import ActionButton from '../ui/ActionButton';
import { Pencil, Trash2 } from 'lucide-react';

export default function PriceRow({ item, onDelete }) {
  const navigate = useNavigate();
  return (
    <DataRow>
      <td className="px-6 py-4 font-semibold text-slate-800">{item.servicio}</td>
      <td className="px-6 py-4 font-bold text-slate-800">${item.precio}</td>
      <td className="px-6 py-4">
        <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded text-xs font-medium">{item.unidad}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex justify-center gap-2">
          <ActionButton variant="icon" onClick={() => navigate(`/admin/prices/edit/${item.id}`)}>
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

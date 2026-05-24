import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import ActionButton from '../ui/ActionButton';
import DataRow from '../ui/DataRow';
import { Pencil } from 'lucide-react';

export default function StockRow({ item, index }) {
  const navigate = useNavigate();
  return (
    <DataRow>
      <td className="px-6 py-4 font-semibold text-slate-800">{item.name}</td>
      <td className="px-6 py-4">
        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-medium">{item.cat}</span>
      </td>
      <td className="px-6 py-4 font-medium text-slate-700">{item.stock}</td>
      <td className="px-6 py-4">{item.min}</td>
      <td className="px-6 py-4">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-6 py-4 text-center">
        <ActionButton variant="icon" onClick={() => navigate(`/inventory/edit/${index + 1}`)}>
          <Pencil className="w-4 h-4 mx-auto" />
        </ActionButton>
      </td>
    </DataRow>
  );
}

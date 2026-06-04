import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataRow from '../ui/DataRow';
import ActionButton from '../ui/ActionButton';
import { Pencil } from 'lucide-react';

export default function PriceRow({ item, index }) {
  const navigate = useNavigate();
  return (
    <DataRow>
      <td className="px-6 py-4 font-semibold text-slate-800">{item.name}</td>
      <td className="px-6 py-4 font-bold text-slate-800">${item.price}</td>
      <td className="px-6 py-4">
        <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded text-xs font-medium">{item.unit}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <ActionButton variant="icon" onClick={() => navigate(`/admin/prices/edit/${index + 1}`)}>
          <Pencil className="w-4 h-4 mx-auto" />
        </ActionButton>
      </td>
    </DataRow>
  );
}

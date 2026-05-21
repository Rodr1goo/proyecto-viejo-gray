import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function InventoryAlert() {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-rose-700 font-bold mb-1">
        <AlertTriangle className="w-5 h-5" />
        <h2>Alerta de Stock</h2>
      </div>
      <p className="text-rose-600 text-sm">
        Hay 5 insumos por debajo del stock mínimo. Se recomienda realizar una reposición.
      </p>
    </div>
  );
}

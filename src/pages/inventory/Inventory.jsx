import React from 'react';
import InventoryToolbar from '../../components/inventory/InventoryToolbar';
import InventoryAlert from '../../components/inventory/InventoryAlert';
import InventoryTable from '../../components/inventory/InventoryTable';

export default function Inventory() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Control de Stock</h1>
      </div>

      <InventoryToolbar />
      <InventoryAlert />
      <InventoryTable />
    </div>
  );
}

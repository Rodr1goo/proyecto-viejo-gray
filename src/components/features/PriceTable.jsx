import React from 'react';
import DataTable from '../ui/DataTable';
import PriceRow from './PriceRow';

export default function PriceTable({ items, onDelete }) {
  return (
    <DataTable headers={['Servicio', 'Precio', 'Unidad', 'Acciones']}>
      {items.map((item) => (
        <PriceRow key={item.id} item={item} onDelete={onDelete} />
      ))}
    </DataTable>
  );
}

import React from 'react';
import DataTable from '../ui/DataTable';
import PriceRow from './PriceRow';

export default function PriceTable({ items }) {
  return (
    <DataTable headers={['Servicio', 'Precio', 'Unidad', 'Acciones']}>
      {items.map((item, index) => (
        <PriceRow key={index} item={item} index={index} />
      ))}
    </DataTable>
  );
}

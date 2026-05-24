import React from 'react';
import PriceListSection from '../components/features/PriceListSection';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ListaPreciosPage() {
  const navigate = useNavigate();
  const mockCategories = [
    {
      name: 'Impresión',
      items: [
        { name: 'Impresión B/N Simple faz', price: 50, unit: 'por hoja' },
        { name: 'Impresión B/N Doble faz', price: 80, unit: 'por hoja' },
        { name: 'Impresión Color Simple faz', price: 200, unit: 'por hoja' }
      ]
    },
    {
      name: 'Encuadernación',
      items: [
        { name: 'Anillado hasta 100 hojas', price: 800, unit: 'por unidad' },
        { name: 'Anillado hasta 200 hojas', price: 1200, unit: 'por unidad' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Lista de Precios</h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <InputField placeholder="Buscar servicio..." icon={Search} />
        </div>
        <ActionButton onClick={() => navigate('/prices/new')}>
          <Plus className="w-4 h-4" /> Nuevo Precio
        </ActionButton>
      </div>

      <div>
        {mockCategories.map((cat, idx) => (
          <PriceListSection key={idx} category={cat} />
        ))}
      </div>
    </div>
  );
}

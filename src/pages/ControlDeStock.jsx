import React from 'react';
import StockTable from '../components/features/StockTable';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';
import StatusBadge from '../components/ui/StatusBadge';
import { Search, Plus, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ControlDeStock() {
  // Hook de React Router para poder navegar programáticamente al hacer clic en botones
  const navigate = useNavigate();
  
  // Datos simulados (Mock Data). En el futuro, esto provendrá de Supabase mediante un useEffect.
  const mockStock = [
    { name: 'Resmas A4 75g', cat: 'Papel', stock: 45, min: 50, status: 'BAJO STOCK' },
    { name: 'Resmas A4 90g', cat: 'Papel', stock: 30, min: 20, status: 'OK' },
    { name: 'Tóner Negro HP 26A', cat: 'Tóner', stock: 2, min: 5, status: 'BAJO STOCK' },
    { name: 'Espirales 12mm Negro', cat: 'Encuadernación', stock: 150, min: 100, status: 'OK' },
  ];

  return (
    <div className="space-y-6">
      {/* ENCABEZADO DE LA VISTA */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Control de Stock</h1>
      </div>

      {/* BARRA DE HERRAMIENTAS: Contiene buscador y botón de alta */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            {/* Componente UI Genérico reutilizado */}
            <InputField placeholder="Buscar insumo..." icon={Search} />
          </div>
        </div>
        
        {/* Al hacer clic, navega a la ruta dinámica de creación para cumplir con la consigna de ruteo */}
        <ActionButton onClick={() => navigate('/admin/inventory/new')}>
          <Plus className="w-4 h-4" /> Agregar Insumo
        </ActionButton>
      </div>

      {/* ALERTA VISUAL: Muestra estado crítico del stock */}
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-rose-700 font-bold mb-1">
          <AlertTriangle className="w-5 h-5" />
          <h2>Alerta de Stock</h2>
        </div>
        <p className="text-rose-600 text-sm">
          Hay insumos marcados con <StatusBadge status="BAJO STOCK" /> que requieren reposición.
        </p>
      </div>

      {/* COMPONENTE FEATURE: Le pasamos los datos mockeados a la tabla para que los mapee */}
      <StockTable items={mockStock} />
    </div>
  );
}

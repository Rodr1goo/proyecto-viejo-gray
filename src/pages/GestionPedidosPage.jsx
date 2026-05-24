import React from 'react';
import PedidosTablero from '../components/features/PedidosTablero';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';
import { Search, Plus } from 'lucide-react';

export default function GestionPedidosPage() {
  // Datos simulados (Mock) agrupados por estado para el tablero Kanban
  // En la próxima etapa, esto será reemplazado por una consulta a Supabase
  const mockPedidos = [
    {
      status: 'PENDIENTE',
      items: [
        { name: 'María García López', book: 'Atlas de Anatomía Netter' },
        { name: 'Carlos Rodríguez', book: 'Manual de Fisiología Guyton' }
      ]
    },
    {
      status: 'EN PROCESO',
      items: [
        { name: 'Juan Martínez', book: 'Compendio de Histología' }
      ]
    },
    {
      status: 'ENTREGADO',
      items: [
        { name: 'Diego Moreno', book: 'Patología Robbins Básica' }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* ENCABEZADO */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-800">Gestión de Pedidos</h1>
      </div>
      
      {/* BARRA DE HERRAMIENTAS (Buscador y Botón) */}
      <div className="flex flex-wrap items-center justify-between shrink-0 gap-4">
        <div className="w-full max-w-md">
          {/* Reutilización del componente InputField de nuestra UI global */}
          <InputField placeholder="Buscar por nombre o material..." icon={Search} />
        </div>
        <ActionButton>
          <Plus className="w-4 h-4" /> Nuevo Pedido
        </ActionButton>
      </div>

      {/* TABLERO KANBAN: Recibe el array de pedidos y se encarga de renderizar 
          las columnas y las tarjetas internamente */}
      <PedidosTablero pedidos={mockPedidos} />
    </div>
  );
}

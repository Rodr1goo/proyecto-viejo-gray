import React from 'react';
import OrdersToolbar from '../../components/orders/OrdersToolbar';
import KanbanColumn from '../../components/orders/KanbanColumn';
import OrderCard from '../../components/orders/OrderCard';

export default function Orders() {
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-800">Gestión de Pedidos</h1>
      </div>
      
      <OrdersToolbar />

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 min-w-max h-full">
          <KanbanColumn title="Pendiente" count={3}>
            <OrderCard name="María García López" book="Atlas de Anatomía Netter" copies={1} details="Encuadernado anillado" />
            <OrderCard name="Carlos Rodríguez" book="Manual de Fisiología Guyton" copies={1} />
            <OrderCard name="Mateo González" book="Semiología Médica Argente" copies={1} />
          </KanbanColumn>
          
          <KanbanColumn title="En Prensa" count={2}>
            <OrderCard name="Juan Martínez" book="Compendio de Histología" copies={2} />
            <OrderCard name="Ana Paula Sánchez" book="Microbiología Médica Murray" copies={3} />
          </KanbanColumn>
          
          <KanbanColumn title="Listo para Retirar" count={2}>
            <OrderCard name="Lucía Fernández" book="Guías de Embriología 2024" copies={1} />
            <OrderCard name="Valentina Torres" book="Farmacología Goodman & Gilman" copies={2} />
          </KanbanColumn>

          <KanbanColumn title="Entregado" count={1}>
            <OrderCard name="Diego Moreno" book="Patología Robbins Básica" copies={1} />
          </KanbanColumn>
        </div>
      </div>
    </div>
  );
}

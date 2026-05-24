import React from 'react';
import StatCard from '../components/ui/StatCard';
import DataTable from '../components/ui/DataTable';
import DataRow from '../components/ui/DataRow';
import StatusBadge from '../components/ui/StatusBadge';
import { ClipboardList, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const statData = [
    { id: 1, titulo: "Pedidos de Hoy", valor: "7", icon: ClipboardList },
    { id: 2, titulo: "Insumos Críticos", valor: "5", icon: AlertTriangle },
    { id: 3, titulo: "Ventas del Día", valor: "$17.500", icon: DollarSign },
    { id: 4, titulo: "En Producción", valor: "2", icon: TrendingUp },
  ];

  const orderData = [
    { id: 1, name: 'María García López', desc: 'Atlas de Anatomía Netter', status: 'PENDIENTE' },
    { id: 2, name: 'Juan Martínez', desc: 'Compendio de Histología', status: 'EN PROCESO' },
    { id: 3, name: 'Lucía Fernández', desc: 'Guías de Embriología 2024', status: 'LISTO PARA RETIRAR' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
      </div>

      {/* Grid de StatCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statData.map((stat) => (
          <StatCard key={stat.id} titulo={stat.titulo} valor={stat.valor} icono={stat.icon} />
        ))}
      </div>

      {/* Grid inferior con tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-slate-800 mb-4">Pedidos Recientes</h3>
          <DataTable headers={['Cliente', 'Material', 'Estado']}>
            {orderData.map(order => (
              <DataRow key={order.id}>
                <td className="px-6 py-4 font-semibold text-slate-800">{order.name}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{order.desc}</td>
                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
              </DataRow>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
}

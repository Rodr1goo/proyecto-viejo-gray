import React, { useEffect, useState } from 'react';
import StatCard from '../components/ui/StatCard';
import DataTable from '../components/ui/DataTable';
import DataRow from '../components/ui/DataRow';
import StatusBadge from '../components/ui/StatusBadge';
import { ClipboardList, AlertTriangle, DollarSign, TrendingUp, Loader2, Receipt } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  // ============================================================================
  // ESTADOS DEL COMPONENTE
  // ============================================================================
  const [metrics, setMetrics] = useState({
    pedidosHoy: 0,
    pedidosMes: 0,
    insumosCriticos: 0,
    ventasDia: 0,
    ventasMes: 0,
    enProduccion: 0,
    ticketPromedio: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [criticalInsumos, setCriticalInsumos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // LÓGICA DE OBTENCIÓN DE DATOS (FETCHING)
  // ============================================================================
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);

        const [pedidosResponse, insumosResponse] = await Promise.all([
          supabase.from('pedidos').select('*, clientes(nombre_referencia)').order('created_at', { ascending: false }),
          supabase.from('insumos').select('*')
        ]);

        if (pedidosResponse.error) throw pedidosResponse.error;
        if (insumosResponse.error) throw insumosResponse.error;

        const pedidos = pedidosResponse.data || [];
        const insumos = insumosResponse.data || [];

        // 2. Calculamos las métricas dinámicamente
        const hoyDate = new Date();
        const hoy = hoyDate.toDateString();
        const mesActual = hoyDate.getMonth();
        const anioActual = hoyDate.getFullYear();

        // Filtrar pedidos creados en el día de hoy
        const pedidosDeHoy = pedidos.filter(p => p.created_at && new Date(p.created_at).toDateString() === hoy);
        
        // Filtrar pedidos del mes actual
        const pedidosDelMes = pedidos.filter(p => {
          if (!p.created_at) return false;
          const date = new Date(p.created_at);
          return date.getMonth() === mesActual && date.getFullYear() === anioActual;
        });
        
        // Sumar el total de los pedidos para métricas financieras
        const ventasDelDia = pedidosDeHoy.reduce((suma, p) => suma + Number(p.total || 0), 0);
        const ventasDelMes = pedidosDelMes.reduce((suma, p) => suma + Number(p.total || 0), 0);
        
        // Calcular el Ticket Promedio
        const ticketPromedio = pedidosDelMes.length > 0 ? Math.round(ventasDelMes / pedidosDelMes.length) : 0;
        
        // Contar pedidos que están actualmente "EN PROCESO"
        const enProduccion = pedidos.filter(p => p.estado === 'EN PROCESO').length;
        
        // Filtrar insumos cuyo stock actual ha caído al mínimo o por debajo
        const insumosEnAlerta = insumos.filter(i => i.stock_actual <= i.stock_minimo);



        // Actualizamos el estado con las métricas calculadas
        setMetrics({
          pedidosHoy: pedidosDeHoy.length,
          pedidosMes: pedidosDelMes.length,
          insumosCriticos: insumosEnAlerta.length,
          ventasDia: ventasDelDia,
          ventasMes: ventasDelMes,
          enProduccion: enProduccion,
          ticketPromedio: ticketPromedio
        });


        setRecentOrders(pedidos.slice(0, 5));
        setCriticalInsumos(insumosEnAlerta); 

      } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // ============================================================================
  // PREPARACIÓN DE DATOS PARA RENDERIZADO
  // ============================================================================
  const statData = [
    { id: 1, titulo: "Pedidos de Hoy", valor: metrics.pedidosHoy.toString(), icon: ClipboardList },
    { id: 2, titulo: "Pedidos del Mes", valor: metrics.pedidosMes.toString(), icon: ClipboardList },
    { id: 3, titulo: "En Producción", valor: metrics.enProduccion.toString(), icon: TrendingUp },
    { id: 4, titulo: "Insumos Críticos", valor: metrics.insumosCriticos.toString(), icon: AlertTriangle },
    { id: 5, titulo: "Ventas del Día", valor: `$${metrics.ventasDia.toLocaleString()}`, icon: DollarSign },
    { id: 6, titulo: "Ventas del Mes", valor: `$${metrics.ventasMes.toLocaleString()}`, icon: DollarSign },
    { id: 7, titulo: "Ticket Promedio", valor: `$${metrics.ticketPromedio.toLocaleString()}`, icon: Receipt },
  ];



  // ============================================================================
  // INTERFAZ DE USUARIO (RENDER)
  // ============================================================================
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-teal" />
        </div>
      ) : (
        <>
          {/* Grid de Tarjetas de Estadísticas (StatCards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {statData.map((stat) => (
              <StatCard key={stat.id} titulo={stat.titulo} valor={stat.valor} icono={stat.icon} />
            ))}
          </div>

          {/* Tablas Inferiores del Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            
            {/* TABLA 1: Pedidos Recientes */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-5 border-b border-slate-100 shrink-0">
                <h3 className="font-bold text-slate-800 text-lg">Pedidos Recientes</h3>
                <p className="text-sm text-slate-500">Últimos 5 pedidos ingresados al sistema</p>
              </div>
              
              <div className="flex-1 overflow-auto">
                <DataTable headers={['Cliente', 'Total', 'Estado']}>
                  {recentOrders.length > 0 ? (
                    recentOrders.map(order => (
                      <DataRow key={order.id}>
                        <td className="px-6 py-4 font-semibold text-slate-800">
                          {order.clientes?.nombre_referencia || 'Cliente Anónimo'}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600">
                          ${order.total}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={order.estado} />
                        </td>
                      </DataRow>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                        No hay pedidos recientes en la base de datos.
                      </td>
                    </tr>
                  )}
                </DataTable>
              </div>
            </div>

            {/* TABLA 2: Insumos Críticos (Alerta de Stock) */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-5 border-b border-slate-100 shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500" /> Alertas de Stock
                  </h3>
                  <p className="text-sm text-slate-500">Insumos que requieren reposición inmediata</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <DataTable headers={['Insumo', 'Stock Actual', 'Mínimo']}>
                  {criticalInsumos.length > 0 ? (
                    criticalInsumos.map(insumo => (
                      <DataRow key={insumo.id}>
                        <td className="px-6 py-4 font-semibold text-slate-800">
                          {insumo.nombre}
                          <span className="block text-xs font-normal text-slate-500 mt-0.5">{insumo.categoria}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                            {insumo.stock_actual}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                          {insumo.stock_minimo}
                        </td>
                      </DataRow>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center text-slate-500 flex flex-col items-center">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
                          <ClipboardList className="w-6 h-6 text-emerald-500" />
                        </div>
                        <p className="font-medium text-slate-700">¡Todo en orden!</p>
                        <p className="text-sm mt-1">No hay insumos críticos en este momento.</p>
                      </td>
                    </tr>
                  )}
                </DataTable>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

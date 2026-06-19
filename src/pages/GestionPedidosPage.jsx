import React, { useEffect, useState } from 'react';
import PedidosTablero from '../components/features/PedidosTablero';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';
import { Search, Plus, Loader2 } from 'lucide-react';
import { pedidosService } from '../lib/pedidosService';
import { useNavigate } from 'react-router-dom';

export default function GestionPedidosPage() {
  const navigate = useNavigate();
  const [pedidosRaw, setPedidosRaw] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPedidos = async () => {
    try {
      setIsLoading(true);
      const data = await pedidosService.obtenerPedidos();
      setPedidosRaw(data || []);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleUpdateStatus = async (pedidoId, newStatus) => {
    try {
      // Carga optimista: actualizamos UI de inmediato
      setPedidosRaw(prev => prev.map(p => p.id === pedidoId ? { ...p, estado: newStatus } : p));
      
      await pedidosService.actualizarEstadoPedido(pedidoId, newStatus);
    } catch (error) {
      console.error("Error actualizando estado:", error);
      fetchPedidos(); // Revertir en caso de error refrescando la BD
    }
  };

  // Filtrado
  const filteredPedidos = pedidosRaw.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    const clienteNombre = p.clientes?.nombre_referencia?.toLowerCase() || '';
    const canal = p.canal_venta?.toLowerCase() || '';
    return clienteNombre.includes(searchLower) || canal.includes(searchLower);
  });

  // Agrupar en las 4 columnas
  const estados = ['PENDIENTE', 'EN PROCESO', 'LISTO PARA RETIRAR', 'ENTREGADO'];
  const groupedPedidos = estados.map(status => {
    return {
      status,
      items: filteredPedidos.filter(p => p.estado === status)
    };
  });

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-slate-800">Gestión de Pedidos</h1>
      </div>
      
      <div className="flex flex-wrap items-center justify-between shrink-0 gap-4">
        <div className="w-full max-w-md relative">
          <InputField 
            placeholder="Buscar por cliente o canal..." 
            icon={Search} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ActionButton onClick={() => navigate('/admin/orders/new')}>
          <Plus className="w-4 h-4" /> Nuevo Pedido
        </ActionButton>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12 flex-1">
          <Loader2 className="w-8 h-8 animate-spin text-brand-teal" />
        </div>
      ) : (
        <PedidosTablero pedidos={groupedPedidos} onUpdateStatus={handleUpdateStatus} />
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import StockTable from '../components/features/StockTable';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';
import StatusBadge from '../components/ui/StatusBadge';
import { Search, Plus, AlertTriangle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ControlDeStock() {
  const navigate = useNavigate();
  const [insumos, setInsumos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInsumos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('insumos').select('*').order('nombre');
      if (error) throw error;
      
      // Mapear el estado (status) al vuelo
      const mappedData = data.map(insumo => ({
        ...insumo,
        status: insumo.stock_actual <= insumo.stock_minimo ? 'BAJO STOCK' : 'OK'
      }));
      setInsumos(mappedData);
    } catch (error) {
      console.error("Error cargando insumos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsumos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este insumo?')) return;
    try {
      const { error } = await supabase.from('insumos').delete().eq('id', id);
      if (error) throw error;
      fetchInsumos(); // Recargar tras borrar
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("No se pudo eliminar el insumo.");
    }
  };

  const filteredInsumos = insumos.filter(insumo => 
    insumo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hayBajoStock = insumos.some(i => i.status === 'BAJO STOCK');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Control de Stock</h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-64 relative">
            <InputField 
              placeholder="Buscar insumo..." 
              icon={Search} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <ActionButton onClick={() => navigate('/admin/inventory/new')}>
          <Plus className="w-4 h-4" /> Agregar Insumo
        </ActionButton>
      </div>

      {hayBajoStock && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-rose-700 font-bold mb-1">
            <AlertTriangle className="w-5 h-5" />
            <h2>Alerta de Stock</h2>
          </div>
          <p className="text-rose-600 text-sm">
            Hay insumos marcados con <StatusBadge status="BAJO STOCK" /> que requieren reposición.
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-teal" />
        </div>
      ) : insumos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 mb-4">No hay insumos cargados en la base de datos.</p>
          <ActionButton onClick={() => navigate('/admin/inventory/new')}>Crear el primero</ActionButton>
        </div>
      ) : (
        <StockTable items={filteredInsumos} onDelete={handleDelete} />
      )}
    </div>
  );
}

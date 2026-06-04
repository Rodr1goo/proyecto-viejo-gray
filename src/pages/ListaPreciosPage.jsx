import React, { useEffect, useState } from 'react';
import PriceListSection from '../components/features/PriceListSection';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';
import { Search, Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ListaPreciosPage() {
  const navigate = useNavigate();
  const [allPrecios, setAllPrecios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPrecios = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('precios').select('*').order('categoria').order('servicio');
      if (error) throw error;
      setAllPrecios(data || []);
    } catch (error) {
      console.error("Error al cargar precios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrecios();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este servicio?')) return;
    try {
      const { error } = await supabase.from('precios').delete().eq('id', id);
      if (error) throw error;
      fetchPrecios();
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("No se pudo eliminar.");
    }
  };

  // Filtrado y Agrupamiento
  const filteredData = allPrecios.filter(item => 
    item.servicio.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.categoria && item.categoria.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const grouped = filteredData.reduce((acc, current) => {
    const cat = current.categoria || 'Otros';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(current);
    return acc;
  }, {});

  const categories = Object.keys(grouped).map(catName => ({
    name: catName,
    items: grouped[catName]
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Lista de Precios</h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <InputField 
            placeholder="Buscar servicio o categoría..." 
            icon={Search} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <ActionButton onClick={() => navigate('/admin/prices/new')}>
          <Plus className="w-4 h-4" /> Nuevo Precio
        </ActionButton>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-teal" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 mb-4">No hay servicios cargados en la base de datos.</p>
          <ActionButton onClick={() => navigate('/admin/prices/new')}>Crear el primero</ActionButton>
        </div>
      ) : (
        <div>
          {categories.map((cat, idx) => (
            <PriceListSection key={idx} category={cat} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

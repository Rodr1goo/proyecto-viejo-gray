import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ActionButton from '../components/ui/ActionButton';
import { insumosService } from '../lib/insumosService';
import { preciosService } from '../lib/preciosService';
export default function FormularioAbmPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isEditing = Boolean(id);
  const isInventory = location.pathname.includes('/inventory');
  const isPrices = location.pathname.includes('/prices');
  
  // Estados compartidos
  const [isSaving, setIsSaving] = useState(false);

  // Estados INVENTARIO
  const [nombre, setNombre] = useState('');
  const [categoriaInsumo, setCategoriaInsumo] = useState('');
  const [stockActual, setStockActual] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(0);

  // Estados PRECIOS
  const [servicio, setServicio] = useState('');
  const [categoriaPrecio, setCategoriaPrecio] = useState('');
  const [precio, setPrecio] = useState(0);
  const [unidad, setUnidad] = useState('por unidad');

  useEffect(() => {
    // Si estamos editando, buscamos los datos en Supabase
    if (isEditing) {
      if (isInventory) {
        const fetchInsumo = async () => {
          try {
            const data = await insumosService.obtenerInsumoPorId(id);
            if (data) {
              setNombre(data.nombre);
              setCategoriaInsumo(data.categoria || '');
              setStockActual(data.stock_actual);
              setStockMinimo(data.stock_minimo);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchInsumo();
      } else if (isPrices) {
        const fetchPrecio = async () => {
          try {
            const data = await preciosService.obtenerPrecioPorId(id);
            if (data) {
              setServicio(data.servicio);
              setCategoriaPrecio(data.categoria || '');
              setPrecio(data.precio);
              setUnidad(data.unidad || 'por unidad');
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchPrecio();
      }
    }
  }, [id, isEditing, isInventory, isPrices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (isInventory) {
        const insumoData = {
          nombre,
          categoria: categoriaInsumo,
          stock_actual: parseInt(stockActual),
          stock_minimo: parseInt(stockMinimo)
        };

        if (isEditing) {
          await insumosService.actualizarInsumo(id, insumoData);
        } else {
          await insumosService.crearInsumo(insumoData);
        }
        
        navigate('/admin/inventory');
      } else if (isPrices) {
        const precioData = {
          servicio,
          categoria: categoriaPrecio,
          precio: parseFloat(precio),
          unidad
        };

        if (isEditing) {
          await preciosService.actualizarPrecio(id, precioData);
        } else {
          await preciosService.crearPrecio(precioData);
        }
        
        navigate('/admin/prices');
      }
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Hubo un error al guardar los datos.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-2xl mx-auto mt-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        {isEditing ? 'Editar Registro' : 'Crear Nuevo Registro'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {isInventory && (
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre del Insumo</label>
              <input 
                type="text" required
                value={nombre} onChange={e => setNombre(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Categoría</label>
              <input 
                type="text" 
                value={categoriaInsumo} onChange={e => setCategoriaInsumo(e.target.value)}
                placeholder="Ej: Papel, Encuadernación, Tóner"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Stock Actual</label>
                <input 
                  type="number" required min="0"
                  value={stockActual} onChange={e => setStockActual(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Stock Mínimo (Alerta)</label>
                <input 
                  type="number" required min="0"
                  value={stockMinimo} onChange={e => setStockMinimo(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" 
                />
              </div>
            </div>
          </div>
        )}

        {isPrices && (
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre del Servicio</label>
              <input 
                type="text" required
                value={servicio} onChange={e => setServicio(e.target.value)}
                placeholder="Ej: Impresión B/N Simple faz"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Categoría</label>
              <input 
                type="text" required
                value={categoriaPrecio} onChange={e => setCategoriaPrecio(e.target.value)}
                placeholder="Ej: Impresión, Encuadernación"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Precio ($)</label>
                <input 
                  type="number" required min="0" step="0.01"
                  value={precio} onChange={e => setPrecio(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Unidad de Medida</label>
                <select 
                  value={unidad} onChange={e => setUnidad(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent bg-white"
                >
                  <option value="por hoja">Por hoja</option>
                  <option value="por unidad">Por unidad</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
          <ActionButton type="button" onClick={() => navigate(-1)} variant="secondary">
            Cancelar
          </ActionButton>
          <button 
            type="submit" 
            disabled={isSaving}
            className="px-5 py-2.5 bg-brand-teal hover:bg-brand-tealHover text-white text-sm font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}

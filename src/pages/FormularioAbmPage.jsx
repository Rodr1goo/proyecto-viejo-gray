import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ActionButton from '../components/ui/ActionButton';
import InputField from '../components/ui/InputField';
import SelectField from '../components/ui/SelectField';
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
            <InputField 
              label="Nombre del Insumo"
              type="text" required
              value={nombre} onChange={e => setNombre(e.target.value)}
            />
            <InputField 
              label="Categoría"
              type="text" 
              value={categoriaInsumo} onChange={e => setCategoriaInsumo(e.target.value)}
              placeholder="Ej: Papel, Encuadernación, Tóner"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="Stock Actual"
                type="number" required min="0"
                value={stockActual} onChange={e => setStockActual(e.target.value)}
              />
              <InputField 
                label="Stock Mínimo (Alerta)"
                type="number" required min="0"
                value={stockMinimo} onChange={e => setStockMinimo(e.target.value)}
              />
            </div>
          </div>
        )}

        {isPrices && (
          <div className="space-y-4 text-left">
            <InputField 
              label="Nombre del Servicio"
              type="text" required
              value={servicio} onChange={e => setServicio(e.target.value)}
              placeholder="Ej: Impresión B/N Simple faz"
            />
            <InputField 
              label="Categoría"
              type="text" required
              value={categoriaPrecio} onChange={e => setCategoriaPrecio(e.target.value)}
              placeholder="Ej: Impresión, Encuadernación"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="Precio ($)"
                type="number" required min="0" step="0.01"
                value={precio} onChange={e => setPrecio(e.target.value)}
              />
              <SelectField 
                label="Unidad de Medida"
                value={unidad} onChange={e => setUnidad(e.target.value)}
                options={[
                  { value: 'por hoja', label: 'Por hoja' },
                  { value: 'por unidad', label: 'Por unidad' }
                ]}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
          <ActionButton type="button" onClick={() => navigate(-1)} variant="secondary">
            Cancelar
          </ActionButton>
          <ActionButton 
            type="submit" 
            variant="primary"
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </ActionButton>
        </div>
      </form>
    </div>
  );
}

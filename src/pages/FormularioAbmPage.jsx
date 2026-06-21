import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import ActionButton from '../components/ui/ActionButton';
import InputField from '../components/ui/InputField';
import SelectField from '../components/ui/SelectField';
import { insumosService } from '../lib/insumosService';
import { preciosService } from '../lib/preciosService';
import { composicionService } from '../lib/composicionService';

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
  
  // Estados COMPOSICIÓN (Solo para Precios)
  const [insumosDB, setInsumosDB] = useState([]);
  const [composicion, setComposicion] = useState([]);

  useEffect(() => {
    // Si estamos editando, buscamos los datos
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
        const fetchPrecioYComposicion = async () => {
          try {
            const data = await preciosService.obtenerPrecioPorId(id);
            if (data) {
              setServicio(data.servicio);
              setCategoriaPrecio(data.categoria || '');
              setPrecio(data.precio);
              setUnidad(data.unidad || 'por unidad');
            }
            
            // Cargar composición existente
            const compData = await composicionService.obtenerComposicionPorServicio(id);
            if (compData && compData.length > 0) {
              setComposicion(compData.map(c => ({
                id_local: Date.now() + Math.random(),
                insumo_id: c.insumo_id,
                cantidad_requerida: c.cantidad_requerida
              })));
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchPrecioYComposicion();
      }
    }

    // Si estamos en la vista de precios (creando o editando), necesitamos cargar los insumos para los selects
    if (isPrices) {
      const fetchInsumosParaSelect = async () => {
        try {
          const data = await insumosService.obtenerInsumos();
          if (data) setInsumosDB(data);
        } catch (error) {
          console.error("Error cargando insumos:", error);
        }
      };
      fetchInsumosParaSelect();
    }
  }, [id, isEditing, isInventory, isPrices]);

  // Manejo de la composición en UI
  const agregarInsumoComposicion = () => {
    setComposicion([...composicion, { id_local: Date.now(), insumo_id: '', cantidad_requerida: 1 }]);
  };

  const eliminarInsumoComposicion = (id_local) => {
    setComposicion(composicion.filter(c => c.id_local !== id_local));
  };

  const handleComposicionChange = (id_local, field, value) => {
    setComposicion(prev => prev.map(c => 
      c.id_local === id_local ? { ...c, [field]: value } : c
    ));
  };

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

        let precioIdFinal = id;

        if (isEditing) {
          await preciosService.actualizarPrecio(id, precioData);
        } else {
          const nuevoPrecio = await preciosService.crearPrecio(precioData);
          precioIdFinal = nuevoPrecio.id;
        }

        // Guardamos la composición
        await composicionService.guardarComposicion(precioIdFinal, composicion);
        
        navigate('/admin/prices');
      }
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Hubo un error al guardar los datos: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-2xl mx-auto mt-6 shadow-sm pb-12">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        {isEditing ? 'Editar Registro' : 'Crear Nuevo Registro'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
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
          <div className="space-y-8">
            <div className="space-y-4 text-left">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Datos del Servicio</h2>
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

            {/* SECCIÓN DE COMPOSICIÓN / FICHAS TÉCNICAS */}
            <div className="space-y-4 text-left bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Composición (Materia Prima)</h2>
                  <p className="text-xs text-slate-500">¿Qué insumos se descuentan al vender este servicio?</p>
                </div>
                <button 
                  type="button" 
                  onClick={agregarInsumoComposicion}
                  className="text-brand-teal font-semibold text-sm flex items-center gap-1 hover:text-brand-tealHover"
                >
                  <Plus className="w-4 h-4" /> Añadir Insumo
                </button>
              </div>

              {composicion.length === 0 ? (
                <p className="text-sm text-slate-400 italic text-center py-4 border-2 border-dashed border-slate-200 rounded-lg">
                  Este servicio no consume insumos del inventario automáticamente.
                </p>
              ) : (
                <div className="space-y-3">
                  {composicion.map((comp) => (
                    <div key={comp.id_local} className="flex items-end gap-3 bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex-1">
                        <SelectField 
                          label="Insumo"
                          required
                          value={comp.insumo_id}
                          onChange={(e) => handleComposicionChange(comp.id_local, 'insumo_id', e.target.value)}
                          options={[
                            { value: '', label: '-- Seleccionar Insumo --' },
                            ...insumosDB.map(ins => ({ value: ins.id, label: `${ins.nombre} (Stock: ${ins.stock_actual})` }))
                          ]}
                        />
                      </div>
                      <div className="w-24">
                        <InputField 
                          label="Cant."
                          type="number" min="1" required
                          value={comp.cantidad_requerida}
                          onChange={(e) => handleComposicionChange(comp.id_local, 'cantidad_requerida', e.target.value)}
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => eliminarInsumoComposicion(comp.id_local)}
                        className="p-2 mb-[2px] text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

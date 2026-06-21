import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Loader2, User, Phone, ShoppingCart } from 'lucide-react';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';
import SelectField from '../components/ui/SelectField';
import TextAreaField from '../components/ui/TextAreaField';
import { preciosService } from '../lib/preciosService';
import { pedidosService } from '../lib/pedidosService';
export default function FormularioPedidoPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [preciosDB, setPreciosDB] = useState([]);

  // 1. Estado del Cliente
  const [cliente, setCliente] = useState({
    nombre_referencia: '',
    contacto: ''
  });

  // 2. Estado del Pedido
  const [canalVenta, setCanalVenta] = useState('LOCAL'); // LOCAL, IG, WPP

  // 3. Estado de los Detalles (Items del carrito)
  const [detalles, setDetalles] = useState([
    { id_local: Date.now(), precio_id: '', cantidad: 1, descripcion: '', precio_unitario: 0, subtotal: 0 }
  ]);

  // Cargar lista de precios al montar el componente
  useEffect(() => {
    async function fetchPrecios() {
      try {
        const data = await preciosService.obtenerPrecios();
        if (data) setPreciosDB(data);
      } catch (error) {
        console.error("Error cargando precios:", error);
      }
    }
    fetchPrecios();
  }, []);

  // Recalcular subtotal cuando cambia el servicio o la cantidad
  const handleDetalleChange = (id_local, field, value) => {
    setDetalles(prev => prev.map(item => {
      if (item.id_local === id_local) {
        let updatedItem = { ...item, [field]: value };

        // Si el usuario seleccionó un nuevo servicio, actualizamos el precio unitario y la categoría
        if (field === 'precio_id') {
          const servicioSeleccionado = preciosDB.find(p => p.id === value);
          if (servicioSeleccionado) {
            updatedItem.precio_unitario = servicioSeleccionado.precio;
            updatedItem.categoria = servicioSeleccionado.categoria; // Guardamos la categoría para la BD
          } else {
            updatedItem.precio_unitario = 0;
            updatedItem.categoria = '';
          }
        }

        // Recalcular subtotal si cambió la cantidad o el precio
        updatedItem.subtotal = updatedItem.cantidad * updatedItem.precio_unitario;
        return updatedItem;
      }
      return item;
    }));
  };

  const agregarDetalle = () => {
    setDetalles([...detalles, { id_local: Date.now(), precio_id: '', cantidad: 1, descripcion: '', precio_unitario: 0, subtotal: 0 }]);
  };

  const eliminarDetalle = (id_local) => {
    if (detalles.length === 1) return; // Obligar a tener al menos 1 item
    setDetalles(detalles.filter(d => d.id_local !== id_local));
  };

  // Calcular el Total sumando todos los subtotales
  const totalPedido = detalles.reduce((sum, item) => sum + item.subtotal, 0);

  // LA TRANSACCIÓN PRINCIPAL A SUPABASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cliente.nombre_referencia) return alert('El nombre del cliente es obligatorio');

    // Validar que todos los detalles tengan un servicio seleccionado
    const detallesIncompletos = detalles.some(d => !d.precio_id);
    if (detallesIncompletos) return alert('Por favor, selecciona un servicio para cada ítem del pedido');

    try {
      setIsSaving(true);

      const pedidoData = {
        canal_venta: canalVenta,
        estado: 'PENDIENTE',
        total: totalPedido,
        abonado: 0
      };

      const detallesProcesados = detalles.map(d => ({
        precio_id: d.precio_id,
        categoria: d.categoria || 'General',
        tipo_impresion: 'No aplica',
        descripcion: d.descripcion,
        cantidad: d.cantidad,
        subtotal: d.subtotal
      }));

      // Usar el servicio que maneja toda la transacción
      await pedidosService.crearPedidoCompleto(cliente, pedidoData, detallesProcesados);

      // ¡Todo un éxito!
      alert("¡Pedido creado exitosamente!");
      navigate('/admin/orders');

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 pb-24">
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cargar Nuevo Pedido</h1>
          <p className="text-sm text-slate-500 mt-1">Transacción multicapa (Clientes, Pedidos y Detalles)</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* BLOQUE 1: DATOS DEL CLIENTE Y PEDIDO */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-teal" /> Datos Generales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre / Apodo *</label>
              <InputField
                placeholder="Ej. Juan Pérez"
                value={cliente.nombre_referencia}
                onChange={(e) => setCliente({ ...cliente, nombre_referencia: e.target.value })}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Contacto (IG/Tel)</label>
              <InputField
                placeholder="Ej. @juanperez o 381..."
                icon={Phone}
                value={cliente.contacto}
                onChange={(e) => setCliente({ ...cliente, contacto: e.target.value })}
              />
            </div>
            <div className="col-span-1">
              <SelectField 
                label="Canal de Venta"
                value={canalVenta}
                onChange={(e) => setCanalVenta(e.target.value)}
                options={[
                  { value: 'LOCAL', label: 'Local Físico' },
                  { value: 'IG', label: 'Instagram' },
                  { value: 'WPP', label: 'WhatsApp' }
                ]}
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 2: CARRITO DE SERVICIOS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-brand-teal" /> Detalles del Pedido
            </h2>
            <button
              type="button"
              onClick={agregarDetalle}
              className="text-brand-teal font-semibold text-sm flex items-center gap-1 hover:text-brand-tealHover"
            >
              <Plus className="w-4 h-4" /> Agregar Ítem
            </button>
          </div>

          <div className="space-y-4">
            {detalles.map((detalle, index) => (
              <div key={detalle.id_local} className="p-4 border border-slate-100 bg-slate-50 rounded-xl relative">

                {detalles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => eliminarDetalle(detalle.id_local)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Fila 1: Servicio, Cantidad y Subtotal */}
                  <div className="col-span-1 md:col-span-7">
                    <SelectField 
                      label="Servicio *"
                      value={detalle.precio_id}
                      onChange={(e) => handleDetalleChange(detalle.id_local, 'precio_id', e.target.value)}
                      required
                      options={[
                        { value: '', label: '-- Seleccionar --' },
                        ...preciosDB.map(p => ({ value: p.id, label: `${p.servicio} ($${p.precio})` }))
                      ]}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <InputField 
                      label="Cantidad *"
                      type="number"
                      min="1"
                      value={detalle.cantidad}
                      onChange={(e) => handleDetalleChange(detalle.id_local, 'cantidad', parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-3 flex flex-col justify-center">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Subtotal</label>
                    <p className="font-bold text-slate-700 text-lg">${detalle.subtotal}</p>
                  </div>

                  {/* Fila 2: Descripción Adicional (ancho completo) */}
                  <div className="col-span-1 md:col-span-12 mt-2">
                    <TextAreaField 
                      label="Detalle / Notas (Opcional)"
                      placeholder="Ej. Anillado color negro, tapa transparente, retirar a las 15hs..."
                      value={detalle.descripcion}
                      onChange={(e) => handleDetalleChange(detalle.id_local, 'descripcion', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
            <div className="bg-brand-teal/10 px-6 py-4 rounded-xl border border-brand-teal/20 text-right min-w-[200px]">
              <p className="text-sm font-semibold text-brand-teal mb-1">Total a Pagar</p>
              <p className="text-3xl font-bold text-slate-800">${totalPedido}</p>
            </div>
          </div>
        </div>

        {/* BOTONERA */}
        <div className="flex justify-end pt-4">
          <ActionButton type="submit" disabled={isSaving}>
            {isSaving ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Guardando Transacción...</>
            ) : (
              <><Save className="w-5 h-5" /> Crear Pedido Completo</>
            )}
          </ActionButton>
        </div>

      </form>
    </div>
  );
}

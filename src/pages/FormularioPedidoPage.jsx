import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Loader2, User, Phone, ShoppingCart } from 'lucide-react';
import InputField from '../components/ui/InputField';
import ActionButton from '../components/ui/ActionButton';
import { supabase } from '../lib/supabaseClient';

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
      const { data } = await supabase.from('precios').select('*').order('servicio');
      if (data) setPreciosDB(data);
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

      // PASO 1: Buscar o Crear Cliente
      let cliente_id = null;
      
      // Intentamos buscar por el contacto (si lo escribió)
      if (cliente.contacto) {
        const { data: clienteExistente } = await supabase
          .from('clientes')
          .select('id')
          .eq('contacto', cliente.contacto)
          .maybeSingle(); // maybeSingle para no lanzar error si no existe
          
        if (clienteExistente) {
          cliente_id = clienteExistente.id;
        }
      }

      // Si no existe, lo creamos
      if (!cliente_id) {
        const { data: nuevoCliente, error: errorCliente } = await supabase
          .from('clientes')
          .insert([{ nombre_referencia: cliente.nombre_referencia, contacto: cliente.contacto }])
          .select()
          .single();
          
        if (errorCliente) throw new Error("Error al crear cliente: " + errorCliente.message);
        cliente_id = nuevoCliente.id;
      }

      // PASO 2: Crear el Pedido
      const { data: nuevoPedido, error: errorPedido } = await supabase
        .from('pedidos')
        .insert([{
          cliente_id: cliente_id,
          canal_venta: canalVenta,
          estado: 'PENDIENTE',
          total: totalPedido,
          abonado: 0 // Por defecto arranca en 0
        }])
        .select()
        .single();

      if (errorPedido) throw new Error("Error al crear pedido: " + errorPedido.message);

      // PASO 3: Crear los Detalles del Pedido
      // Preparamos el array para la BD (quitando id_local y mapeando las columnas correctas)
      const detallesParaInsertar = detalles.map(d => ({
        pedido_id: nuevoPedido.id,
        precio_id: d.precio_id,
        categoria: d.categoria || 'General',
        tipo_impresion: 'No aplica', // Por ahora lo dejamos por defecto
        descripcion: d.descripcion,
        cantidad: d.cantidad,
        subtotal: d.subtotal
      }));

      const { error: errorDetalles } = await supabase
        .from('detalles_pedido')
        .insert(detallesParaInsertar);

      if (errorDetalles) throw new Error("Error al crear detalles: " + errorDetalles.message);

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
                onChange={(e) => setCliente({...cliente, nombre_referencia: e.target.value})}
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Contacto (IG/Tel)</label>
              <InputField 
                placeholder="Ej. @juanperez o 381..." 
                icon={Phone}
                value={cliente.contacto}
                onChange={(e) => setCliente({...cliente, contacto: e.target.value})}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Canal de Venta</label>
              <select 
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all outline-none"
                value={canalVenta}
                onChange={(e) => setCanalVenta(e.target.value)}
              >
                <option value="LOCAL">Local Físico</option>
                <option value="IG">Instagram</option>
                <option value="WPP">WhatsApp</option>
              </select>
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
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Servicio *</label>
                    <select 
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-brand-teal outline-none"
                      value={detalle.precio_id}
                      onChange={(e) => handleDetalleChange(detalle.id_local, 'precio_id', e.target.value)}
                      required
                    >
                      <option value="">-- Seleccionar --</option>
                      {preciosDB.map(p => (
                        <option key={p.id} value={p.id}>{p.servicio} (${p.precio})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Cantidad *</label>
                    <input 
                      type="number"
                      min="1"
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-brand-teal outline-none"
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
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Detalle / Notas (Opcional)</label>
                    <textarea 
                      className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-brand-teal outline-none resize-none custom-scrollbar"
                      rows="2"
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

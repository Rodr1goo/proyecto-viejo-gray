import { supabase } from './supabaseClient';

/**
 * ============================================================================
 * SERVICIO: PEDIDOS Y TRANSACCIONES
 * ============================================================================
 * Maneja el núcleo del sistema: la gestión del Kanban y la creación
 * de órdenes de trabajo (que involucra múltiples tablas simultáneamente).
 */
export const pedidosService = {
  
  /**
   * Obtiene todos los pedidos junto con la información cruzada (JOINs)
   * del cliente y del detalle de los precios solicitados.
   * Utilizado para alimentar el Tablero Kanban.
   */
  async obtenerPedidos() {
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        clientes (
          nombre_referencia,
          contacto
        ),
        detalles_pedido (
          *,
          precios (
            servicio
          )
        )
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  /**
   * Actualiza únicamente la columna "estado" de un pedido.
   * Ideal para la acción de arrastrar y soltar (Drag & Drop) en el Kanban.
   */
  async actualizarEstadoPedido(id, nuevoEstado) {
    const { error } = await supabase
      .from('pedidos')
      .update({ estado: nuevoEstado })
      .eq('id', id);
    if (error) throw error;
  },

  /**
   * Transacción Maestra (Multi-capa).
   * Se encarga de:
   * 1. Buscar si el cliente existe por contacto, o crearlo si es nuevo.
   * 2. Crear la cabecera del pedido vinculada al cliente.
   * 3. Insertar el array de servicios solicitados (detalles) vinculados al pedido.
   * 
   * Todo esto se maneja desde el servicio para evitar lógica pesada en la UI.
   */
  async crearPedidoCompleto(clienteData, pedidoData, detallesParaInsertar) {
    // PASO 1: Manejo del Cliente (Buscar o Crear)
    let cliente_id = null;
    if (clienteData.contacto) {
      const { data } = await supabase
        .from('clientes')
        .select('id')
        .eq('contacto', clienteData.contacto)
        .maybeSingle();
      if (data) cliente_id = data.id;
    }
    
    if (!cliente_id) {
      const { data: nuevoCliente, error: errorCliente } = await supabase
        .from('clientes')
        .insert([{ nombre_referencia: clienteData.nombre_referencia, contacto: clienteData.contacto }])
        .select()
        .single();
        
      if (errorCliente) throw new Error("Error al crear cliente: " + errorCliente.message);
      cliente_id = nuevoCliente.id;
    }

    // PASO 2: Crear la cabecera del Pedido
    const { data: nuevoPedido, error: errorPedido } = await supabase
      .from('pedidos')
      .insert([{ ...pedidoData, cliente_id }])
      .select()
      .single();
      
    if (errorPedido) throw new Error("Error al crear pedido: " + errorPedido.message);

    // PASO 3: Crear los Detalles del Pedido (Carrito)
    const detallesConPedidoId = detallesParaInsertar.map(d => ({ ...d, pedido_id: nuevoPedido.id }));
    const { error: errorDetalles } = await supabase
      .from('detalles_pedido')
      .insert(detallesConPedidoId);
    
    if (errorDetalles) throw new Error("Error al crear detalles: " + errorDetalles.message);

    return nuevoPedido;
  }
};

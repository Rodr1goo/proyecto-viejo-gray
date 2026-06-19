import { supabase } from './supabaseClient';

export const pedidosService = {
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

  async actualizarEstadoPedido(id, nuevoEstado) {
    const { error } = await supabase
      .from('pedidos')
      .update({ estado: nuevoEstado })
      .eq('id', id);
    if (error) throw error;
  },

  async crearPedidoCompleto(clienteData, pedidoData, detallesParaInsertar) {
    // 1. Manejo del Cliente (Buscar o Crear)
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

    // 2. Crear Pedido
    const { data: nuevoPedido, error: errorPedido } = await supabase
      .from('pedidos')
      .insert([{ ...pedidoData, cliente_id }])
      .select()
      .single();
      
    if (errorPedido) throw new Error("Error al crear pedido: " + errorPedido.message);

    // 3. Crear Detalles del Pedido
    const detallesConPedidoId = detallesParaInsertar.map(d => ({ ...d, pedido_id: nuevoPedido.id }));
    const { error: errorDetalles } = await supabase
      .from('detalles_pedido')
      .insert(detallesConPedidoId);
    
    if (errorDetalles) throw new Error("Error al crear detalles: " + errorDetalles.message);

    return nuevoPedido;
  }
};

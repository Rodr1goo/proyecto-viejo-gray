import { supabase } from './supabaseClient';

export const dashboardService = {
  async obtenerDatosDashboard() {
    const [pedidosResponse, insumosResponse] = await Promise.all([
      supabase.from('pedidos').select('*, clientes(nombre_referencia)').order('created_at', { ascending: false }),
      supabase.from('insumos').select('*')
    ]);

    if (pedidosResponse.error) throw pedidosResponse.error;
    if (insumosResponse.error) throw insumosResponse.error;

    return {
      pedidos: pedidosResponse.data || [],
      insumos: insumosResponse.data || []
    };
  }
};

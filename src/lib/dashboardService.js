import { supabase } from './supabaseClient';

/**
 * ============================================================================
 * SERVICIO: DASHBOARD
 * ============================================================================
 * Encapsula las consultas principales de la pantalla de inicio.
 * Agrupa múltiples peticiones a Supabase para reducir la latencia.
 */
export const dashboardService = {
  
  /**
   * Obtiene de forma concurrente los pedidos y los insumos para calcular
   * métricas de ventas y alertas de stock.
   * @returns {Promise<{pedidos: Array, insumos: Array}>}
   */
  async obtenerDatosDashboard() {
    // Promise.all permite ejecutar ambas consultas al mismo tiempo
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

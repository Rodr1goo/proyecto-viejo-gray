import { supabase } from './supabaseClient';

/**
 * ============================================================================
 * SERVICIO: COMPOSICIÓN DE SERVICIOS (BILL OF MATERIALS)
 * ============================================================================
 * Maneja la relación entre los Servicios (Precios) y la Materia Prima (Insumos)
 * que consumen automáticamente al venderse.
 */
export const composicionService = {
  
  /**
   * Obtiene la lista de insumos requeridos para un servicio específico.
   * Utilizado al editar un servicio para cargar su receta actual.
   */
  async obtenerComposicionPorServicio(precio_id) {
    const { data, error } = await supabase
      .from('composicion_servicio')
      .select(`
        id,
        precio_id,
        insumo_id,
        cantidad_requerida,
        insumos (nombre)
      `)
      .eq('precio_id', precio_id);
      
    if (error) throw error;
    return data;
  },

  /**
   * Transacción: Reemplaza completamente la composición de un servicio.
   * Elimina los vínculos viejos y guarda los nuevos exactos que envía el UI.
   */
  async guardarComposicion(precio_id, insumosArray) {
    // 1. Borrar la composición anterior para este servicio
    const { error: deleteError } = await supabase
      .from('composicion_servicio')
      .delete()
      .eq('precio_id', precio_id);
      
    if (deleteError) throw new Error("Error limpiando composición vieja: " + deleteError.message);

    // 2. Si no hay insumos para vincular (lista vacía), terminamos acá
    if (!insumosArray || insumosArray.length === 0) return;

    // 3. Preparar los datos para inserción (asegurándonos de asociar el precio_id)
    // Filtramos aquellos que no tengan insumo seleccionado
    const datosValidos = insumosArray
      .filter(item => item.insumo_id)
      .map(item => ({
        precio_id: precio_id,
        insumo_id: item.insumo_id,
        cantidad_requerida: parseInt(item.cantidad_requerida) || 1
      }));

    if (datosValidos.length === 0) return;

    // 4. Insertar la nueva composición
    const { error: insertError } = await supabase
      .from('composicion_servicio')
      .insert(datosValidos);
      
    if (insertError) throw new Error("Error guardando nueva composición: " + insertError.message);
  }
};

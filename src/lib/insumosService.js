import { supabase } from './supabaseClient';

/**
 * ============================================================================
 * SERVICIO: INVENTARIO E INSUMOS
 * ============================================================================
 * Concentra toda la lógica de negocio (CRUD) relacionada a las materias primas.
 */
export const insumosService = {
  
  /**
   * Obtiene la lista completa de insumos ordenada alfabéticamente.
   * Útil para la grilla principal de Control de Stock.
   */
  async obtenerInsumos() {
    const { data, error } = await supabase
      .from('insumos')
      .select('*')
      .order('nombre');
    if (error) throw error;
    return data;
  },

  /**
   * Obtiene un único insumo por su ID.
   * Utilizado en la carga del Formulario ABM para edición.
   */
  async obtenerInsumoPorId(id) {
    const { data, error } = await supabase
      .from('insumos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Registra un nuevo insumo en la base de datos.
   */
  async crearInsumo(insumoData) {
    const { data, error } = await supabase
      .from('insumos')
      .insert([insumoData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Actualiza los datos (stock, nombre, categoría) de un insumo existente.
   */
  async actualizarInsumo(id, insumoData) {
    const { error } = await supabase
      .from('insumos')
      .update(insumoData)
      .eq('id', id);
    if (error) throw error;
  },

  /**
   * Elimina un insumo del catálogo.
   * Nota: Puede fallar si existen relaciones referenciales restrictivas activas en BD.
   */
  async eliminarInsumo(id) {
    const { error } = await supabase
      .from('insumos')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

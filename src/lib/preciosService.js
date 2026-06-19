import { supabase } from './supabaseClient';

/**
 * ============================================================================
 * SERVICIO: TARIFARIO Y PRECIOS
 * ============================================================================
 * Maneja todo el CRUD del catálogo de servicios que ofrece la imprenta.
 */
export const preciosService = {
  
  /**
   * Obtiene la lista de todos los servicios ofrecidos.
   * Se utiliza tanto en la Lista de Precios administrativa como en el
   * selector (dropdown) al momento de cargar un Nuevo Pedido.
   */
  async obtenerPrecios() {
    const { data, error } = await supabase
      .from('precios')
      .select('*')
      .order('categoria')
      .order('servicio');
    if (error) throw error;
    return data;
  },

  /**
   * Obtiene un único servicio/precio por su ID.
   * Utilizado en la carga del Formulario ABM para edición.
   */
  async obtenerPrecioPorId(id) {
    const { data, error } = await supabase
      .from('precios')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Crea un nuevo servicio tarifado en el sistema.
   */
  async crearPrecio(precioData) {
    const { data, error } = await supabase
      .from('precios')
      .insert([precioData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Actualiza el valor o los datos de un servicio existente.
   */
  async actualizarPrecio(id, precioData) {
    const { error } = await supabase
      .from('precios')
      .update(precioData)
      .eq('id', id);
    if (error) throw error;
  },

  /**
   * Elimina un servicio del tarifario.
   */
  async eliminarPrecio(id) {
    const { error } = await supabase
      .from('precios')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

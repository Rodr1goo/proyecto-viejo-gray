import { supabase } from './supabaseClient';

export const preciosService = {
  async obtenerPrecios() {
    const { data, error } = await supabase
      .from('precios')
      .select('*')
      .order('categoria')
      .order('servicio');
    if (error) throw error;
    return data;
  },

  async obtenerPrecioPorId(id) {
    const { data, error } = await supabase
      .from('precios')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async crearPrecio(precioData) {
    const { data, error } = await supabase
      .from('precios')
      .insert([precioData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async actualizarPrecio(id, precioData) {
    const { error } = await supabase
      .from('precios')
      .update(precioData)
      .eq('id', id);
    if (error) throw error;
  },

  async eliminarPrecio(id) {
    const { error } = await supabase
      .from('precios')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

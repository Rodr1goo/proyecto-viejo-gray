import { supabase } from './supabaseClient';

export const insumosService = {
  async obtenerInsumos() {
    const { data, error } = await supabase
      .from('insumos')
      .select('*')
      .order('nombre');
    if (error) throw error;
    return data;
  },

  async obtenerInsumoPorId(id) {
    const { data, error } = await supabase
      .from('insumos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async crearInsumo(insumoData) {
    const { data, error } = await supabase
      .from('insumos')
      .insert([insumoData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async actualizarInsumo(id, insumoData) {
    const { error } = await supabase
      .from('insumos')
      .update(insumoData)
      .eq('id', id);
    if (error) throw error;
  },

  async eliminarInsumo(id) {
    const { error } = await supabase
      .from('insumos')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

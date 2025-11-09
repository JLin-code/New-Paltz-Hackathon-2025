import { supabase } from '../config/database.js';

export class HallModel {
  static async create(hallData) {
    const { data, error } = await supabase
      .from('halls')
      .insert(hallData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('halls')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async findAll() {
    const { data, error } = await supabase
      .from('halls')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async findWithMachines(id) {
    const { data, error } = await supabase
      .from('halls')
      .select(`
        *,
        machines (*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async update(id, hallData) {
    const { data, error } = await supabase
      .from('halls')
      .update(hallData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase
      .from('halls')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}

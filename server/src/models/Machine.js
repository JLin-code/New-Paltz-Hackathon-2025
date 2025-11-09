import { supabase } from '../config/database.js';

export class MachineModel {
  static async create(machineData) {
    const { data, error } = await supabase
      .from('machines')
      .insert(machineData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .eq('hall_id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async findAll() {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .order('last_updated', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async update(id, machineData) {
    const { data, error } = await supabase
      .from('machines')
      .update({ ...machineData, last_updated: new Date().toISOString() })
      .eq('hall_id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase
      .from('machines')
      .delete()
      .eq('hall_id', id);
    
    if (error) throw error;
    return true;
  }
}

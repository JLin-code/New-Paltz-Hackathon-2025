const supabase = require("./supabase");

class Machine {
  constructor(data) {
    this.id = data.id;
    this.hall_id = data.hall_id;
    this.type = data.type; // 'washer' or 'dryer'
    this.machine_number = data.machine_number;
    this.status = data.status; // 'available', 'in_use', 'out_of_order'
    this.time_remaining = data.time_remaining; // in minutes
    this.last_updated = data.last_updated;
  }

  static async getAll() {
    const client = supabase.connect();
    const { data, error } = await client
      .from("machines")
      .select("*")
      .order("hall_id", { ascending: true })
      .order("machine_number", { ascending: true });

    if (error) throw error;
    return data.map((machine) => new Machine(machine));
  }

  static async getByHall(hallId) {
    const client = supabase.connect();
    const { data, error } = await client
      .from("machines")
      .select("*")
      .eq("hall_id", hallId)
      .order("machine_number", { ascending: true });

    if (error) throw error;
    return data.map((machine) => new Machine(machine));
  }

  static async getById(id) {
    const client = supabase.connect();
    const { data, error } = await client
      .from("machines")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return new Machine(data);
  }

  async update(updates) {
    const client = supabase.connect();
    const { data, error } = await client
      .from("machines")
      .update({
        ...updates,
        last_updated: new Date().toISOString(),
      })
      .eq("id", this.id)
      .select()
      .single();

    if (error) throw error;
    Object.assign(this, data);
    return this;
  }

  async updateStatus(status, timeRemaining = null) {
    const updates = { status };
    if (timeRemaining !== null) {
      updates.time_remaining = timeRemaining;
    }
    return this.update(updates);
  }

  static async create(machineData) {
    const client = supabase.connect();
    const { data, error } = await client
      .from("machines")
      .insert({
        ...machineData,
        last_updated: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return new Machine(data);
  }

  async delete() {
    const client = supabase.connect();
    const { error } = await client.from("machines").delete().eq("id", this.id);

    if (error) throw error;
    return true;
  }

  static async deleteById(id) {
    const client = supabase.connect();
    const { error } = await client.from("machines").delete().eq("id", id);

    if (error) throw error;
    return true;
  }
}

module.exports = Machine;

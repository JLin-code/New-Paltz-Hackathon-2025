const supabase = require("./supabase");

class Hall {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.building = data.building;
    this.washer_count = data.washer_count;
    this.dryer_count = data.dryer_count;
    this.created_at = data.created_at;
  }

  static async getAll() {
    const client = supabase.connect();
    const { data, error } = await client
      .from("halls")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data.map((hall) => new Hall(hall));
  }

  static async getById(id) {
    const client = supabase.connect();
    const { data, error } = await client
      .from("halls")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return new Hall(data);
  }

  static async getByName(name) {
    const client = supabase.connect();
    const { data, error } = await client
      .from("halls")
      .select("*")
      .eq("name", name)
      .single();

    if (error) throw error;
    return new Hall(data);
  }

  async getMachines() {
    const Machine = require("./Machine");
    return Machine.getByHall(this.id);
  }

  async getAvailableMachines() {
    const client = supabase.connect();
    const { data, error } = await client
      .from("machines")
      .select("*")
      .eq("hall_id", this.id)
      .eq("status", "available")
      .order("type", { ascending: true })
      .order("machine_number", { ascending: true });

    if (error) throw error;
    const Machine = require("./Machine");
    return data.map((machine) => new Machine(machine));
  }

  static async create(hallData) {
    const client = supabase.connect();
    const { data, error } = await client
      .from("halls")
      .insert(hallData)
      .select()
      .single();

    if (error) throw error;
    return new Hall(data);
  }

  async update(updates) {
    const client = supabase.connect();
    const { data, error } = await client
      .from("halls")
      .update(updates)
      .eq("id", this.id)
      .select()
      .single();

    if (error) throw error;
    Object.assign(this, data);
    return this;
  }

  async delete() {
    const client = supabase.connect();
    const { error } = await client.from("halls").delete().eq("id", this.id);

    if (error) throw error;
    return true;
  }

  static async deleteById(id) {
    const client = supabase.connect();
    const { error } = await client.from("halls").delete().eq("id", id);

    if (error) throw error;
    return true;
  }
}

module.exports = Hall;

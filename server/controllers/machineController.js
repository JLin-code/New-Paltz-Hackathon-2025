const Machine = require("../models/Machine");

const machineController = {
  // GET /api/machines
  async getAllMachines(req, res, next) {
    try {
      const machines = await Machine.getAll();
      res.json({
        success: true,
        data: machines,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/machines/hall/:hallId
  async getMachinesByHall(req, res, next) {
    try {
      const { hallId } = req.params;
      const machines = await Machine.getByHall(parseInt(hallId));
      res.json({
        success: true,
        data: machines,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/machines/:id
  async getMachineById(req, res, next) {
    try {
      const { id } = req.params;
      const machine = await Machine.getById(parseInt(id));
      res.json({
        success: true,
        data: machine,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/machines/:id/status
  async updateMachineStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, timeRemaining } = req.body;

      // Validate status
      const validStatuses = ["available", "in_use", "out_of_order"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: "Invalid status. Must be one of: " + validStatuses.join(", "),
        });
      }

      const machine = await Machine.getById(parseInt(id));
      await machine.updateStatus(status, timeRemaining);

      res.json({
        success: true,
        data: machine,
        message: "Machine status updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/machines/:id
  async updateMachine(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const machine = await Machine.getById(parseInt(id));
      await machine.update(updates);

      res.json({
        success: true,
        data: machine,
        message: "Machine updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/machines
  async createMachine(req, res, next) {
    try {
      const { hall_id, type, machine_number } = req.body;

      // Validate required fields
      if (!hall_id || !type || !machine_number) {
        return res.status(400).json({
          success: false,
          error: "hall_id, type, and machine_number are required",
        });
      }

      // Validate type
      const validTypes = ["washer", "dryer"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          error: 'type must be either "washer" or "dryer"',
        });
      }

      const machineData = {
        hall_id: parseInt(hall_id),
        type,
        machine_number: parseInt(machine_number),
        status: "available",
        time_remaining: 0,
      };

      const machine = await Machine.create(machineData);

      res.status(201).json({
        success: true,
        data: machine,
        message: "Machine created successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/machines/:id
  async deleteMachine(req, res, next) {
    try {
      const { id } = req.params;

      // Check if machine exists
      const machine = await Machine.getById(parseInt(id));

      // Delete the machine
      await machine.delete();

      res.json({
        success: true,
        message: "Machine deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = machineController;

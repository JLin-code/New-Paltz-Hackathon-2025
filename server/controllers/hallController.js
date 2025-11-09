const Hall = require("../models/Hall");

const hallController = {
  // GET /api/halls
  async getAllHalls(req, res, next) {
    try {
      const halls = await Hall.getAll();
      res.json({
        success: true,
        data: halls,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/halls/:id
  async getHallById(req, res, next) {
    try {
      const { id } = req.params;
      const hall = await Hall.getById(parseInt(id));
      res.json({
        success: true,
        data: hall,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/halls/name/:name
  async getHallByName(req, res, next) {
    try {
      const { name } = req.params;
      const hall = await Hall.getByName(name);
      res.json({
        success: true,
        data: hall,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/halls/:id/machines
  async getHallMachines(req, res, next) {
    try {
      const { id } = req.params;
      const hall = await Hall.getById(parseInt(id));
      const machines = await hall.getMachines();

      res.json({
        success: true,
        data: {
          hall: hall,
          machines: machines,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/halls/:id/available-machines
  async getAvailableMachines(req, res, next) {
    try {
      const { id } = req.params;
      const hall = await Hall.getById(parseInt(id));
      const availableMachines = await hall.getAvailableMachines();

      res.json({
        success: true,
        data: {
          hall: hall,
          available_machines: availableMachines,
          available_count: availableMachines.length,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/halls/:id/status
  async getHallStatus(req, res, next) {
    try {
      const { id } = req.params;
      const hall = await Hall.getById(parseInt(id));
      const machines = await hall.getMachines();

      // Count machines by status
      const statusCounts = machines.reduce((acc, machine) => {
        acc[machine.status] = (acc[machine.status] || 0) + 1;
        return acc;
      }, {});

      // Separate by type
      const washers = machines.filter((m) => m.type === "washer");
      const dryers = machines.filter((m) => m.type === "dryer");

      const washerStatus = washers.reduce((acc, machine) => {
        acc[machine.status] = (acc[machine.status] || 0) + 1;
        return acc;
      }, {});

      const dryerStatus = dryers.reduce((acc, machine) => {
        acc[machine.status] = (acc[machine.status] || 0) + 1;
        return acc;
      }, {});

      res.json({
        success: true,
        data: {
          hall: hall,
          overall_status: statusCounts,
          washer_status: washerStatus,
          dryer_status: dryerStatus,
          total_machines: machines.length,
          available_machines: statusCounts.available || 0,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/halls
  async createHall(req, res, next) {
    try {
      const { name, building, washer_count, dryer_count } = req.body;

      if (!name || !building) {
        return res.status(400).json({
          success: false,
          error: "name and building are required",
        });
      }

      const hallData = {
        name,
        building,
        washer_count: parseInt(washer_count) || 0,
        dryer_count: parseInt(dryer_count) || 0,
      };

      const hall = await Hall.create(hallData);

      res.status(201).json({
        success: true,
        data: hall,
        message: "Hall created successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/halls/:id
  async updateHall(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Validate id
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: "Valid hall ID is required",
        });
      }

      // Convert numeric fields
      if (updates.washer_count !== undefined) {
        updates.washer_count = parseInt(updates.washer_count);
      }
      if (updates.dryer_count !== undefined) {
        updates.dryer_count = parseInt(updates.dryer_count);
      }

      const hall = await Hall.getById(parseInt(id));
      await hall.update(updates);

      res.json({
        success: true,
        data: hall,
        message: "Hall updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/halls/:id
  async deleteHall(req, res, next) {
    try {
      const { id } = req.params;

      // Validate id
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: "Valid hall ID is required",
        });
      }

      // Check if hall exists
      const hall = await Hall.getById(parseInt(id));

      // Check if hall has machines (optional - you might want to prevent deletion if machines exist)
      const machines = await hall.getMachines();
      if (machines.length > 0) {
        return res.status(400).json({
          success: false,
          error:
            "Cannot delete hall with existing machines. Delete machines first.",
        });
      }

      // Delete the hall
      await hall.delete();

      res.json({
        success: true,
        message: "Hall deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = hallController;

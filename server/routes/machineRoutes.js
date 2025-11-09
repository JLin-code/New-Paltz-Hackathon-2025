const express = require("express");
const router = express.Router();
const machineController = require("../controllers/machineController");

// GET all machines
router.get("/", machineController.getAllMachines);

// GET machines by hall
router.get("/hall/:hallId", machineController.getMachinesByHall);

// GET machine by ID
router.get("/:id", machineController.getMachineById);

// PUT update machine status
router.put("/:id/status", machineController.updateMachineStatus);

// PUT update machine
router.put("/:id", machineController.updateMachine);

// POST create new machine
router.post("/", machineController.createMachine);

// DELETE machine
router.delete("/:id", machineController.deleteMachine);

module.exports = router;

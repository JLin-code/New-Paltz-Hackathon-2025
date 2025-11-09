const express = require("express");
const router = express.Router();
const hallController = require("../controllers/hallController");

// GET all halls
router.get("/", hallController.getAllHalls);

// GET hall by ID
router.get("/:id", hallController.getHallById);

// GET hall by name
router.get("/name/:name", hallController.getHallByName);

// GET all machines for a hall
router.get("/:id/machines", hallController.getHallMachines);

// GET available machines for a hall
router.get("/:id/available-machines", hallController.getAvailableMachines);

// GET hall status summary
router.get("/:id/status", hallController.getHallStatus);

// POST create new hall
router.post("/", hallController.createHall);

// PUT update hall
router.put("/:id", hallController.updateHall);

// DELETE hall
router.delete("/:id", hallController.deleteHall);

module.exports = router;

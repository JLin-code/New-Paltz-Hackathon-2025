import { Router } from 'express';
import { MachineModel } from '../models/Machine.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const machines = await MachineModel.findAll();
    res.json({ success: true, data: machines });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const machine = await MachineModel.findById(req.params.id);
    res.json({ success: true, data: machine });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const machine = await MachineModel.create(req.body);
    res.status(201).json({ success: true, data: machine });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const machine = await MachineModel.update(req.params.id, req.body);
    res.json({ success: true, data: machine });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await MachineModel.delete(req.params.id);
    res.json({ success: true, message: 'Machine deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;

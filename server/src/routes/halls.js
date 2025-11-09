import { Router } from 'express';
import { HallModel } from '../models/Hall.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const halls = await HallModel.findAll();
    res.json({ success: true, data: halls });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hall = await HallModel.findById(req.params.id);
    res.json({ success: true, data: hall });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

router.get('/:id/machines', async (req, res) => {
  try {
    const hall = await HallModel.findWithMachines(req.params.id);
    res.json({ success: true, data: hall });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const hall = await HallModel.create(req.body);
    res.status(201).json({ success: true, data: hall });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const hall = await HallModel.update(req.params.id, req.body);
    res.json({ success: true, data: hall });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await HallModel.delete(req.params.id);
    res.json({ success: true, message: 'Hall deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;

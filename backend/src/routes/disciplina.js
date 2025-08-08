import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Disciplina from '../models/Disciplina.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  const { q } = req.query;
  const filter = q ? { nome: { $regex: q, $options: 'i' } } : {};
  const list = await Disciplina.find(filter).sort({ createdAt: -1 });
  res.json(list);
});

router.get('/:id', async (req, res) => {
  const item = await Disciplina.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Disciplina não encontrada' });
  res.json(item);
});

const validators = [
  body('nome').isString().isLength({ min: 2 }),
  body('cargaHoraria').isInt({ min: 1 }).toInt(),
];

router.post('/', validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const created = await Disciplina.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updated = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Disciplina não encontrada' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const removed = await Disciplina.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Disciplina não encontrada' });
  res.json({ message: 'Disciplina removida' });
});

export default router;
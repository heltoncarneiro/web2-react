import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import Aluno from '../models/Aluno.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  const { q } = req.query;
  const filter = q
    ? { $or: [
        { nome: { $regex: q, $options: 'i' } },
        { matricula: { $regex: q, $options: 'i' } },
        { cpf: { $regex: q, $options: 'i' } },
      ] }
    : {};
  const alunos = await Aluno.find(filter).sort({ createdAt: -1 });
  res.json(alunos);
});

router.get('/:id', async (req, res) => {
  const aluno = await Aluno.findById(req.params.id);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json(aluno);
});

const alunoValidators = [
  body('nome').isString().isLength({ min: 2 }),
  body('endereco').isString().isLength({ min: 2 }),
  body('dataNascimento').isISO8601().toDate(),
  body('cpf').isString().isLength({ min: 11 }),
  body('matricula').isString().isLength({ min: 3 }),
  body('telefone').isString().isLength({ min: 8 }),
  body('email').isEmail().normalizeEmail(),
  body('curso').isString().isLength({ min: 2 }),
];

router.post('/', alunoValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'CPF ou Matrícula já cadastrados' });
    return res.status(500).json({ message: 'Erro ao criar aluno' });
  }
});

router.put('/:id', alunoValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json(aluno);
});

router.delete('/:id', async (req, res) => {
  const aluno = await Aluno.findByIdAndDelete(req.params.id);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json({ message: 'Aluno removido' });
});

export default router;
import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import Aluno from '../models/Aluno.js';
import Disciplina from '../models/Disciplina.js';
import AlunoDisciplina from '../models/AlunoDisciplina.js';

const router = Router();

router.use(requireAuth);

router.post(
  '/alocar',
  [
    body('alunoId').isMongoId(),
    body('disciplinaId').isMongoId(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { alunoId, disciplinaId } = req.body;

    const aluno = await Aluno.findById(alunoId);
    const disciplina = await Disciplina.findById(disciplinaId);
    if (!aluno || !disciplina) return res.status(404).json({ message: 'Aluno ou Disciplina não encontrados' });

    try {
      const rel = await AlunoDisciplina.create({ aluno: alunoId, disciplina: disciplinaId });
      res.status(201).json(rel);
    } catch (err) {
      if (err.code === 11000) return res.status(409).json({ message: 'Disciplina já alocada para este aluno' });
      return res.status(500).json({ message: 'Erro ao alocar disciplina' });
    }
  }
);

router.post(
  '/desalocar',
  [
    body('alunoId').isMongoId(),
    body('disciplinaId').isMongoId(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { alunoId, disciplinaId } = req.body;

    const rel = await AlunoDisciplina.findOneAndDelete({ aluno: alunoId, disciplina: disciplinaId });
    if (!rel) return res.status(404).json({ message: 'Relação não encontrada' });
    res.json({ message: 'Disciplina desalocada' });
  }
);

router.get('/por-matricula', [query('matricula').isString().isLength({ min: 1 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { matricula } = req.query;
  const aluno = await Aluno.findOne({ matricula });
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });

  const rels = await AlunoDisciplina.find({ aluno: aluno._id }).populate('disciplina');
  const disciplinas = rels.map(r => r.disciplina);
  res.json({ aluno: { id: aluno._id, nome: aluno.nome, matricula: aluno.matricula }, disciplinas });
});

export default router;
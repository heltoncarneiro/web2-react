import mongoose from 'mongoose';

const alunoDisciplinaSchema = new mongoose.Schema(
  {
    aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
  },
  { timestamps: true }
);

alunoDisciplinaSchema.index({ aluno: 1, disciplina: 1 }, { unique: true });

export default mongoose.model('AlunoDisciplina', alunoDisciplinaSchema);
import mongoose from 'mongoose';

const disciplinaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    cargaHoraria: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export default mongoose.model('Disciplina', disciplinaSchema);
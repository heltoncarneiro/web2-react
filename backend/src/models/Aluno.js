import mongoose from 'mongoose';

const alunoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    endereco: { type: String, required: true, trim: true },
    dataNascimento: { type: Date, required: true },
    cpf: { type: String, required: true, unique: true },
    matricula: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    curso: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Aluno', alunoSchema);
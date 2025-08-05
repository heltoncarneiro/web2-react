const mongoose = require("mongoose");
const { Schema } = mongoose;

const alunoSchema = new Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    cpf: { type: String, required: true, unique: true },
    matricula: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    disciplinas: [{
        type: Schema.Types.ObjectId,
        ref: "Disciplina"
    }]
}, { timestamps: true });

const Aluno = mongoose.model("Aluno", alunoSchema);

module.exports = Aluno;

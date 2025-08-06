const mongoose = require("mongoose");
const { Schema } = mongoose;

const alunoSchema = new Schema({
    nome: { type: String, required: true },
    endereco: { type: String },
    dataNascimento: { type: Date },
    cpf: { type: String },
    matricula: { type: String, required: true, unique: true },
    telefone: { type: String },
    email: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    disciplinas: [{
        type: Schema.Types.ObjectId,
        ref: "Disciplina"
    }]
}, { timestamps: true });

const Aluno = mongoose.model("Aluno", alunoSchema);

module.exports = Aluno;

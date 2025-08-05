const mongoose = require("mongoose");
const { Schema } = mongoose;

const disciplinaSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    cargaHoraria: { type: Number, required: true },
}, { timestamps: true });

const Disciplina = mongoose.model("Disciplina", disciplinaSchema);

module.exports = Disciplina;

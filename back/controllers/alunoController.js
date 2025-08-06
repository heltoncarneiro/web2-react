const Aluno = require("../models/Aluno");
const Disciplina = require("../models/Disciplina");
const validator = require("validator");

const alunoController = {
    create: async (req, res) => {
        try {
            const { email } = req.body;

            // Validation
            if (email && !validator.isEmail(email)) {
                return res.status(400).json({ msg: "Por favor, forneça um email válido." });
            }

            const aluno = await Aluno.create(req.body);
            res.status(201).json({ aluno, msg: "Aluno cadastrado com sucesso!" });
        } catch (error) {
            console.error(error);
            // Handle duplicate key errors
            if (error.code === 11000) {
                return res.status(400).json({ msg: `O ${Object.keys(error.keyValue)[0]} já está em uso.` });
            }
            res.status(500).json({ msg: "Erro ao cadastrar aluno." });
        }
    },

    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10, curso } = req.query;

            const filter = {};
            if (curso) {
                filter.curso = { $regex: curso, $options: "i" }; // case-insensitive search
            }

            const total = await Aluno.countDocuments(filter);
            const alunos = await Aluno.find(filter)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            res.json({
                alunos,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar alunos." });
        }
    },

    getAllSimple: async (req, res) => {
        try {
            const alunos = await Aluno.find({}, '_id nome');
            res.json(alunos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar alunos." });
        }
    },

    getById: async (req, res) => {
        try {
            const aluno = await Aluno.findById(req.params.id).populate('disciplinas');
            if (!aluno) {
                return res.status(404).json({ msg: "Aluno não encontrado." });
            }
            res.json(aluno);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar aluno." });
        }
    },

    update: async (req, res) => {
        try {
            const { email } = req.body;

            // Validation
            if (email && !validator.isEmail(email)) {
                return res.status(400).json({ msg: "Por favor, forneça um email válido." });
            }

            const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!aluno) {
                return res.status(404).json({ msg: "Aluno não encontrado." });
            }
            res.json({ aluno, msg: "Aluno atualizado com sucesso!" });
        } catch (error) {
            console.error(error);
            // Handle duplicate key errors
            if (error.code === 11000) {
                return res.status(400).json({ msg: `O ${Object.keys(error.keyValue)[0]} já está em uso.` });
            }
            res.status(500).json({ msg: "Erro ao atualizar aluno." });
        }
    },

    delete: async (req, res) => {
        try {
            const aluno = await Aluno.findByIdAndDelete(req.params.id);
            if (!aluno) {
                return res.status(404).json({ msg: "Aluno não encontrado." });
            }
            res.json({ msg: "Aluno excluído com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao excluir aluno." });
        }
    },

    addDisciplina: async (req, res) => {
        try {
            const { alunoId, disciplinaId } = req.params;
            const aluno = await Aluno.findByIdAndUpdate(
                alunoId,
                { $addToSet: { disciplinas: disciplinaId } },
                { new: true }
            );
            if (!aluno) {
                return res.status(404).json({ msg: "Aluno não encontrado." });
            }
            res.json({ aluno, msg: "Disciplina adicionada com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao adicionar disciplina." });
        }
    },

    removeDisciplina: async (req, res) => {
        try {
            const { alunoId, disciplinaId } = req.params;
            const aluno = await Aluno.findByIdAndUpdate(
                alunoId,
                { $pull: { disciplinas: disciplinaId } },
                { new: true }
            );
            if (!aluno) {
                return res.status(404).json({ msg: "Aluno não encontrado." });
            }
            res.json({ aluno, msg: "Disciplina removida com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao remover disciplina." });
        }
    },

    getAvailableDisciplinas: async (req, res) => {
        try {
            const aluno = await Aluno.findById(req.params.alunoId);
            if (!aluno) {
                return res.status(404).json({ msg: "Aluno não encontrado." });
            }

            const availableDisciplinas = await Disciplina.find({
                _id: { $nin: aluno.disciplinas }
            });

            res.json(availableDisciplinas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar disciplinas disponíveis." });
        }
    },
};

module.exports = alunoController;

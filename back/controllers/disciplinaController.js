const Disciplina = require("../models/Disciplina");

const disciplinaController = {
    create: async (req, res) => {
        try {
            const disciplina = await Disciplina.create(req.body);
            res.status(201).json({ disciplina, msg: "Disciplina cadastrada com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao cadastrar disciplina." });
        }
    },

    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;

            const total = await Disciplina.countDocuments();
            const disciplinas = await Disciplina.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            res.json({
                disciplinas,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar disciplinas." });
        }
    },

    getById: async (req, res) => {
        try {
            const disciplina = await Disciplina.findById(req.params.id);
            if (!disciplina) {
                return res.status(404).json({ msg: "Disciplina não encontrada." });
            }
            res.json(disciplina);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao buscar disciplina." });
        }
    },

    update: async (req, res) => {
        try {
            const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!disciplina) {
                return res.status(404).json({ msg: "Disciplina não encontrada." });
            }
            res.json({ disciplina, msg: "Disciplina atualizada com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao atualizar disciplina." });
        }
    },

    delete: async (req, res) => {
        try {
            const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
            if (!disciplina) {
                return res.status(404).json({ msg: "Disciplina não encontrada." });
            }
            res.json({ msg: "Disciplina excluída com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao excluir disciplina." });
        }
    },
};

module.exports = disciplinaController;

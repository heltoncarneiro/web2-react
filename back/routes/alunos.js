const router = require("express").Router();
const alunoController = require("../controllers/alunoController");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.post("/", alunoController.create);
router.get("/", alunoController.getAll);
router.get("/all", alunoController.getAllSimple); // Must be before /:id
router.get("/:id", alunoController.getById);
router.put("/:id", alunoController.update);
router.delete("/:id", alunoController.delete);

// Student-Discipline relationship
router.get("/:alunoId/disciplinas/disponiveis", alunoController.getAvailableDisciplinas);
router.post("/:alunoId/disciplinas/:disciplinaId", alunoController.addDisciplina);
router.delete("/:alunoId/disciplinas/:disciplinaId", alunoController.removeDisciplina);

module.exports = router;

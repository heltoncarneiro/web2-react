const router = require("express").Router();

const authRouter = require("./auth");
const alunosRouter = require("./alunos");
const disciplinasRouter = require("./disciplinas");

router.use("/auth", authRouter);
router.use("/alunos", alunosRouter);
router.use("/disciplinas", disciplinasRouter);

module.exports = router;

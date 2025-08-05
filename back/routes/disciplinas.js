const router = require("express").Router();
const disciplinaController = require("../controllers/disciplinaController");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.post("/", disciplinaController.create);
router.get("/", disciplinaController.getAll);
router.get("/:id", disciplinaController.getById);
router.put("/:id", disciplinaController.update);
router.delete("/:id", disciplinaController.delete);

module.exports = router;

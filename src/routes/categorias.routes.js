const router = require("express").Router();

const {
  allCategorias,
  categoriaById,
  addCategoria,
  deleteCategoria,
  updateCategoria,
  searchByName,
} = require("../controller/categoria.controller");

router.get("/", allCategorias);

router.get("/:idCategoria", categoriaById);
router.get("/byName/:data", searchByName)

router.post("/addCategoria", addCategoria);

router.delete("/:idCategoria", deleteCategoria);

router.patch("/:idCategoria", updateCategoria)

module.exports = router;

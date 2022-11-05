const router = require("express").Router();

const {
  allCategorias,
  categoriaById,
  addCategoria,
  deleteCategoria,
  updateCategoria,
  searchByName,
} = require("../controller/categoria.controller");
const { idCategoriaValidator, nameCategoriaValidator, bodyCategoriaValidator } = require("../validation/routes.test.");

router.get("/", allCategorias);

router.get("/:idCategoria", idCategoriaValidator, categoriaById);

router.get("/byName/:data", nameCategoriaValidator ,searchByName)

router.post("/addCategoria", bodyCategoriaValidator ,addCategoria);

router.delete("/deleteCategoria/:idCategoria", idCategoriaValidator, deleteCategoria);

router.patch("/updateCategoria/:idCategoria", idCategoriaValidator.concat(bodyCategoriaValidator) ,updateCategoria)

module.exports = router;
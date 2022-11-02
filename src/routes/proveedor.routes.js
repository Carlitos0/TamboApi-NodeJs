const { route } = require("./producto.routes");

const router = require("express").Router();

const {
  getProveedores,
  proveedorByName,
  proveedorById,
  addProveedor,
  deleteProveedor,
  updateProveedor,
  activeStateProveedor,
} = require("./../controller/proveedor.controller");

router.get("/", getProveedores);

router.get("/:idProveedor", proveedorById);

router.get("/proveedorByName/:proveedorName", proveedorByName);

router.post("/addProveedor", addProveedor);

router.delete("/deleteProveedor/:idProveedor", deleteProveedor);

router.patch("/updateProveedor/:idProveedor", updateProveedor);
router.patch("/changeState/:idProveedor", activeStateProveedor);

module.exports = router;

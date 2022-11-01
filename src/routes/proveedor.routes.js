const { route } = require("./producto.routes")

const router = require("express").Router()

const { getProveedores } = require("./../controller/proveedor.controller")

router.get("/", getProveedores)

router.get("/:idProveedor")

router.post("/addProveedor")

router.delete("/deleteProveedor/:idProveedor")

router.patch("/updateProveedor/:idProveedor")

module.exports = router
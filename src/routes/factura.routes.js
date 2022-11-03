const {Router} = require("express");
const { getFactura, facturaById, addFactura, updateFactura } = require("../controller/factura.controller");

const routes = Router();

routes.get("/", getFactura);

routes.get("/:idFactura", facturaById)

routes.post("/addFactura", addFactura)

routes.patch("/updateFactura/:idFactura", updateFactura)

module.exports = routes
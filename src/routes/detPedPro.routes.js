const { Router } = require("express");
const { getDetPedPro, detPedProById, addDetPedPro, updateDetPedPro } = require("../controller/detPedPro.controller");

const routes = Router();

routes.get("/", getDetPedPro)

routes.get("/:idDetPedPro", detPedProById)

routes.post("/addDetPedPro", addDetPedPro)

routes.patch("/updateDetPedPro/:idDetPedPro", updateDetPedPro)

module.exports = routes;
const { Router } = require("express");
const { getDetPedPro, detPedProById, addDetPedPro, updateDetPedPro } = require("../controller/detPedPro.controller");
const { idDetPedProValidator, bodyDetPedProValidator } = require("../validation/routes.test.");

const routes = Router();

routes.get("/", getDetPedPro)

routes.get("/:idDetPedPro", idDetPedProValidator ,detPedProById)

routes.post("/addDetPedPro",bodyDetPedProValidator ,addDetPedPro)

routes.patch("/updateDetPedPro/:idDetPedPro", idDetPedProValidator.concat(bodyDetPedProValidator), updateDetPedPro)

module.exports = routes;
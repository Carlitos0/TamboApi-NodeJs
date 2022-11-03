const {Router} = require("express");
const { getPedidos, pedidoById, pedidoByName, addPedido, updatePedido } = require("../controller/pedido.controller");

const routes = Router();

routes.get("/", getPedidos)

routes.get("/:idPedido", pedidoById)

routes.post("/addPedido", addPedido)

routes.patch("/updatePedido/:idPedido", updatePedido)

module.exports = routes;
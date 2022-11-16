const express = require("express");
const morgan = require("morgan");
const error404 = require("./validation/NotFound");
const cors = require("cors")

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

//Middlewares 
app.use(cors())
app.use(express.json())
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));

//Routes
app.use(require("./routes/index.routes"));
app.use("/categoria", require("./routes/categorias.routes"));
app.use("/producto", require("./routes/producto.routes"));
app.use("/proveedor", require("./routes/proveedor.routes"));
app.use("/pedido",require("./routes/pedido.routes"));
app.use("/factura",require("./routes/factura.routes"));
app.use("/detPedPro", require("./routes/detPedPro.routes"));
app.use(error404);
//
app.use("/public", express.static(`${__dirname}/storage/imgs`));

module.exports = app;
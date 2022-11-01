const express = require("express");
const morgan = require("morgan");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

//Middlewares 
app.use(express.json())
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/categoria", require("./routes/categorias.routes"));
app.use("/producto", require("./routes/producto.routes"));


//
app.use("/public", express.static(`${__dirname}/storage/imgs`));


module.exports = app;
const { getProducts, addProduct } = require("../controller/producto.controller");
const upload = require("../libs/storage");

const router = require("express").Router();


router.get("/", getProducts)


router.post("/add", upload.single("ProductImage"), addProduct);

module.exports = router;
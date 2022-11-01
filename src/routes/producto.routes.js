const { getProducts, addProduct, changeProductStatus, updateProduct, productById, productByName } = require("../controller/producto.controller");
const upload = require("../libs/storage");

const router = require("express").Router();


router.get("/", getProducts)

router.get("/:IdProduct", productById)

router.get("/productByName/:NameProduct", productByName)

router.post("/addProduct", upload.single("ProductImage"), addProduct)

router.delete("/changeProductStatus/:IdProduct", changeProductStatus)

router.patch("/updateProduct/:IdProduct", updateProduct)

module.exports = router;
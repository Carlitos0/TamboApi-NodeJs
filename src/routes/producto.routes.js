const upload = require("../libs/storage");

const router = require("express").Router();

const {
  getProducts,
  addProduct,
  updateProduct,
  productById,
  productByName,
  updateProductImage,
} = require("../controller/producto.controller");
const { idProductoValidator, bodyProductoValidator, nameProductoValidator } = require("../validation/routes.test.");

router.get("/", getProducts);

router.get("/:IdProduct", idProductoValidator ,productById);

router.get("/productByName/:NameProduct", nameProductoValidator, productByName);

router.post("/addProduct", bodyProductoValidator ,upload.single("ProductImage"), addProduct);

//router.delete("/changeProductStatus/:IdProduct", idProductoValidator ,changeProductStatus);

router.put("/updateProduct/:IdProduct", idProductoValidator.concat(bodyProductoValidator) ,updateProduct);

router.patch("/updateProductImage/:IdProduct",upload.single("ProductImage"), updateProductImage);

module.exports = router;

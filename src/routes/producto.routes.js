const upload = require("../libs/storage");

const router = require("express").Router();

const {
  getProducts,
  addProduct,
  changeProductStatus,
  updateProduct,
  productById,
  productByName,
  updateProductImage,
} = require("../controller/producto.controller");

router.get("/", getProducts);

router.get("/:IdProduct", productById);

router.get("/productByName/:NameProduct", productByName);

router.post("/addProduct", upload.single("ProductImage"), addProduct);

router.delete("/changeProductStatus/:IdProduct", changeProductStatus);


router.put("/updateProduct/:IdProduct", updateProduct);
router.patch("/updateProductImage/:IdProduct",upload.single("ProductImage"), updateProductImage);

module.exports = router;

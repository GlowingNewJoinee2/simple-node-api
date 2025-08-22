const express = require("express");
const router = express.Router();
const {getProducts, getProductById, updateProduct, deleteProduct, addProduct} = require("../controllers/product.controller.js");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", addProduct);

module.exports = router;
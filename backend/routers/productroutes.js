const express = require("express");
const {
  addproduct,
  viewproducts,
  viewSingleProduct,
} = require("../controllers/productcontroller");

const router = express.Router();

router.post("/addproduct", addproduct);

router.get("/viewproducts", viewproducts);

router.get("/viewproducts/:id", viewSingleProduct);

module.exports = router;
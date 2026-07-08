const express = require("express");
const {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} = require("../controllers/cartcontroller");
const requireLogin = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/cart", requireLogin, getCart);
router.post("/cart", requireLogin, addToCart);
router.patch("/cart/:productId", requireLogin, updateCartItem);
router.delete("/cart/:productId", requireLogin, removeCartItem);

module.exports = router;

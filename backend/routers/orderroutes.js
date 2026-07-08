const express = require("express");
const { createOrder, getOrders } = require("../controllers/ordercontroller");
const requireLogin = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/orders", requireLogin, createOrder);
router.get("/orders", requireLogin, getOrders);

module.exports = router;

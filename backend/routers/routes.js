const express=require("express");
const { register, login, logout, getCurrentUser } = require("../controllers/authcontroller");
const  router=express.Router();
router.post("/register",register)

router.post("/login",login)
router.post("/logout",logout)

router.get("/me", getCurrentUser);


module.exports=router;

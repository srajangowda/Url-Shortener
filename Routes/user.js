const express=require("express");
const { Usersignup, UserLogin }=require("../controllers/user");
const router=express.Router();

router.post("/",Usersignup);
router.post("/login",UserLogin);


module.exports=router;
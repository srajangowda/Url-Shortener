const express=require("express");
const router=express.Router();
const URL=require("../models/url");

router.get("/", async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    const allurls=await URL.find({ CreatedBy:req.user._id });
    return res.render("home",{
        urls:allurls,  
    });
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.get("/login",(req,res)=>{
    return res.render("login");
});

router.get("/land",(req,res)=>{
    res.render("landingpage");
})

router.get("/about",(req,res)=>{
    res.render("about");
})

module.exports=router;
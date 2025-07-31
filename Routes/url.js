const express=require("express");
const {generateShortUrl, Getanalytics}=require("../controllers/url");
const router=express.Router();


router.post("/",generateShortUrl);
router.get("/analytics/:shortId",Getanalytics);


module.exports=router;
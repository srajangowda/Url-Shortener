const shortid=require("short-id");
const URL=require("../models/url");


async function generateShortUrl(req,res){
    const body=req.body;
    const shorturlid=shortid.generate();
    if(!body.url) return res.status(400).json({error:"Url is Required"});
    
    await URL.create({
        ShorturlID: shorturlid,
          redirectUrl:body.url,
          visitHistory:[ ],
          CreatedBy:req.user._id,
    });

    return res.render("home",{
        id:shorturlid,
    })

}

async function Getanalytics(req,res){
   const result= await URL.findOne({
        ShorturlID:req.params.shortId,
    });
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}

module.exports={
    generateShortUrl,
    Getanalytics,
};
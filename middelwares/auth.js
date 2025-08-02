const { getUser }=require("../service/auth");

async function restrictloginuser(req,res,next){
    const Useruid=req.cookies?.uid;

    if(!Useruid) return res.redirect("/login");

    const user=getUser(Useruid);

    if(!user) return res.redirect("/login");

    req.user=user;
    next();
}

async function checkAuth(req,ress,next) {
    const Useruid=req.cookies?.uid;
    const user=getUser(Useruid);
    req.user=user;
    next();
}

module.exports={
    restrictloginuser,
    checkAuth,
}
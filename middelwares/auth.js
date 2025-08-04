const { getUser }=require("../service/auth");

async function restrictloginuser(req, res, next) {
    const Useruid = req.cookies?.uid;

    if (!Useruid) return res.redirect("/login");

    let user;
    try {
        user = getUser(Useruid); // this can throw
    } catch (err) {
        console.log("JWT error:", err.message); // Optional debug
        return res.redirect("/login");
    }

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const Useruid = req.cookies?.uid;

    try {
        const user = getUser(Useruid);
        req.user = user;
    } catch (err) {
        req.user = null; // optional
        return res.redirect("/land")
    }

    next();
}


module.exports={
    restrictloginuser,
    checkAuth,
}
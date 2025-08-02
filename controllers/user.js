const {v4: uuidv4 }=require("uuid")
const { setUser }=require("../service/auth");
const User=require("../models/user");


async function Usersignup(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email, 
        password,
    });
    return res.redirect("/"); 
}

async function UserLogin(req,res){
    const {email,password}=req.body;
  const user=  await User.findOne({email,password});
  if(!user) return res.render("login",{
    error:"Invalid Username or Password",
  })

  const sesssionId=uuidv4();
  setUser(sesssionId,user);
  res.cookie("uid",sesssionId);
    return res.redirect("/"); 
}


module.exports={
    Usersignup,
    UserLogin,
}
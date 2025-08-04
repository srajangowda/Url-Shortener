const jwt=require("jsonwebtoken");
const secrete="Srajan@$123456789";

function setUser( user) { 
    return jwt.sign({
        _id:user.id,
        email:user.email,
    },secrete);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secrete);
}

module.exports={
    setUser,
    getUser,
}
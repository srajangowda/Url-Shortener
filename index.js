const express=require("express");
const path=require("path");

const cookieParser=require("cookie-parser");
const {restrictloginuser, checkAuth}=require("./middelwares/auth");

const {ConnectMongodb}=require("./connections");
const URL=require("./models/url");

const app=express();
const PORT=8001;


const urlRoute=require("./Routes/url");
const staticRoute=require("./Routes/staticRouter");
const userRoute=require("./Routes/user");

ConnectMongodb("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDb Connected"));
  
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/test", async (req,res)=>{
    const Allurl=await URL.find({});
    return res.render("home",{
        urls:Allurl,
    });
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictloginuser,urlRoute);
app.use("/user",userRoute);
app.use("/", checkAuth, staticRoute);
app.use("/land",staticRoute);
app.use("/about",staticRoute);

app.get("/:shortId", async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {
            ShorturlID:req.params.shortId,
        },
        {
            $push:{
              visitHistory:{
                timestamp:Date.now(),
              },
            },
        }
        
    );

    if (!entry){
            return res.status(404).json({ error: "Short URL not found" });
        };
    res.redirect(entry.redirectUrl);
});
app.listen(PORT,()=>{console.log(`Server Started At PORT ${PORT}`)});


const mongoose=require("mongoose");
const shortid=require("short-id");



const urlSchema=new mongoose.Schema({
      ShorturlID:{
        type : String,
        unique: true,
        // default: shortid.generate(),
      },
      redirectUrl:{
        type: String,
        required: true,
      },
      visitHistory:[{ timestamp: { type: Number }}],
},
{ timestamps: true}
);

const URL=mongoose.model("url",urlSchema);

module.exports=URL;
const mongoose = require("mongoose");

const productschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

   
})

const productmodel=mongoose.model("products",productschema)
module.exports=productmodel;
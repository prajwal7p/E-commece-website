const mongoose=require("mongoose")
const dbconnect=async () => {
    await mongoose.connect(process.env.url)
    console.log("connected")
}
module.exports=dbconnect
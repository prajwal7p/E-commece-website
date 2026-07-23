const mongoose=require("mongoose")
const dbconnect=async () => {
    await mongoose.connect(process.env.MONGODB_URI || process.env.url)
    console.log("connected")
}
module.exports=dbconnect

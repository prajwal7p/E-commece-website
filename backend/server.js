require("dotenv").config()
const dbconnect = require("./databases");

const app = require("./src/app");
const port = process.env.PORT || 3000;
dbconnect()
app.listen(port,(e)=>{
    try{
        console.log(`http://localhost:${port}`)
    }
    catch(e){
        console.log(e)
    }
})

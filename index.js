
const express = require("express")
const { connect } = require("./config/db")
const cors = require("cors");
require('dotenv').config();

// Routes here 
const { UserRegister } = require("./routes/Register.routes")


const app = express()
app.use(cors())
app.use(express.json());


app.use("/api", UserRegister)

app.get("/", (req, res) => {
    res.send("Welcome To Backend Of Social Media App")
})

















app.listen(process.env.MONGOOSE_PORT_SERVER, async ()=> {
  try{
      await connect
      console.log("Connected to db")
      console.log({msg:"Your server is running at 4000 port"})
  }catch(err){
      console.log("Connection failed to db")
      console.log(err)
  }
})
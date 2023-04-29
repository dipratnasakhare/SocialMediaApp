const express = require("express");
const UserRegister = express.Router();

// Model import for adding user
const { ModelRegister } = require("../model/Register.model");



const bcrypt = require("bcrypt"); // Bcript import for password protect
const jwt = require("jsonwebtoken"); // jwt import for geting unic token


UserRegister.get("/", (req, res) => {
  res.send("Welcome To Register")
})



UserRegister.post("/register", async (req, res) => {
    const UserDetails = req.body;
    const { email, password } = UserDetails;
    const unic = "8723ty8723872109809][32/";
    try {
      let Single_User = await ModelRegister.find({ email });
      if (Single_User.length !== 0) {
        return res
          .status(200)
          .send({ msg: "User already exists", status: "error" });
      } else {
        bcrypt.hash(password, 8, async (err, protected_password) => {
          if (!err) {
            UserDetails.password = protected_password;
            const UserId = jwt.sign({ email, id: password }, unic);
            UserDetails.UserId = UserId;
            let NewUser = new ModelRegister(UserDetails);
            NewUser.save();
            res
              .status(201)
              .send({ msg: "User has been created", status: "success" });
          } else {
            console.log(err, "err line 43");
            res
              .status(404)
              .send({
                msg: "Something went wrong please try again",
                status: "error",
              });
          }
        });
      }
    } catch (err) {
      console.log(err, "err line 50");
      res
        .status(404)
        .send({ msg: "Something went wrong please try again", status: "error" });
    }
  });


  // get all users 

  UserRegister.get("/users", async (req, res) => {
    try {
      let All_User = await ModelRegister.find();
      res.status(200).send({ users: All_User });
    } catch (err) {
      res
        .status(404)
        .send({
          msg: "Something went wrong please try again",
          err,
          status: "error",
        });
    }
  })
  

  
  UserRegister.get("/users/:id/friends", async (req, res) => {
    let id = req.params.id

    try {
      let All_User = await ModelRegister.find({_id:id});
      res.status(200).send({ users: All_User });
    
    } catch (err) {
      res
        .status(404)
        .send({
          msg: "Something went wrong please try again",
          err,
          status: "error",
        });
    }
  })
  
  module.exports = { UserRegister };

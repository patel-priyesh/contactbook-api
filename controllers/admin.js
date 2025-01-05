var ADMIN = require('../model/admin')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

exports.SECURE = async function (req, res, next) {
  try {
    const token = req.headers.authorization    // token check    
    if (!token) {
      throw new Error("user is not valid");
    }

    const isValidToken = jwt.verify(token, "test")         // orignal check token after work
    console.log(isValidToken);

    const isuser = await ADMIN.findById(isValidToken.id)     // check for user login in database(mongodb)

    if (!isuser) {
      throw new Error("user is not login")             // user logout after not login with token
    }

    next()    

  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

exports.signupAdmin = async function (req, res, next) {
  try {
    let {email, Password } = req.body;
    Password = await bcrypt.hash(Password, 8);
    // console.log(firstname, lastname, email, Password);
    
    let userCreate = await ADMIN.create({
      email,
      Password
    });
    res.status(201).json({
      status: "success",
      message: "Admin signup successfully",
      data: userCreate,
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    })
  }
}

exports.loginAdmin = async function (req, res, next) {
  try {
    let { email, Password } = req.body;
    let userFind = await ADMIN.findOne({ email })
    if (!userFind) {
      throw new Error("Admin not found")
    }
    let passwordVerify = await bcrypt.compare(Password, userFind.Password)
    if (!passwordVerify) {
      throw new Error("password invalid");
    }

    const token = jwt.sign({ id: userFind._id }, "test")

    res.status(200).json({
      status: "success",
      message: "Admin login successfully",
      data: userFind,
      token
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    })
  }
}

exports.readAdmin = async function (req, res, next) {
  try {
    let findData = await ADMIN.find()
    res.status(200).json({
      status: "Success",
      message: "Admin Data Found",
      data: findData
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};
var USER = require('../model/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.SECURE = async (req,res,next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      throw new Error("Token is Missing!");
    }    
    
    const isValidToken = jwt.verify(token,"test") 

    req.user = isValidToken.id        //  user read only self contact
    
    const isuser = await USER.findById(isValidToken.id)
     if(!isuser){
      throw new Error("user is not login");      
     }

     next()

  } catch (error) {
    res.status(400).json({
      status:"Fail",
      message: error.message
   })
  }
}

exports.signupuser = async function (req, res, next) {
  try {
    // console.log(req.file);
    // return res.send("test")
    
    let { firstname, lastname, email, Password } = req.body;
    Password = await bcrypt.hash(Password, 8);
    // console.log(firstname, lastname, email, Password);

    let check = await USER.findOne({ email: email });
    if (check) throw new Error("Email is already exist");
    
    
    let userCreate = await USER.create({
      firstname,
      lastname,
      email,
      Password,
      profile : req.files.map(file => file.filename),
    });
    res.status(201).json({
      status: "success",
      message: "User signup successfully",
      data: userCreate,
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    })
  }
}

exports.loginuser = async function (req, res, next) {
  try {
    let { email, Password } = req.body;
    
    let userFind = await USER.findOne({ email })
    if (!userFind) {
      throw new Error("user not found")
    }
    let passwordVerify = await bcrypt.compare(Password, userFind.Password)
    if (!passwordVerify) {
      throw new Error("password invalid");
    }

    const token = jwt.sign({ id: userFind._id }, "test")

    res.status(200).json({
      status: "success",
      message: "User login successfully",
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

exports.deleteuser = async function (req, res, next) {
  try {
    let findData = await USER.findById(req.params.id)
    if (!findData) throw new Error('user not found')

     await USER.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: "Success",
      message: "User Delete Successfull",
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};

exports.updateuser = async function (req, res, next) {
  try {

    if (req.body.Password) {
      req.body.Password = await bcrypt.hash(req.body.Password, 8);
    }
    let findData = await USER.findById(req.params.id)
    if (!findData) throw new Error('user not found')
    // console.log(req.body);

    let Data = await USER.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({
      status: "Success",
      message: "User Update Successfull",
      data: Data
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};

exports.readuser = async function (req, res, next) {
  try {
    let finduser;
    if (req.query.search) {
      finduser = await USER.find({
        $or: [
          { firstname: { $regex: req.query.search, $options: 'i' } },
          { lastname: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      });
      } else {
        finduser = await USER.find();
        }
    res.status(200).json({
      status: "Success",
      message: "User Data Found",
      data: finduser  
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};
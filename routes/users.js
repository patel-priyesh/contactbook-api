var express = require('express');
var   router = express.Router();
const controller = require('../controllers/user')
const admincontroller = require('../controllers/admin')
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "."+file.originalname.split('.').pop())
    }
  })
  
  const upload = multer({ storage: storage })

/* GET users listing. */
router.post('/signup',upload.array('profile',2),controller.signupuser)
router.post('/login',controller.loginuser);
router.delete('/delete/:id', admincontroller.SECURE,controller.deleteuser)
router.patch('/update/:id', admincontroller.SECURE,controller.updateuser)
router.get('/read',admincontroller.SECURE, controller.readuser)

module.exports = router;

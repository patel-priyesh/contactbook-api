var express = require('express');
var router = express.Router();
const controller = require('../controllers/contact')
const usercontroller = require('../controllers/user')

/* GET users listing. */
router.post('/creatcontact',usercontroller.SECURE,controller.creatcontact);
router.get('/read',usercontroller.SECURE,controller.readcontact);
router.patch('/update/:id',usercontroller.SECURE, controller.updatecontact);
router.delete('/delete/:id',usercontroller.SECURE, controller.deletecontact);

module.exports = router;

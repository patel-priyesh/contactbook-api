var express = require('express');
var router = express.Router();
const controller = require('../controllers/admin')

/* GET users listing. */
router.post('/signup',controller.signupAdmin)
router.post('/login',controller.loginAdmin);
router.get('/read', controller.SECURE,controller.readAdmin)

module.exports = router;

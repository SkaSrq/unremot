const router = require('express').Router();
const userController = require("../controllers/userController")
router.get('/user',userController.getUserController)

module.exports = router;
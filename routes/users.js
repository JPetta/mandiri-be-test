var express = require('express');
var router = express.Router();
const UserController = require("../controller/UserController")

/* GET users listing. */
router.post('/', UserController.register);
router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.delete('/:id', UserController.delete);
router.put('/:id', UserController.update);


module.exports = router;

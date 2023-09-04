var express = require('express');
var router = express.Router();
const BookController = require("../controller/BookController")

/* GET users listing. */
router.post('/', BookController.addBook);
router.get('/', BookController.findAll);
router.get('/:id', BookController.findOne);
router.delete('/:id', BookController.delete);
router.put('/:id', BookController.update);

module.exports = router;

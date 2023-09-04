var express = require('express');
var router = express.Router();
const RecordController = require("../controller/RecordController")

/* GET users listing. */
router.post('/', RecordController.addRecord);
router.get('/', RecordController.findAll);
router.get('/:id', RecordController.findOne);
router.delete('/:id', RecordController.delete);
router.put('/:id', RecordController.update);

module.exports = router;

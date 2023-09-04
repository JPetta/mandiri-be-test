var express = require('express');
var router = express.Router();
const userRoutes = require("./users")
const bookRoutes = require("./books")
const recordRoutes = require("./records")

router.use('/user', userRoutes);
router.use('/book', bookRoutes);
router.use('/record', recordRoutes);

module.exports = router;

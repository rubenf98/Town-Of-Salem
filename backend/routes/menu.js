const express = require("express");
const router = express.Router();
var MenuController = require('../controllers/MenuController')

router.get("/", MenuController.index);

module.exports = router;
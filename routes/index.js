const express = require('express');
const router = express.Router();
const controllers = require("../controller/controller")


router.get('/', controllers.myIndex);

module.exports = router;

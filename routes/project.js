const express = require('express');
const router = express.Router();

const projectController = require("../controllers/projectController")

router.get("/list", projectController.getList)

module.exports = router;
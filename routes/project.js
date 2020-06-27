const express = require('express');
const router = express.Router();

const projectController = require("../controllers/projectController")

router.get('/create', projectController.getCreate);
router.get("/list", projectController.getList)

router.post('/create', projectController.postCreate)

module.exports = router;
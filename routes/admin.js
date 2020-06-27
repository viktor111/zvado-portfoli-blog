const express = require('express');
const router = express.Router();

const adminController = require("../controllers/adminController")

router.get("/login", adminController.getAdminLogin)
router.get("/main", adminController.getAdminMain)

router.post("/login", adminController.postAdminLogin)

module.exports = router;
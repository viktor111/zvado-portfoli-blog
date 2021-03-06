const express = require('express');
const router = express.Router();

const blogController = require("../controllers/blogController")

router.get("/main", blogController.getMain)
router.get("/post", blogController.getCreate)
router.get("/details/:id", blogController.getDetails)

router.post("/post", blogController.postCreate)

module.exports = router;
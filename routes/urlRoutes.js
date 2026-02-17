const express = require('express')
const router = express.Router()

const urlController = require('../controller/urlController')
const {authenticate} = require("../middleware/authenticate")

router.get("/allUrls", authenticate, urlController.getAllUrls)
router.post("/createShortUrl", authenticate, urlController.createShortUrl)
router.get("/:short_url", urlController.urlHitter)

module.exports = router
const router = require('express').Router()
const authController = require('../controller/authController')
const {authenticate} = require('../middleware/authenticate')


router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.post("/refreshToken", authController.refreshToken)

router.get("/access", authenticate, authController.access)

module.exports = router;


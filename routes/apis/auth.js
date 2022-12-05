const express = require("express");
const { receptionistRegister, receptionistLogin, generateToken } = require("../../auth");
const router = express.Router();
const isVerify = require('../../middleware/checkAuth')

router.route("/register").post(isVerify,receptionistRegister);
router.route("/login").post(isVerify,receptionistLogin);
router.route("/generateToken").get(generateToken);



module.exports = router;
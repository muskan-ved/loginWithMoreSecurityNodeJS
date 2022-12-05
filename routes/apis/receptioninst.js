const express = require("express");
const { getReceptioninst, updateReceptioninst, deleteReceptioninst } = require("../../controllers/receptionistController");
const router = express.Router();
const isVerify = require('../../middleware/auth')

router.route("/getReceptioninst/:id?").get(isVerify,getReceptioninst);
router.route("/updateReceptioninst/:id").put(isVerify,updateReceptioninst);
router.route("/deleteReceptioninst/:id?").delete(isVerify,deleteReceptioninst);

module.exports = router;

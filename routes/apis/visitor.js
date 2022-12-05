const express = require("express");
const { addVisitor, getVisitor, updateVisitor, deleteVisitor, deleteMultipleVisitor } = require("../../controllers/visitorController");
const router = express.Router();
const isVerify = require('../../middleware/auth')

router.route("/addVisitor").post(isVerify,addVisitor);
router.route("/getVisitor/:id?").get(isVerify,getVisitor);
router.route("/updateVisitor/:id").put(isVerify,updateVisitor);
router.route("/deleteVisitor/:id").delete(isVerify,deleteVisitor);
router.route("/deleteMultiple").delete(isVerify,deleteMultipleVisitor);

module.exports = router;

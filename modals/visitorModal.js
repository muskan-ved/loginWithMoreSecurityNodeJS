const mongoose = require("mongoose");
const validator = require("validator");

var VisitorSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      minlength: 3,
      required: [true, "please provide first name"],
    },
    age: { type: Number, min: 18, required: [true, "please provide age"] },
    address: { type: String, required: [true, "please provide address"] },
    status: { type: String, default: "none" },
    checkInTime: { type: Date },
    checkOutTime: { type: Date },
    purposeToVisit: {
      type: String,
      required: [true, "please provide address of area"],
    },
    emailAddress: {
      type: String,
      unique: true,
      required: [true, "please provide email address"],
      lowercase: true,
      validate: {
        validator: validator.isEmail,
      },
    },
    phoneNumber: {
      type: String,
      // validate: {
      //   validator: function (v) {
      //     var re = /^\d{10}$/;
      //     return !v || !v.trim().length || re.test(v);
      //   },
      //   message: "Mobile number is must be 10 digits.",
      // },
      required: [true, "please provide phone number"],
    },
  },
  { timestamps: true }
);

var visitor = mongoose.model("Visitor", VisitorSchema);
module.exports = visitor;


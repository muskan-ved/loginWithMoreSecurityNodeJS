const mongoose = require("mongoose");
const validator = require("validator");
const { isValidPassword } = require('mongoose-custom-validators')

var RegisteSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      required: [true, "please provide first name"],
    },
    lastName: {
      type: String,
      minlength: 3,
      required: [true, "please provide last name"],
    },
    userName: {
      type: String,
      minlength: 3,
      unique: true,
      required: [true, "please provide user name"],
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
    password: {
      type: String,
      minlength: 10,
      validate: {
        validator: (str) => isValidPassword(str, { uppercase: false },{minlength:6}),
        message: 'Password must have at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
      },
    },
    confirmPassword: {
      type: String,
      minlength: 10,
    },
    phoneNumber: {
      type: String,
    //   validate: {
    //     validator: function(v) {
    //         var re = /^\d{10}$/;
    //         return (!v || !v.trim().length) || re.test(v)
    //     },
    //     message: 'Mobile number is must be 10 digits.'
    // },
      required: [true, "please provide phone number"],
    },
    age: { type: Number,min:18, required: [true, "please provide age"] },
    addressOfArea: {
      type: String,
      required: [true, "please provide address of area"],
    },
    dob: { type: Date, required: [true, "please provide Date of birth"] },
  },
  { timestamps: true}
);

var registration = mongoose.model("Receptioninst", RegisteSchema);
module.exports = registration;


// Modal import to connect table
const Register = require("../modals/receptionistModal");
const customFunc = require('../helper/ageCalculate');

// bcrypt Import for password encrypt
const bcrypt = require("bcrypt");

// JWT Import
const jwt = require("jsonwebtoken");

// moment import
var moment = require("moment");

// Authorization token
exports.generateToken = async (req, res, next) => {
  const token = jwt.sign(
    {
      secrete: "GENERATETOKENSECRETEKEY",
    },
    process.env.GENERATETOKEN,
    {
      expiresIn: "1hr",
    }
  );
  res.status(200).send({ AuthorizationToken: token });
};

// register functionality
exports.receptionistRegister = async (req, res, next) => {
  const {
    firstName,
    lastName,
    userName,
    emailAddress,
    password,
    confirmPassword,
    phoneNumber,
    age,
    addressOfArea,
    dob,
  } = req.body;

  const dateObject = new Date(dob);
  const getDobFormat = moment(dateObject, "MM-DD-YYYY");
  const getDobAge = customFunc.getAge(getDobFormat);
  
  const salt = bcrypt.genSaltSync(10, "a");
  const hash = bcrypt.hashSync(password, salt);
  const chash = bcrypt.hashSync(confirmPassword, salt);
  req.body.password = hash;
  req.body.confirmPassword = chash;

  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ message: "Data Not in Proper Formated..." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Both password must be same..." });
  } else if (age * 1 !== getDobAge) {
    res.status(400).send({
      message: "According to your date of birth, your age is not correct...",
    });
  } else {
    try {
      await Register.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        emailAddress: emailAddress,
        password: req.body.password,
        phoneNumber: phoneNumber,
        age: age,
        addressOfArea: addressOfArea,
        dob: dob,
      }).then((newUser) =>
        res.status(200).json({
          message: "User successfully created...",
          newUser,
        })
      );
    } catch (err) {
      res.status(400).json({
        message: "User not successful created...",
        error: err.message,
      });
    }
  }
};

// login functionality
exports.receptionistLogin = (req, res, next) => {
  const { password, userName } = req.body;
  Register.findOne({
    $or: [{ userName: userName }, { emailAddress: userName }],
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          return res.status(400).json({
            message: "password is incorrect",
          });
        }
        if (result) {
          let token;
          token = jwt.sign(
            {
              userName: user.userName,
              _id: user._id,
			  generatedToken:req.headers['authorization']
            },
            process.env.LOGINKEY,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            user: user,
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
};


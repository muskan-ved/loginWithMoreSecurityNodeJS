const Receptioninst = require("../modals/receptionistModal");

// bcrypt Import for password encrypt
const bcrypt = require("bcrypt");

exports.getReceptioninst = async (req, res) => {
  if (req.params.id) {
    await Receptioninst.findById(req.params.id).exec(function (err, data) {
      if (data) {
        res.status(200).send(data);
      } else {
        if (err === null) {
        res.status(400).json({ message: "Id not found" });
        } else {
          res.status(400).send(err.message);
        }
      }
    });
  } else {
    await Receptioninst.find()
      .then(async (response) => {
        res.status(200).send({ users: response, totalRecords: response.length });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
};

exports.updateReceptioninst = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    emailAddress,
    password,
    phoneNumber,
    age,
    addressOfArea,
    dob,
  } = req.body;

  if (req.body) {
  if(password){
    const salt = bcrypt.genSaltSync(10, "a");
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    }

    await Receptioninst.findOneAndUpdate(
      { _id: req.params.id },
      {
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        emailAddress:emailAddress,
        password:req.body.password,
        phoneNumber:phoneNumber,
        age:age,
        addressOfArea:addressOfArea,
        dob:dob,
      },
      { new: true }
    )
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(400).json({ message: "Id not found" });
      });
  }
};

exports.deleteReceptioninst = async(req,res) =>{
   
  await Receptioninst.findByIdAndDelete(req.params.id).then((data)=>{
    console.log(data)
      if(!data){
          res.status(400).send({
              message: "Id is required",
          });
      }
      else {
          res.status(200).send({
              message: "Deleted successfully",
          });
      }
  }).catch((err) => {
      res.status(400).send({
          message: "Deleted failed ---> " + err,
      });
  })
}

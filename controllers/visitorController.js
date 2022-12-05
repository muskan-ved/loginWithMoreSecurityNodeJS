const Visitors = require("../modals/visitorModal");

exports.addVisitor = async (req, res, next) => {
  const {
    Name,
    age,
    address,
    emailAddress,
    checkInTime,
    checkOutTime,
    status,
    purposeToVisit,
    phoneNumber,
  } = req.body;

  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ message: "Data Not in Proper Formated..." });
  }

  if (age * 1 < 18) {
    res.status(400).send({
      message: "Under 18 visitor is not allowed...",
    });
  } else {
    try {
      await Visitors.create({
        Name: Name,
        emailAddress: emailAddress,
        checkInTime: checkInTime,
        phoneNumber: phoneNumber,
        age: age,
        address: address,
        checkOutTime: checkOutTime,
        status: status,
        purposeToVisit: purposeToVisit,
      }).then((newUser) =>
        res.status(200).json({
          message: "Visitor created successfully...",
          newUser,
        })
      );
    } catch (err) {
      res.status(400).json({
        message: "Visitor created failed...",
        error: err.message,
      });
    }
  }
};

exports.getVisitor = async (req, res) => {
  if (req.params.id) {
    await Visitors.findById(req.params.id).exec(function (err, data) {
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
  } else if (req.query.search) {
    await Visitors.find({
      $or: [
        { Name: { $regex: req.query.search || "", $options: "i" } },
        { emailAddress: {$regex : req.query.search || "", $options: "i"} },
        { status: { $regex: req.query.search || "", $options: "i" } },
      ],
    })
      .then((response) => {
        if (response.length > 0) {
          res.status(200).send({ visitors:response, totalRecords: response.length });
        } else {
          res.status(400).json({
            message: "Result not found...",
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "Result not found...",
          Error: err.message,
        });
      });
  } else {
    await Visitors.find()
      .then(async (response) => {
        res.status(200).send({ visitors: response, totalRecords: response.length });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
};

exports.updateVisitor = async (req, res) => {
  const {
    Name,
    age,
    address,
    emailAddress,
    checkInTime,
    checkOutTime,
    status,
    purposeToVisit,
    phoneNumber,
  } = req.body;

  if (req.body) {
    await Visitors.findOneAndUpdate(
      { _id: req.params.id },
      {
        Name: Name,
        emailAddress: emailAddress,
        checkInTime: checkInTime,
        phoneNumber: phoneNumber,
        age: age,
        address: address,
        checkOutTime: checkOutTime,
        status: status,
        purposeToVisit: purposeToVisit,
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

exports.deleteVisitor = async (req, res) => {
  await Visitors.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "Id is required",
        });
      } else {
        res.status(200).send({
          message: "Deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: "Deleted failed ---> " + err,
      });
    });
};

exports.deleteMultipleVisitor = async (req, res) => {

  await Visitors.deleteMany( { $in: req.body } )
    .then((data) => {
      if (data.deletedCount === 0) {
        res.status(400).send({
          message: "Id is required",
        });
      } else {
        res.status(200).send({
          message: "Deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: "Deleted failed ---> " + err,
      });
    });
};


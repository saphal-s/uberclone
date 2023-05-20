const Driver = require("../models/Driver");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createToken = (driver) => {
  return jwt.sign(
    {
      driverId: driver.id,
      isAdmin: driver.isAdmin,
    },
    process.env.SECRET,
    {
      expiresIn: "2d",
    }
  );
};

module.exports.regiserValidations = [
  body("name").not().isEmpty().withMessage("Name is reqired"),
  body("email").not().isEmpty().withMessage("Email is required"),
  body("phone").not().isEmpty().withMessage("Phone number is required"),
  body("password").not().isEmpty().withMessage("Password number is required"),
  body("phone").isLength({ min: 10 }).withMessage("Phone number is not valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 character long"),
];
module.exports.driverRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, phone, seat, vehicleno } = req.body;
  try {
    const checkDriver = await Driver.findOne({ email });
    if (checkDriver) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already exit" }] });
    }
    //hash passowrd
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      const driver = await Driver.create({
        name,
        email,
        phone,
        seat,
        vehicleno,
        password: hash,
      });
      const token = createToken(driver);
      return res
        .status(200)
        .json({ msg: "Your account has been created", token });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.loginValidations = [
  body("email").not().isEmpty().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
module.exports.driverLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const driver = await Driver.findOne({ email });
    if (driver) {
      const matched = await bcrypt.compare(password, driver.password);
      if (matched) {
        const token = createToken(driver);
        return res.json({ msg: "Successfully login", token });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "Passowrd is incorrect" }] });
      }
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "Driver does not exit with that email" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

exports.list = async (req, res) => {
  try {
    const response = await Driver.find()
      .sort({ updatedAt: -1 })
      .select("-passwordHash");
    return res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error, msg: error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Driver.findOne({ _id: id }).select("-passwordHash");
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, msg: error.message });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    const updated = await Driver.findOne({
      _id: req.params.id,
    });
    if (req.file) {
      updated.image = req.file.path;
    }
    updated.save();
    // res.json(updated);
    res.status(200).json({ msg: "Your profile has been updated" });
  } catch (err) {
    console.log("Image update error", err);
    return res.status(400).send({ msg: "Image update failed" });
  }
};

module.exports.updateSeat = async (req, res) => {
  const { bookseat } = req.body;
  console.log(req);
  console.log(req.body.bookseat);
  // let totalSeat = bookseat / 1 + seat / 1;
  // console.log(totalSeat);
  try {
    const response = await Driver.findByIdAndUpdate(
      { _id: req.params.id },
      { bookseat }
    );
    return res.status(200).json({ msg: res.message });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
module.exports.cancelSeat = async (req, res) => {
  const { bookseat } = req.body;
  console.log(req);
  console.log(req.body.bookseat);
  // let totalSeat = bookseat / 1 + seat / 1;
  // console.log(totalSeat);
  try {
    const response = await Driver.findByIdAndUpdate(
      { _id: req.params.id },
      { bookseat }
    );
    return res.status(200).json({ msg: res.message });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

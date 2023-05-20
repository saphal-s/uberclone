const express = require("express");
const {
  list,
  read,
  login,
  register,
  regiserValidations,
  loginValidations,
  updateProfileImage,
  order,
  orders,
  remove,
  orderUpdate,
} = require("../controller/userController");
const upload = require("../middleware/upload");
const { auth, adminCheck } = require("../utils/auth");
const router = express.Router();

router.post("/register", regiserValidations, register);
router.post("/order", order);
router.get("/orders", orders);
router.delete("/order/:id", remove);
router.get("/users", list);
router.post("/orderComplete/:id", orderUpdate);
router.get("/user/:id", auth, read);
router.put("/profilepic/:id", auth, upload.single("image"), updateProfileImage);
router.post("/login", loginValidations, login);

module.exports = router;

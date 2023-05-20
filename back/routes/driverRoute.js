const express = require("express");
const {
  list,
  read,
  driverLogin,
  driverRegister,
  regiserValidations,
  loginValidations,
  updateProfileImage,
  updateSeat,
  cancelSeat,
} = require("../controller/driverController");
const upload = require("../middleware/upload");
const { auth, adminCheck } = require("../utils/auth");
const router = express.Router();

router.post("/dregister", regiserValidations, driverRegister);
router.get("/driver", list);
router.get("/driver/:id", auth, read);
router.put(
  "/dprofilepic/:id",
  auth,
  upload.single("image"),
  updateProfileImage
);
router.post("/dlogin", loginValidations, driverLogin);
router.post("/driverseat/:id", updateSeat);
router.post("/driverseats/:id", cancelSeat);

module.exports = router;

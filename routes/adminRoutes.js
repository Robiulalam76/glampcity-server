const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getRoleInfo,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updateSeller,
} = require("../controller/adminController");
const { passwordVerificationLimit } = require("../config/others");
const { isAuth } = require("../config/auth");

//register a staff
router.post("/register", registerAdmin);

//login a admin
router.post("/login", loginAdmin);

//forget-password
router.put("/forget-password", passwordVerificationLimit, forgetPassword);

//reset-password
router.put("/reset-password", resetPassword);

//add a staff
router.post("/add", addStaff);

//get all staff
router.post('/', getAllStaff);
router.get("/", getAllStaff);

// //get a staff
router.get("/:id", getStaffById);

//update a staff
router.put("/:id", updateStaff);

//update as a seller
router.put("/seller/:id", updateSeller);

//delete a staff
router.delete("/:id", isAuth, deleteStaff);


// get role info
router.get("/getRoleInfo", isAuth, getRoleInfo)


module.exports = router;

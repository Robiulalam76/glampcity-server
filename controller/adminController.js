const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const jwt = require("jsonwebtoken");
const { signInToken, tokenForVerify, sendEmail } = require("../config/auth");
const Admin = require("../models/Admin");
const User = require("../models/User");

const registerAdmin = async (req, res) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(403).send({
        message: "This Email already Added!",
        status: 403,
      });
    }
    else {
      const newStaff = new Admin({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role && req.body.role,

        password: bcrypt.hashSync(req.body.password),
      });
      const staff = await newStaff.save();
      const token = signInToken(staff);
      res.send({
        token,
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        joiningData: Date.now(),
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    const seller = await User.findOne({ email: req.body.email });
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = signInToken(admin);
      res.send({
        token,
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
      });
    }
    else if (seller && bcrypt.compareSync(req.body.password, seller.password)) {
      const token = signInToken(seller);
      res.send({
        token,
        _id: seller._id,
        name: seller.name,
        phone: seller.phone,
        email: seller.email,
        image: seller.image,
      });
    }
    else {
      res.status(401).send({
        message: "Invalid Admin or password!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get admin or seller info

const getRoleInfo = async (req, res) => {
  try {
    const { _id } = req.user
    console.log("hello-------", _id);
    const isAdmin = await Admin.findById({ _id: _id })
    const isSeller = await User.findById({ _id: _id })
    if (isAdmin && isAdmin?.role === "admin") {
      res.send(isAdmin);
    }
    else if (isSeller && isSeller?.role === "seller") {
      res.send(isSeller);
    }
    else {
      res.status(500).send({
        message: "User Not Valid",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}



// const forgetPassword = async (req, res) => {
//   const isAdded = await Admin.findOne({ email: req.body.verifyEmail });
//   if (!isAdded) {
//     return res.status(404).send({
//       message: "Admin/Staff Not found with this email!",
//     });
//   } else {
//     const token = tokenForVerify(isAdded);
//     const body = {
//       from: process.env.EMAIL_USER,
//       to: `${req.body.verifyEmail}`,
//       subject: "Password Reset",
//       html: `<h2>Hello ${req.body.verifyEmail}</h2>
//       <p>A request has been received to change the password for your <strong>Dashtar</strong> account </p>

//         <p>This link will expire in <strong> 15 minute</strong>.</p>

//         <p style="margin-bottom:20px;">Click this link for reset your password</p>

//         <a href=${process.env.ADMIN_URL}/reset-password/${token}  style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password </a>


//         <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@dashtar.com</p>

//         <p style="margin-bottom:0px;">Thank you</p>
//         <strong>Dashtar Team</strong>
//              `,
//     };
//     const message = "Please check your email to reset password!";
//     sendEmail(body, res, message);
//   }
// };

// const resetPassword = async (req, res) => {
//   const token = req.body.token;
//   const { email } = jwt.decode(token);
//   const staff = await Admin.findOne({ email: email });

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
//       if (err) {
//         return res.status(500).send({
//           message: "Token expired, please try again!",
//         });
//       } else {
//         staff.password = bcrypt.hashSync(req.body.newPassword);
//         staff.save();
//         res.send({
//           message: "Your password change successful, you can login now!",
//         });
//       }
//     });
//   }
// };

// const addStaff = async (req, res) => {
//   try {
//     const isAdded = await Admin.find({ email: req.body.data.email });
//     if (isAdded) {
//       return res.status(500).send({
//         message: "This Email already Added!",
//       });
//     } else {
//       const newStaff = new Admin({
//         name: req.body.data.name,
//         email: req.body.data.email,
//         password: bcrypt.hashSync(req.body.data.password),
//         phone: req.body.data.phone,
//         joiningDate: req.body.data.joiningDate,
//         role: req.body.data.role,
//         image: req.body.data.image,
//       });
//       await newStaff.save();
//       res.status(200).send({
//         message: "Staff Added Successfully!",
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

// const getAllStaff = async (req, res) => {
//   try {
//     const admins = await Admin.find({}).sort({ _id: -1 });
//     res.send(admins);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

// const getStaffById = async (req, res) => {
//   try {
//     const admin = await Admin.findById({ _id: req.params.id });
//     res.send(admin);
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

// const updateStaff = async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.params.id);
//     if (admin) {
//       admin.name = req.body.data.name;
//       admin.email = req.body.data.email;
//       admin.phone = req.body.data.phone;
//       admin.role = req.body.data.role;
//       admin.joiningData = dayjs().utc().format(req.body.data.joiningDate);
//       admin.password = req.body.data.password
//         ? bcrypt.hashSync(req.body.data.password)
//         : admin.password;
//       admin.image = req.body.data.image;
//       const updatedAdmin = await admin.save();
//       const token = signInToken(updatedAdmin);
//       res.send({
//         token,
//         _id: updatedAdmin._id,
//         name: updatedAdmin.name,
//         email: updatedAdmin.email,
//         role: updatedAdmin.role,
//         image: updatedAdmin.image,
//         joiningData: updatedAdmin.joiningData,
//       });
//     }
//   } catch (err) {
//     res.status(404).send(err.message);
//   }
// };
// const updateSeller = async (req, res) => {
//   try {
//     const user = await Admin.findById(req.params.id);

//     if (user) {
//       // const updatedAdmin = await admin.save();
//       // res.send({
//       //   token,
//       //   _id: updatedAdmin._id,
//       //   name: updatedAdmin.name,
//       //   email: updatedAdmin.email,
//       //   role: updatedAdmin.role,
//       //   image: updatedAdmin.image,
//       //   joiningData: updatedAdmin.joiningData,
//       // });
//       await Admin.updateOne(
//         { _id: req.params.id },
//         {
//           $set: {
//             role: "seller",
//           },
//         }
//       );
//       res.status(200).send({
//         message: "Seller Updated Successfully",
//         status: 200,
//       });
//     }
//   } catch (err) {
//     res.status(404).send(err.message);
//   }
// };

// const deleteStaff = (req, res) => {
//   Admin.deleteOne({ _id: req.params.id }, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: err.message,
//       });
//     } else {
//       res.status(200).send({
//         message: "User Deleted Successfully!",
//       });
//     }
//   });
// };



module.exports = {
  registerAdmin,
  loginAdmin,
  // forgetPassword,
  // resetPassword,
  // addStaff,
  // getAllStaff,
  // getStaffById,
  // updateStaff,
  // deleteStaff,
  // updateSeller,

  getRoleInfo,
};

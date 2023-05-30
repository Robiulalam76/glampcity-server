require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { signInToken, tokenForVerify, sendEmail } = require("../config/auth");
const Admin = require("../models/Admin");
// const Admin = require("../models/Admin");

const verifyEmailAddress = async (req, res) => {
  const isAdded = await User.findOne({ email: req.body.email });
  if (isAdded) {
    return res.status(403).send({
      message: "This Email already Added!",
    });
  } else {
    const token = tokenForVerify(req.body);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.email}`,
      subject: "Email Activation",
      subject: "Verify Your Email",
      html: `<h2>Hello ${req.body.email}</h2>
      <p>Verify your email address to complete the signup and login into your <strong>KachaBazar</strong> account.</p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for active your account</p>

        <a href=${process.env.STORE_URL}/user/email-verification/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Kachabazar Team</strong>
             `,
    };

    const message = "Please check your email to verify!";
    sendEmail(body, res, message);
  }
};


// register user
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    company,
    country,
    phone,
    role,
  } = req.body;

  const findCompany = await User.findOne({ company: company });
  console.log(req.body);

  try {
    if (findCompany) {
      return res.status(200).json({
        status: "error",
        message: { companyMessage: "Company Name Already in Use" },
        data: req.body.company
      });
    }
    else {
      const isAdded = await User.findOne({ email: email });
      if (isAdded) {
        return res.status(200).json({
          status: "error",
          message: { emailMessage: "Email Already in Use" },
          data: req.body.email
        });
      }
      else {
        const newUser = new User({
          name,
          email,
          company,
          country,
          phone,
          role,
          password: bcrypt.hashSync(password),
        });
        newUser.save();
        // const token = signInToken({ name, email, password: bcrypt.hashSync(password) });
        res.send({
          success: true,
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          message: "Please Login Now!",
        });
      }
    }

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert z",
      error: error.message,
    });
  }
};


// user login with email and Password
const loginUser = async (req, res) => {
  console.log(req.body.email);
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        status: "error",
        error: error.message,
      });
    }
    else {
      const findUser = await User.findOne({ email: email })
      // console.log(findUser);
      if (!findUser) {
        return res.send({
          status: "error",
          message: { emailMessage: "There is no account on this email" }
        });
      }
      else {
        if (findUser?.verified === 'false') {
          return res.send({
            status: "error",
            message: { emailMessage: "Email Not Verified" }
          });
        }
        else {

          if (bcrypt.compareSync(password, findUser.password)) {
            const token = signInToken(findUser);
            res.send({
              token,
              success: true,
              _id: findUser._id,
              name: findUser.name,
              email: findUser.email,
              address: findUser.address,
              phone: findUser.phone,
              image: findUser.image,
            });
          }
          else {
            return res.send({
              status: "error",
              message: { passwordMessage: "password is not correct" }
            });
          }

        }
      }

    }

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert a",
      error: error.message,
    });
  }
};


// login with email and password
// const loginUser = async (req, res) => {
//   console.log(req.body);

//   try {
//     const user = await User.findOne({ email: req.body.email });
//     console.log(user);

//     if (user && user?.verified === 'true' && user.password && bcrypt.compareSync(req.body.password, user.password)) {
//       const token = signInToken(user);
//       res.send({
//         token,
//         success: true,
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         address: user.address,
//         phone: user.phone,
//         image: user.image,
//       });
//     }
//     else if (user?.verified === "false") {
//       res.status(201).send({
//         login: false,
//         message: "unverified account Please Verify Your Account",
//       })
//     }
//     else {
//       res.status(401).send({
//         message: "Invalid user or password!",
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

const forgetPassword = async (req, res) => {
  const isAdded = await User.findOne({ email: req.body.verifyEmail });
  if (!isAdded) {
    return res.status(404).send({
      message: "User Not found with this email!",
    });
  } else {
    const token = tokenForVerify(isAdded);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.verifyEmail}`,
      subject: "Password Reset",
      html: `<h2>Hello ${req.body.verifyEmail}</h2>
      <p>A request has been received to change the password for your <strong>Kachabazar</strong> account </p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href=${process.env.STORE_URL}/user/forget-password/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Kachabazar Team</strong>
             `,
    };

    const message = "Please check your email to reset password!";
    sendEmail(body, res, message);
  }
};

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const user = await User.findOne({ email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: "Token expired, please try again!",
        });
      } else {
        user.password = bcrypt.hashSync(req.body.newPassword);
        user.save();
        res.send({
          message: "Your password change successful, you can login now!",
        });
      }
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user.password) {
      return res.send({
        message:
          "For change password,You need to sign in with email & password!",
      });
    } else if (
      user &&
      bcrypt.compareSync(req.body.currentPassword, user.password)
    ) {
      user.password = bcrypt.hashSync(req.body.newPassword);
      await user.save();
      res.send({
        message: "Your password change successfully!",
      });
    } else {
      res.status(401).send({
        message: "Invalid email or current password!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const signupWithSocial = async (req, res) => {
  try {
    const findEmail = await User.findOne({ email: req.body.email })

    if (findEmail && findEmail?.createWith === "google") {
      console.log("ace user");
      const token = signInToken(findEmail);
      res.status(200).json({
        token,
        success: true,
        message: "Data insert successfully",
      });
    }
    else {

      const newUser = {
        email: req.body.email,
        name: req.body.name && req.body.name,
        image: req.body.image,
        createWith: req.body.createWith,
        verified: req.body.verified
      }
      console.log(newUser);
      const result = await User.create(newUser)

      if (result) {
        const token = signInToken(result);
        res.status(200).json({
          token,
          success: true,
          message: "Data insert successfully",
        });
      }
    }

  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert z",
      error: error.message,
    });
  }
};

const signUpWithProvider = async (req, res) => {
  try {
    const isAdded = await User.findOne({ email: req.body.email });
    if (isAdded) {
      const token = signInToken(isAdded);
      res.send({
        token,
        _id: isAdded._id,
        name: isAdded.name,
        email: isAdded.email,
        address: isAdded.address,
        phone: isAdded.phone,
        image: isAdded.image,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
      });

      const user = await newUser.save();
      const token = signInToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      user.image = req.body.image;
      const updatedUser = await user.save();
      const token = signInToken(updatedUser);
      res.send({
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        image: updatedUser.image,
      });
    }
  } catch (err) {
    res.status(404).send({
      message: "Your email is not valid!",
    });
  }
};

// get user info by token verified => email
const getUserInfo = async (req, res) => {
  console.log(req?.user?.email);
  try {
    const user = await User.findOne({ email: req.user.email })
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// patch user info by user id
const patchUserInfoById = async (req, res) => {
  try {
    const id = req.params.id;
    const patchData = req.body;
    const user = await User.findById({ _id: id });

    if (user) {
      console.log(req.body, id);
      const result = await User.updateOne(
        { _id: id },
        { $set: patchData },
        { runValidators: true }
      );
      res.status(200).json({
        update: true,
        status: "success",
        message: "Update successfully",
        data: result,
      });
    }

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "upadate couldn't success",
      error: error.message,
    });
  }
}

const deleteUser = async (req, res) => {

  try {
    const { _id } = req.user
    const isAdmin = await Admin.findById({ _id: _id })
    if (isAdmin?.role === 'admin') {
      const result = await User.deleteOne({ _id: req.params.id })
      res.status(200).send({
        message: "User Delete Successfully!",
      });
    }

  } catch (error) {
    res.status(500).send({
      message: err.message,
    });
  }

};


module.exports = {
  loginUser,
  registerUser,
  signUpWithProvider,
  verifyEmailAddress,
  forgetPassword,
  changePassword,
  resetPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  patchUserInfoById,
  getUserInfo,
  signupWithSocial
};

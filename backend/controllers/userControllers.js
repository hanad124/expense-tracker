const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/tokenModel");

const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User Already Registered." });
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newuser = new User(req.body);
      await newuser.save();
      // await sendEmail(result, "verifyemail");
      res.status(200).send({
        success: true,
        message: "User registered successfully , Please verify your email.",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      const passwordsMatched = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordsMatched) {
        if (user.isVerified) {
          const dataToBeSentToFrontend = {
            _id: user._id,
          };
          const token = jwt.sign(
            dataToBeSentToFrontend,
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).send({
            success: true,
            message: "User Logged in Successfully.",
            data: token,
          });
        } else {
          res
            .status(200)
            .send({ success: false, message: "Email not verified" });
        }
      } else
        res.status(200).send({ success: false, message: "Incorrect Password" });
    } else {
      res
        .status(200)
        .send({ success: false, message: "User Does Not Exists", data: null });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

const sendPasswordResetLink = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      await sendEmail(user, "resetpassword");
      res.send({
        success: true,
        message: `Password reset link sent to your email : ${user.email} successfully.`,
        data: null,
      });
    } else {
      res.send({
        success: false,
        message: `Account with email : ${req.body.email} does not exists.`,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

const verifyEmailLink = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (!user.isVerified) {
        await sendEmail(user, "verifyemail");
        res.send({
          success: true,
          message: `Account verification link sent to your email : ${user.email} successfully`,
          data: null,
        });
      } else {
        res.send({
          success: false,
          message: `Account with email : ${user.email} is already verified.`,
          data: null,
        });
      }
    } else {
      res.send({
        success: false,
        message: `Account with email : ${req.body.email} does not exists.`,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const tokenData = await Token.findOne({ token: req.body.token });
    if (tokenData) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.pass, salt);
      const user = await User.findOne({ _id: tokenData.userid });
      user.password = hashedPassword;
      await user.save();
      await Token.findOneAndDelete({ token: req.body.token });
      res.status(200).send({
        data: null,
        success: true,
        message: `Account with email : ${user.email} Password Resetted Successfully.`,
      });
    } else {
      res.status(400).send({
        data: null,
        success: false,
        message: `Expired or Invalid Link.`,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

const verifyemail = async (req, res) => {
  try {
    const tokenData = await Token.findOne({ token: req.body.token });
    if (tokenData) {
      const user = await User.findOne({ _id: tokenData.userid });
      const email = user.email;
      user.isVerified = true;
      await user.save();
      await Token.findOneAndDelete({ token: req.body.token });
      res.status(200).send({
        data: null,
        success: true,
        message: `Account with email : ${email} Verified Successfully.`,
      });
    } else {
      res.status(400).send({
        data: null,
        success: false,
        message: `Expired or Invalid Link`,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    user.password = "";
    if (user) {
      res.send({
        success: true,
        message: "User Info Fetched Successfully.",
        data: user,
      });
    } else {
      res.send({
        success: false,
        message: "User does not exists.",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const image = req.body.profileImage;

    const user = await User.findOne({ _id: req.body.userid });

    if (user) {
      user.profilePicture = image;
      await user.save();
      res.status(200).send({
        message: "User Profile Updated Successfully.",
        data: user,
        success: true,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

// update user name
const updateUserName = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    if (user) {
      user.name = req.body.name;
      await user.save();
      res.send({
        data: null,
        message: `Your Name Changed to ${req.body.name} Successfully.`,
        success: true,
      });
    }
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

const updateUserEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    if (user) {
      user.email = req.body.email;
      user.isVerified = false;
      await user.save();
      res.send({
        data: null,
        message: `Your Email Changed to ${req.body.email} Successfully. You're required to verify it before next login`,
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: `User with email ${req.body.email} does not exists`,
        success: true,
      });
    }
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    if (user) {
      const password = req.body.pass;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await user.save();
      res.send({
        data: null,
        message: `Your Password Updated Successfully`,
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: `User does not exists`,
        success: true,
      });
    }
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.send({
        data: users,
        message: `All Users fetched Successfully`,
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: `No Users to display`,
        success: true,
      });
    }
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  login,
  register,
  sendPasswordResetLink,
  resetPassword,
  verifyemail,
  getUserInfo,
  verifyEmailLink,
  updateUserName,
  updateProfile,
  updateProfile,
  updateUserEmail,
  updateUserPassword,
  getAllUsers,
};

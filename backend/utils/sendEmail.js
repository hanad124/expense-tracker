const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");

module.exports = async (user, mailType) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.PASS_KEY,
      },
    });
    const salt = await bcrypt.genSalt(10);
    const replaceAll = function (match, replace) {
      return replace(new RegExp(match, "g"), () => replace);
    };
    let encryptedTokenMain = await bcrypt.hash(user._id.toString(), salt);
    let encryptedToken = "";
    for (var i = 0; i < encryptedTokenMain.length; i++) {
      if (encryptedTokenMain[i] !== "/") {
        encryptedToken += encryptedTokenMain[i];
      } else {
        continue;
      }
    }
    const token = new Token({
      userid: user._id,
      token: encryptedToken,
    });
    await token.save();

    let emailContent, mailOptions;
    if (mailType == "verifyemail") {
      console.log(user);
      emailContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
          <p style="text-align: center;">Hi ${user.name},</p>
          <h1 style="text-align: center; color: #333;">Verify Your Email Address</h1>
            <p style="text-align: center; color: #333;">
              Please click on the button below to verify your email address.
            </p>
            <div style="text-align: center;">
              <a href="
                http://localhost:3000/verifyemail/${encryptedToken}
              " style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">
                Verify Email
              </a>
            </div>
          </div>
        </div>
      `;

      mailOptions = {
        from: process.env.SEND_EMAIL,
        to: user.email,
        subject: "Verify Email For Furqan Expense Tracker Auth",
        html: emailContent,
      };
    } else {
      emailContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
            <p style="text-align: center;">Hi ${user.name},</p>
            <h1 style="text-align: center; color: #333;">Reset Your Password</h1>
            <p style="text-align: center; color: #333;">
              Please click on the button below to reset your password.
            </p>
            <div style="text-align: center;">
            <a href="http://localhost:3000/resetpassword/${encryptedToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">
                Reset Password
              </a>
            </div>
          </div>
        </div>
      `;

      mailOptions = {
        from: process.env.SEND_EMAIL,
        to: user.email,
        subject: "Reset password For Furqan Expense Tracker Auth",
        html: emailContent,
      };
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

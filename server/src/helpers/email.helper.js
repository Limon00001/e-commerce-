// External Dependencies
const nodemailer = require("nodemailer");

// Internal Dependencies
const { smtpUser, smtpPassword } = require("../secret");

// Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

// Email Function
const sendEmail = async (emailData) => {
  try {
    const mailOptions = {
        from: smtpUser, // sender address
        to: emailData.email, // list of receivers
        subject: emailData.subject, // Subject line
        html: emailData.html, // html body
    }

    // await transporter.sendMail(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

// Module Export
module.exports = { sendEmail };
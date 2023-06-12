const adminModel = require("../services/admin");
const Agenda = require("agenda");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Create an instance of Agenda
const agenda = new Agenda({
  db: {
    address: "mongodb://localhost:27017/agendaDB", // MongoDB connection URL
    collection: "jobs", // Name of the collection to store jobs (optional, defaults to 'agendaJobs')
  },
});

const sendEmail = async (toEmail) => {
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "lourdes28@ethereal.email",
      pass: "4WYehk5AzSNNJvNYWJ",
    },
  });

  let info = await transporter.sendMail({
    from: '"Sam Foo 👻" <Samfoo@example.com>',
    to: toEmail,
    subject: "Registration Successful",
    text: "Congratulations! Your registration was successful.",
    html: "<b>Congratulations! Your registration was successful.</b>",
  });

  console.log("Message sent: %s", info.messageId);
};

// Define a job for sending registration emails
agenda.define("sendRegistrationEmail", async (job) => {
  const { email } = job.attrs.data;

  try {
    await sendEmail(email);
    console.log(`Registration email sent to ${email}`);
  } catch (error) {
    console.log(`Failed to send registration email to ${email}: ${error}`);
  }
});

// Start the agenda instance
agenda.start();

const adminRegistration = async (req, res) => {
  const { email, password, user_type } = req.body;
  const user = await adminModel.getAdminUser(email);

  if (user) {
    res.send({ status: "failed", message: "Email already exists" });
  } else {
    if (email && password && user_type) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await adminModel.postAdminUser(email, hashPassword, user_type);

        // Schedule the job to send registration email
        await agenda.schedule("now", "sendRegistrationEmail", { email });

        res.status(201).send({
          status: "success",
          message: "Registration Success",
        });
      } catch (error) {
        console.log(error);
        res.send({ status: "failed", message: "Unable to Register" });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  }
};

module.exports = {
  adminRegistration,
};

// const adminModel = require("../services/admin");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");

// const sendEmail = async (toEmail) => {
//   let transporter = await nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: {
//       user: "zack.hilll9@ethereal.email",
//       pass: "26Pdex7TxWP9RCy4MX",
//     },
//   });

//   let info = await transporter.sendMail({
//     from: '"Sam Foo 👻" <Samfoo@example.com>',
//     to: toEmail,
//     subject: "Registration Successful",
//     text: "Congratulations! Your registration was successful.",
//     html: "<b>Congratulations! Your registration was successful.</b>",
//   });

//   console.log("Message sent: %s", info.messageId);
// };

// const adminRegistration = async (req, res) => {
//   const { email, password, user_type } = req.body;
//   const user = await adminModel.getAdminUser(email);

//   if (user) {
//     res.send({ status: "failed", message: "Email already exists" });
//   } else {
//     if (email && password && user_type) {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);
//         await adminModel.postAdminUser(email, hashPassword, user_type);

//         // Send registration success email
//         await sendEmail(email);

//         res.status(201).send({
//           status: "success",
//           message: "Registration Success",
//         });
//       } catch (error) {
//         console.log(error);
//         res.send({ status: "failed", message: "Unable to Register" });
//       }
//     } else {
//       res.send({ status: "failed", message: "All fields are required" });
//     }
//   }
// };

// module.exports = {
//   adminRegistration,
// }

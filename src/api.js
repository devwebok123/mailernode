const express = require("express");
const colors = require("colors");
const cors = require("cors");
const nodemailer = require("nodemailer");
const serverless = require("serverless-http");

const app = express();

app.disable("etag");
app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const router = express.Router();

router.post("/sendmail", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wdev77204@gmail.com",
      pass: "ckqbqlxsjuakhvgg"
    }
  });

  var mailOptions = {
    from: req.body.data.email,
    to: req.body.data.toAddress,
    subject: req.body.data.subject,
    html: req.body.data.content
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(info);
    }
  });
});
router.get("/", (req, res) => res.send("Hello"));

app.use(router);
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

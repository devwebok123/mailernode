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

  const showIncubator = req.body.data.type == "Founder" ? "" : "none";

  var mailOptions = {
    from: req.body.data.email,
    to: "rare@bmverse.io",
    subject: "Collaborate",
    html: `<table>
      <tbody style={{ fontSize: '20px' }}>
        <tr>
          <th>Type</th>
          <td>${req.body.data.type}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>${req.body.data.name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${req.body.data.email}</td>
        </tr>
        <tr>
          <th>Conversance</th>
          <td>${req.body.data.conversance}</td>
        </tr>
        <tr>
          <th>Innated talent</th>
          <td>${req.body.data.talent}</td>
        </tr>
        <tr>
          <th>Demand type</th>
          <td>${req.body.data.demand}</td>
        </tr>
        <tr>
          <th>Linkedin</th>
          <td>${req.body.data.linked}</td>
        </tr>
        <tr>
          <th>Twitter</th>
          <td>${req.body.data.twitter}</td>
        </tr>
        <tr>
          <th>Github</th>
          <td>${req.body.data.github}</td>
        </tr>
        <tr>
          <th>Discord</th>
          <td>${req.body.data.discord}</td>
        </tr>
        <tr style="display:${showIncubator}">
          <th>Incubator / Accelerator</th>
          <td>${req.body.data.incubator}</td>
        </tr>
        <tr>
          <th>Fiction</th>
          <td>${req.body.data.fiction}</td>
        </tr>
      </tbody></table>`
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

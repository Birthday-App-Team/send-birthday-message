const express = require("express");
const serverless = require("serverless-http");
const bp = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const app = express();

app.use(bp.json());
app.use(cors());

app.post("/send", function(req, res) {
  const messageInfo = req.body;
  let textmessage =
    "Hey, " + messageInfo.recipient_name + "!" + messageInfo.message;
  client.messages
    .create({
      body: textmessage,
      to: messageInfo.recipient_phone_number, // Text this number
      from: "+441539234068" // From a valid Twilio number
    })
    .then(message => {
      console.log(message.body);
      res
        .status(200)
        .send("Successfully sent message to " + messageInfo.recipient_name);
    });
});

module.exports.send = serverless(app);

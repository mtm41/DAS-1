// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.SMS_ACCOUNT_SID;
const authToken = process.env.SMS_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports = function(phone, code) {
    client.messages
    .create({
        body: code,
        from: '+112513571371',
        to: '+34' + phone
    })
    .then(message => console.log(message));
};
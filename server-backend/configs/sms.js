// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC43d234e8f7de5bcb7773ff0e28461407';
const authToken = '71f1b04010e376eafa88dd3b93674100';
const client = require('twilio')(accountSid, authToken);


module.exports = function(phone, code) {
    console.log('ENTRA')
    client.messages
    .create({
        body: code,
        from: '+19389999811',
        to: '+34' + phone
    })
    .then(message => console.log(message.sid));
};
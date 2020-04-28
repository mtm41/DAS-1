// file: utils/mailer.js
var _ = require('lodash');	
var nodemailer = require('nodemailer');

var auth = {
        type: 'OAuth2',
        clientId: '864970354127-nf9h14j4jt1vi4215mddkff8ca0ugp84.apps.googleusercontent.com',
        clientSecret: '9-1YCPPtcAJQmeB3aFeHPdi1',
    };

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: auth,
});

var defaultMail = {
    from: 'Proyecto DAS <das.ethereum@gmail.com>',
    text: 'test text',
    auth: {
        user: 'das.ethereum@gmail.com',
        refreshToken: '1//04FOF69oudiIECgYIARAAGAQSNwF-L9Irsy_MG1x006wIPGvSRmME85xdyF_3gGmMNuajrAj-7uuX3bsIOP3Wf8w34U4IZ8C2SAw',
        accessToken: 'ya29.a0Ae4lvC1MajfS1ZRJAHz_HRpVXS9MZ5beug80uXe2jvfU2NlbP2eFKPnOBAYf4CnEi_v0g_iuuRzpbTXCjKXaoEHPTLUsdvYj3pU2pPT5OS1G3g7cI6vXg1HBYYrLEYVOWnzPG_3pDs36ujiikbyBzw3vkZeu3SQ97W0',
    }
};

module.exports = function(mail){
    // use default setting
    mail = _.merge({}, defaultMail, mail);
    
    // send email
    transporter.sendMail(mail, function(error, info){
        if(error){
            throw error;
        }
        console.log('mail sent:', info.response);
    });
};
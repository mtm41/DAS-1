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
        refreshToken: '1//04DlSEkdsG9NcCgYIARAAGAQSNwF-L9Irs4XZxRqVhpENQ188CMmkCIgWJU9DwcCc5Op0_oaBuJgI5WMNiywv4LzbuDSFjiqqSV4',
        accessToken: 'ya29.a0AfH6SMCA7xiU4c3XuUhSfxjQvZYy0AtiYICbADkmGxts30-2cikrkl62PxXH8rtZjFBL_Bu_iZH8jyURQjX0O7pWRxFqaR0lJPqyIxOvdfcH_KunNDLsEJnwQ_BF3m3vOIvbg7nFZB2TZRuLqwuoPBaphuIgvmE47aC1',
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
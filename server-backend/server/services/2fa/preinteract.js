'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../../configs/db');
const req = require('request')
const parse = require('node-html-parser');
const mongoose = require('mongoose');
const UserSchema = require('../../models/User');
const User = mongoose.model('User', UserSchema);


function getInteract(request, response) {
  try {
    var tokenSize = request.query.token.length;
    if (jwt.verify(request.query.token.substring(4,tokenSize), db.secret)){
        var randomHotBitsKey = process.env.HOTBITSKEY;
        req("https://www.fourmilab.ch/cgi-bin/Hotbits.api?nbytes=18&fmt=password&npass=1&lpass=6&pwtype=2&apikey=" + randomHotBitsKey,
        async (err, res, body) => {
            if (err) { return console.log(err); }
            var token = parse.parse(body).querySelector("textarea").rawText.replace(/\n/g, '')
            const sms = require('../../../configs/sms')
            const jwtDecode = require('jwt-decode');
            var decoded_jwt = jwtDecode(request.query.token) 

            const options = {
                user: process.env.DB_REGISTER_USER,
                pass: process.env.DB_REGISTER_PASS,
                useNewUrlParser: true,
                useCreateIndex: true,
                dbName: process.env.DB_DATABASE
            };
              
            mongoose.options = options
            await mongoose.connect(db.database, options, function(error) {
                User.findOne({
                    email: decoded_jwt.email
                  }, function(error, user) {
                    if (error) throw error;
                    if (!user) {
                        throw new Error('User not found')
                    }

                    var last2FAVerification = user.lastInteractionVerification;
                    var last2FACode = user.lastCode;
                    if (last2FAVerification && last2FACode){
                        if (last2FAVerification < Date.now()){
                            sms(phone, token) // send SMS
                            user.lastInteractionVerification = Date.now() + 1 * 3600 * 1000;
                            user.lastCode = token;
                            user.save(function (err, user) {
                                if (err) return next(err);

                                // activation success
                                response.json('Mensage was sent successfully. Code was updated.')
                            });
                        }
                        else
                            response.json({'state': 'Not expired', 'code': last2FACode})
                    } else {
                        var phone = decoded_jwt.Telephone;
                        console.log(phone)
                        console.log(token)
                        sms(phone, token)
                        user.lastInteractionVerification = Date.now() + 1 * 3600 * 1000;
                        user.lastCode = token;
                        user.save(function (err, user) {
                            if (err) return next(err);

                            // activation success
                            response.json('Mensage was sent successfully. Code was updated for first time.')
                        });
                    }
                  });
            });
        });
    } else
        response.json({'error': 'Token is not verfied.'})
  }
  catch(e) {
    console.log(e)
    response.json({'error': 'An error happened sending the sms to your phone.'})
  }

}

module.exports = {
  getInteract: getInteract
}
'use strict';

const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const db = require('../../../configs/db');
const mongoose = require('mongoose');
const UserSchema = require('../../models/User');
const User = mongoose.model('User', UserSchema);

async function getInteract(request, response) {
  var tokenSize = request.body.token.length;
  if (jwt.verify(request.body.token.substring(4,tokenSize), db.secret)){
    console.log('VERIFICADO')
    var smsCode = sanitize(request.body.sms)
    const options = {
      user: process.env.DB_REGISTER_USER,
      pass: process.env.DB_REGISTER_PASS,
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: process.env.DB_DATABASE
  };
    
  mongoose.options = options
  await mongoose.connect(db.database, options, function(error) {
    const jwtDecode = require('jwt-decode');
    var decoded_jwt = jwtDecode(request.body.token)
    User.findOne({
      email: decoded_jwt.email,
      lastCode: smsCode
    }, async function(error, user) {
      if (error) throw error;
      if (!user) {
          response.json({'error': 'Código inválido'});
      }
      const contractInteraction = require('../../../configs/interact')
      await contractInteraction(user.DID, '0xFb7817BA55116021675C43595D942741CCe6E401').then(function (resp, error) {
        console.log(resp)
        response.json('Smart contract request has been sent!');
      })
    });
  });
}
}

module.exports = {
  getInteract: getInteract
}
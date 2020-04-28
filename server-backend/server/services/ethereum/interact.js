'use strict';

const sanitize = require('mongo-sanitize');
const xss = require("xss");
const jwt = require('jsonwebtoken');
const db = require('../../../configs/db');
const mongoose = require('mongoose');
const UserSchema = require('../../models/User');
const User = mongoose.model('User', UserSchema);

async function getInteract(request, response) {
  console.log('Interact')
  console.log(request.body)
  var tokenSize = request.body.token.length;
  console.log(tokenSize)
  if (jwt.verify(request.body.token.substring(4,tokenSize), db.secret)){
    console.log('VERIFICADO')
    var smsCode = sanitize(request.body.smscode)
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
      await contractInteraction('0x19ef977b7530d5a8a61c364fb9e7af23f42cdd9e', '0x4Acd02F8346dF5400BaA3c712b1239733dE36a67').then(function (resp, error) {
        console.log(resp)
        console.log(error)
        console.log('Ha funcionado')
        console.log(request.body)
        response.json('Smart contract request has been sent!');
      })
    });
  });
}
}

module.exports = {
  getInteract: getInteract
}
'use strict';
const mongoose = require('mongoose');
const express = require('express');
const UserSchema = require('../../models/User');
const User = mongoose.model('User', UserSchema);
const req = require('request')
const parse = require('node-html-parser');


const httpResponses = {
  onValidationError: {
    success: false,
    message: 'Please enter email and password.'
  },
  onUserSaveError: {
    success: false,
    message: 'That account already exists.'
  },
  onUserSaveSuccess: {
    success: true,
    message: 'Successfully created new user. Please, verify your email before login in.'
  }
}

// Register new users
function registerUser(request, response) {
  const dotenv = require('dotenv').config()
  const db = require('../../../configs/db');
  const sanitize = require('mongo-sanitize');
  const xss = require("xss");

  const options = {
    user: process.env.DB_REGISTER_USER,
    pass: process.env.DB_REGISTER_PASS,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: process.env.DB_DATABASE
  };
  mongoose.options = options
  mongoose.connect(db.database, options, function(error) {
    
    // Check error in initial connection. There is no 2nd param to the callback.
    console.log('Se va a intentar registrar un usuario')
    var email = xss(sanitize(request.body.email))
    var username = xss(sanitize(request.body.username))
    var phone = xss(sanitize(request.body.phone))
    var password = xss(sanitize(request.body.password))
  
    console.log(mongoose.connection)
    if (!email || !password) {
      response.json(httpResponses.onValidationError);
    } else {
      var randomHotBitsKey = 'HB1hSRsDEF8TWdksq9Ihz3w8mGF'
      req("https://www.fourmilab.ch/cgi-bin/Hotbits.api?nbytes=18&fmt=password&npass=1&lpass=18&pwtype=2&apikey=" + randomHotBitsKey + "&pseudo=pseudo",
      (err, res, body) => {
        if (err) { return console.log(err); }
        var token = parse.parse(body).querySelector("textarea").rawText.replace(/\n/g, '')

        let newUser = new User({
          email: email,
          username: username,
          DID: 'as7sasasaas', //generate DID
          Ether: 0.0,
          Telephone: phone,
          password: password,
          activeToken: token,
          activeExpires: Date.now() + 1 * 3600 * 1000
        });
    
        const createIdentity = require('../../../configs/web3')
        createIdentity(newUser, response, mongoose, httpResponses).then(function (resp) {
          console.log(resp)
          console.log('Ha funcionado')
        })
      });     
    }
  });

  
}

module.exports = {
  registerUser: registerUser
};

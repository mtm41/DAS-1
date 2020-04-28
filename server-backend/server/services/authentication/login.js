'use strict';

const express = require('express');
const apiRoutes = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('../../../configs/db');

const UserSchema = require('../../models/User');
const User = mongoose.model('User', UserSchema);

const httpResponse = {
  onAuthenticationFail: {
    success: false,
    message: 'Los valores introducidos son erróneos.'
  }
}

function loginUser(request, response) { 
  const db = require('../../../configs/db');
  const sanitize = require('mongo-sanitize');
  const xss = require("xss");
  const options = {
    user: process.env.DB_LOGIN_USER,
    pass: process.env.DB_LOGIN_PASS,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: process.env.DB_DATABASE
  };
  
  mongoose.options = options
  mongoose.connect(db.database, options, function(error) {
    console.log('Se va a intentar iniciar sesion')
    let email = xss(sanitize(request.body.email))
    let password = xss(sanitize(request.body.password))
    console.log(password)
    User.findOne({
      email: email
    }, function(error, user) {
      if (error) throw error;

      if (!user) {
        return response.send(httpResponse.onAuthenticationFail);
      }
      console.log('No se ha lanzado error, a ver si la pass coincide')
      console.log(user)
      // Check if password matches
      user.comparePassword(password, function(error, isMatch) {
        if (isMatch && !error) {
          var token = jwt.sign(user.toJSON(), db.secret, {
            expiresIn: "15m"
          });
          console.log(token)
          return response.json({ success: true, token: 'JWT ' + token });
        }
  
        response.send(httpResponse.onAuthenticationFail);
      });
    });
  });
  
};

module.exports = {
  loginUser: loginUser
};

'use strict';

const db = require('../../../configs/db');
const mongoose = require('mongoose');
const UserSchema = require('../../models/User');
const User = mongoose.model('User', UserSchema);
const jwtDecode = require('jwt-decode');


async function getInteract(request, response) {
    console.log(request.headers.authorization);
    var token = request.headers.authorization;
    try {
        var decoded_jwt = jwtDecode(token) 
        const options = {
            user: process.env.DB_LOGIN_USER,
            pass: process.env.DB_LOGIN_PASS,
            useNewUrlParser: true,
            useCreateIndex: true,
            dbName: process.env.DB_DATABASE
        };
        
        mongoose.options = options
        await mongoose.connect(db.database, options, function(error) {
            User.findOne({
                email: decoded_jwt.email
            }, async function(error, user) {
                if (!user) {
                    response.json({'error': 'Código inválido'});
                }
                response.json({'Organizations': user.Organizations})
            })
        })
    } catch (ex) {
        console.log(ex)
        response.json({'error': 'Ha ocurrido un error'});
    }
    
}

module.exports = {
  getInteract: getInteract
}
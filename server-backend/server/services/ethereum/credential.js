'use strict';

const db = require('../../../configs/db');
const mongoose = require('mongoose');
const UserSchema = require('../../models/User');
const User = mongoose.model('User', UserSchema);
const jwtDecode = require('jwt-decode');

async function getInteract(request, response) {
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
                if (!user)
                    response.json({'error': 'Usuario inválido'});
                
                const sendCredential = require('../../../configs/sendCredential')                   
                    User.findOne({
                        username: request.body.username
                    }, async function(error, userDest) {
                        await sendCredential(user.Organizations[0].DID, userDest.DID, user.Organizations[0].credential[0], user.email).then(function (resp, error) {
                            console.log('Credential sent')
                            response.json({'Message': resp})
                        })
                    })
                     
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
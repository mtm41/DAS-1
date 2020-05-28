'use strict';
const mongoose = require('mongoose');
const UserSchema = require('../../models/User')
const db = require('../../../configs/db');


function getActivation(req, res) {
    const options = {
        user: process.env.DB_REGISTER_USER,
        pass: process.env.DB_REGISTER_PASS,
        useNewUrlParser: true,
        useCreateIndex: true,
        dbName: process.env.DB_DATABASE
      };
      mongoose.options = options
      mongoose.connect(db.database, options, function(error) {
    var User = mongoose.model('User', UserSchema);
            // find the corresponding user
            User.findOne({
                activeToken: req.params.activeToken,

                // check if the expire time > the current time
                activeExpires: {$gt: Date.now()}
            }, function (err, user) {
                if (err) return next(err);
                
                // invalid activation code
                if (!user) {
                    return res.json({
                        title: 'fail to activate',
                        content: 'Your activation link is invalid, please <a href="/account/signup">register</a> again'
                    });
                }

                // activate and save
                user.active = true;
                user.save(function (err, user) {
                    if (err) return next(err);

                    // activation success
                    res.json({
                        title: 'activation success!',
                        content: user.username + 'Please <a href="/account/login">login</a>'
                    })
                });
            });
        });
}

module.exports = {
  getActivation: getActivation
}
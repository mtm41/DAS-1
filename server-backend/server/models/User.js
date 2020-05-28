const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const Credential = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true
  },
  emitDate: {
    type: Date
  },
  expiredDate: {
    type: Date
  },
  digitalSign: {
    type: String,
    unique: true
  }
})

const Organization = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true
  },
  cif: {
    type: String,
    unique: true,
    index: true
  },
  DID: {
    type: String,
    unique: true
  },
  credential: [Credential]
})

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true
  },
  username: {
    type: String,
    unique: true,
    index: true
  },
  DID: {
    type: String,
    unique: true,
    index: true
  },
  Ether: {
    type: SchemaTypes.Number,
    required: true
  },
  Telephone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  activeToken: {
    type: String,
    required: true
  },
  activeExpires: {
    type: Date,
    required: true
  },
  lastInteractionVerification: {
    type: Date,
    required: false
  },
  lastCode: {
    type: String,
    required: false
  },
  Organizations: [Organization]
});

UserSchema.pre('save', function(next) {
  let user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => { // 10 is the default work factor to obtain a valid salt
      if (err) {
        console.log(err);
        return next(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

//module.exports = mongoose.model('User', UserSchema);
module.exports = UserSchema

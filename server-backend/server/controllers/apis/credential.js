'use strict';

const passport = require('passport');
const express = require('express');
const credentialService = require('../../services/ethereum/credential');

let router = express.Router();

router.post('/',passport.authenticate('jwt', { session: false }), credentialService.getInteract);

module.exports = router;

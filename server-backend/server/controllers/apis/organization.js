'use strict';

const passport = require('passport');
const express = require('express');
const organizationService = require('../../services/organization/organization');

let router = express.Router();

router.get('/',passport.authenticate('jwt', { session: false }), organizationService.getInteract);

module.exports = router;

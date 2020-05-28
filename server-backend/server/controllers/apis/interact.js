'use strict';

const passport = require('passport');
const express = require('express');
const interactService = require('../../services/ethereum/interact');

let router = express.Router();

router.post('/',passport.authenticate('jwt', { session: false }), interactService.getInteract);

module.exports = router;

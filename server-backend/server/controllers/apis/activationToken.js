'use strict';

const passport = require('passport');
const express = require('express');
const activationTokenService = require('../../services/activation/activation');

let router = express.Router();

router.get('/:activeToken', activationTokenService.getActivation);

module.exports = router;

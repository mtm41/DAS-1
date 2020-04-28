'use strict';

const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/login');
const dashboardController = require('../../controllers/apis/dashboard');
const preinteractController = require('../../controllers/apis/preinteract');
const interactController = require('../../controllers/apis/interact');
const activationTokenController = require('../../controllers/apis/activationToken');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/dashboard', dashboardController);
router.use('/preinteract', preinteractController);
router.use('/interact', interactController);
router.use('/active', activationTokenController);

module.exports = router;
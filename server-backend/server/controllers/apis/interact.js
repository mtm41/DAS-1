'use strict';

const passport = require('passport');
const express = require('express');
const interactService = require('../../services/ethereum/interact');

let router = express.Router();

router.post('/',interactService.getInteract);

module.exports = router;

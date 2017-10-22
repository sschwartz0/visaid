const express = require('express');
const userService = require('../../services/userService');

const fs = require('fs');
const {join}= require('path');
const router = express.Router();
const RequestService = require("./../../services/requestService")

router.get('/users/:id', userService.getUser);

router.post('/requests', RequestService.createSession);

module.exports = router;

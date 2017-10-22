const express = require('express');

const UserService = require('../../services/userService');
const SubmitService = require('../../services/submitService');
const RequestService = require('./../../services/requestService');

const router = express.Router();

router.get('/users/:id', UserService.getUser);

router.post('/users/card', UserService.getUserDetail);

router.get('/requests/:safetyCode', RequestService.getSession);

router.post('/requests', RequestService.createSession);

router.post('/submit', SubmitService.submitResponse);

router.get('/requests/status/:safetyCode',RequestService.checkStatus);

module.exports = router;

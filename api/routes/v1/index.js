const express = require('express');
const UserService = require('../../services/userService');
const SubmitService = require('../../services/submitService');
const RequestService = require('./../../services/requestService');

const router = express.Router();

router.get('/users/:id', UserService.getUser);

router.get('/requests', RequestService.getRequest);

router.post('/requests', RequestService.createRequest);

router.post('/users/card', UserService.getCardId);

router.get('/requests/:safetyCode', RequestService.getSession);

router.post('/submit', SubmitService.submitResponse);


module.exports = router;

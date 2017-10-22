const express = require('express'),
      userService = require('../../services/userService'),
      SubmitService = require('../../services/submitService'),
      RequestService = require("./../../services/requestService"),
      fs = require('fs'),
      {join}= require('path'),
      router = express.Router();

router.get('/users/:id', userService.getUser);

router.post('/requests', RequestService.createSession);

router.get('/requests/:safetyCode', RequestService.getSession);

router.post('/submit', SubmitService.submitResponse);


module.exports = router;

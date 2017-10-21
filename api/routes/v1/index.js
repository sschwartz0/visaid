const express = require('express');
const userService = require('../../services/userService');

const router = express.Router();

router.get('/users/:id', userService.getUser);

module.exports = router;

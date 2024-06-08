const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers');
// /api/v1/users POST
router.post('/', UserController.signUp);

module.exports = router;
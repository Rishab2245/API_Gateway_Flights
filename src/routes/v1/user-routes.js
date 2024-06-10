const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers');
// /api/v1/users POST
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

module.exports = router;
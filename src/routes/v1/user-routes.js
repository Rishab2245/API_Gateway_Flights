const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers');
const {AuthRequestMiddlewares} = require('../../middlewares');
// /api/v1/users POST
router.post('/signup', AuthRequestMiddlewares.validateAuthRequest,UserController.signUp);
router.post('/signin', AuthRequestMiddlewares.validateAuthRequest,UserController.signIn);

module.exports = router;
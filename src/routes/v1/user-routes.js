const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers');
const {AuthRequestMiddlewares} = require('../../middlewares');
// /api/v1/users POST
router.post('/signup', AuthRequestMiddlewares.validateAuthRequest,UserController.signUp);
router.post('/signin', AuthRequestMiddlewares.validateAuthRequest,UserController.signIn);
router.post('/role', AuthRequestMiddlewares.checkAuth,AuthRequestMiddlewares.isAdmin,UserController.addRoleToUser);


module.exports = router;
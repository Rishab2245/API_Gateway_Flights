const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();

const userRoutes = require('./user-routes')

const { AuthRequestMiddlewares } = require('../../middlewares');

router.get('/info', AuthRequestMiddlewares.checkAuth, InfoController.info);

router.use('/user' , userRoutes)

module.exports = router;
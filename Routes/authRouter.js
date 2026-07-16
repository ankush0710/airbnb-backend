const express = require("express");
const authRouter = express.Router();

//import controller for auth
const authController = require('../controllers/authController');

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);
authRouter.post('/logout', authController.postLogout);
module.exports = authRouter;
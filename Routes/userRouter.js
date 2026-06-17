//core modules
const path = require("path");

//external modules
const express = require("express");
const userRouter = express.Router();

//Loacal modules
const {homesData} = require("../Routes/hostRouter");

// common middleware for all routes
userRouter.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//middleware for home page
userRouter.get("/", (req, res, next) => {
  console.log(homesData);
  res.render('home', {homesData: homesData, currentPage: 'home'});
});

module.exports = userRouter;
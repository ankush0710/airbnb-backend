//external modules
const express = require("express");
const userRouter = express.Router();

//Loacal modules
const {homesData} = require("../Routes/hostRouter");
const homeController = require("../controllers/home")

// common middleware for all routes
userRouter.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//middleware for home page
userRouter.get("/", homeController.getHome);

module.exports = userRouter;
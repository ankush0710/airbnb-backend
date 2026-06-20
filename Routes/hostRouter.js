//External Modules
const express = require("express");
const hostRouter = express.Router();

//Loacal Modules
const homeController = require("../controllers/home");

// import controller for get add home 
hostRouter.get("/add-home", homeController.getAddHome);

// import controller for post add home 
hostRouter.post("/add-home", homeController.postAddHome);


exports.hostRouter = hostRouter;



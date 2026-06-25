//External Modules
const express = require("express");
const hostRouter = express.Router();

//Loacal Modules
const hostController = require("../controllers/hostController");

// import controller for get add home 
hostRouter.get("/add-home", hostController.getAddHome);

// import controller for post add home 
hostRouter.post("/add-home", hostController.postAddHome);


module.exports = hostRouter;



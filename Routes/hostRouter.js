//External Modules
const express = require("express");
const hostRouter = express.Router();

//Loacal Modules
const hostController = require("../controllers/hostController");

// import controller for get add home 
hostRouter.get("/add-home", hostController.getAddHome);

// import controller for post add home 
hostRouter.post("/add-home", hostController.postAddHome);

//import controller for host home list
hostRouter.get("/host-home-list", hostController.getHomeList);

//import controller for edit home based on id
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);
module.exports = hostRouter;



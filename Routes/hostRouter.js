//core modules
const path = require('path');

//External Modules
const express = require("express");
const hostRouter = express.Router();

//Loacal Modules
const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
});

// to captire the home name
const homesData = [];
hostRouter.post("/add-home", (req, res, next) => {
  console.log('Home Added as home:', req.body.homeName);
  homesData.push({homeName: req.body.homeName});
  // console.log(homesData);
  res.sendFile(path.join(rootDir, 'views', 'homeAddedMessage.html'));
});

exports.hostRouter = hostRouter;
exports.homesData = homesData;



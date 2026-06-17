//core modules
const path = require('path');

//External Modules
const express = require("express");
const hostRouter = express.Router();

//Loacal Modules
const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome', {currentPage: 'addHome'});
});

// to capture the entire data form body
const homesData = [];
hostRouter.post("/add-home", (req, res, next) => {

  // homesData.push({
  //   homeName: req.body.homeName,
  //   price: req.body.price,
  //   location: req.body.location,
  //   rating: req.body.ratings
  // });
  homesData.push(req.body)
  console.log(homesData);
  res.sendFile(path.join(rootDir, 'views', 'homeAddedMessage.html'));
});

exports.hostRouter = hostRouter;
exports.homesData = homesData;



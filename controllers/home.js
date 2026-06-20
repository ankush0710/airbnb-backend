//import local module -> path
const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");

//===================================================//
// controller for handling get requests for add homes data 
exports.getAddHome = (req, res, next) => {
    console.log("getAddHome controller is called...")
  res.render("addHome", { currentPage: "addHome" });
};

//===================================================//
//controller for handling post homes requests
exports.postAddHome = (req, res, next) => {

  const {houseName, price, location, rating, photoUrl} = req.body;

  // homesData.push({
  //   homeName: req.body.homeName,
  //   price: req.body.price,
  //   location: req.body.location,
  //   rating: req.body.ratings
  // });
  const home = new Home(req.body.houseName, req.body.price, req.body.location, req.body.rating, req.body.photoUrl);
  home.save();
  res.sendFile(path.join(rootDir, 'views', 'homeAddedMessage.html'));
}

//===============================================================//
exports.getHome = (req, res, next) => {
  const homesData = Home.fetchAll();
  res.render('home', {homesData: homesData, currentPage: 'home'});
}
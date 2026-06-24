//import local module -> path
const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");

//===================================================//
//  controller for handling get requests for add homes data 
exports.getAddHome = (req, res, next) => {
    console.log("getAddHome controller is called...");
  res.render("hostViews/add-home/addHome", { currentPage: "addHome" });
};

//===================================================//
//controller for handling post homes requests
exports.postAddHome = (req, res, next) => {

  // Accept new `name` field, but keep backwards compatibility if `homeName` is present
  const { name, price, location, ratings, imageUrl, homeName } = req.body;

  const title = name || homeName; // prefer `name` when available
  const home = new Home(title, price, location, ratings, imageUrl);
  home.save();
  res.render("hostViews/home-added/homeAddedMessage", {currentPage: "homeAddedMessage"});
}

//===============================================================//
exports.getHome = (req, res, next) => {
  Home.fetchAll(homesData => {
    res.render("storeViews/home-list/home-list", { homesData: homesData, currentPage: 'Home' });
  });
};
//import local module -> path
const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");

//===================================================//
//  controller for handling get requests for add homes data
exports.getAddHome = (req, res, next) => {
  console.log("GET /add-home controller called");
  res.render("hostViews/edit-home/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
  });
};

//===================================================//
//  controller for handling get requests for add homes data
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(home => {
    if (!home) {
      res.redirect("host/host-home-list");
    }
    res.render("hostViews/edit-home/edit-home", {
      pageTitle: "Edit Your Home",
      currentPage: "host-homes",
      editing: editing,
      home: home,
      isLoggedIn: req.isLoggedIn,
    });
  });
};

//===================================================//
//controller for handling post homes requests
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, ratings, imageURL, description } = req.body;
  const home = new Home({ houseName, price, location, ratings, imageURL, description });
  home.save().then(() => {
    console.log("home saved successfully...");
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, ratings, imageURL, homeName } = req.body;
  Home.findById(id).then((home) => {
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.ratings = ratings;
    home.imageURL = imageURL;
    home.save().then(result => {
    console.log('Home Updated: ', result);
  });
  res.redirect("/host/host-home-list");
  }).catch((err) => {
    console.log("Error while finding home", err);
  })
};

exports.getHomeList = (req, res, next) => {
  Home.find().then(homesData => {
    res.render("hostViews/host-home-list/host-home-list", {
      homesData: homesData,
      currentPage: "host-home-list",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

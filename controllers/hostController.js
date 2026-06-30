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
  });
};

//===================================================//
//  controller for handling get requests for add homes data
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing");
      res.redirect("host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("hostViews/edit-home/edit-home", {
      pageTitle: "Edit Your Home",
      currentPage: "host-homes",
      editing: editing,
      home: home,
    });
  });
};

//===================================================//
//controller for handling post homes requests
exports.postAddHome = (req, res, next) => {
  console.log("POST /added-home controller called");
  console.log("body-data:", req.body);
  const { name, price, location, ratings, imageUrl, homeName } = req.body;
  const home = new Home(name, price, location, ratings, imageUrl);
  console.log("home-data: ", home);
  home.save();
  res.render("hostViews/home-added/homeAddedMessage", {
    currentPage: "homeAddedMessage",
  });
};

exports.getHomeList = (req, res, next) => {
  Home.fetchAll((homesData) => {
    res.render("hostViews/host-home-list/host-home-list", {
      homesData: homesData,
      currentPage: "host-home-list",
    });
  });
};

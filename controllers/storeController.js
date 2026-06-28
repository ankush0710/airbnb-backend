//import local module -> path
const path = require("path");
const Home = require("../models/home");
const { homedir } = require("os");

//===============================================================//
// controller for home route
exports.getHomes = (req, res, next) => {
  Home.fetchAll((homesData) => {
    res.render("storeViews/home-list/home-list", {
      homesData: homesData,
      currentPage: "Home",
    });
  });
};

//=================================================================//
// controller for bookings routes
exports.getBookings = (req, res, next) => {
  res.render("storeViews/booking/bookings", { currentPage: "bookings" });
};

//================================================================//
// controller for reserve route
exports.getReserve = (req, res, next) => {
  res.render("storeViews/reserve/reserve", { currentPage: "reserve" });
};

//=================================================================//
// controller for favourites route
exports.getFavouites = (req, res, next) => {
  Home.fetchAll((homesData) => {
    res.render("storeViews/favourite-list/favourite-list", {
      homesData: homesData,
      currentPage: "favourite-list",
    });
  });
};

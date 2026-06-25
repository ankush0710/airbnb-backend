//import local module -> path
const path = require("path");
const Home = require("../models/home");

//===============================================================//
exports.getHomes = (req, res, next) => {
  Home.fetchAll((homesData) => {
    res.render("storeViews/home-list/home-list", {
      homesData: homesData,
      currentPage: "Home",
    });
  });
};

//================================================================//
// controller for booking routes

exports.getBookings = (req, res, next) => {
  Home.fetchAll((homesData) => {
    res.render("storeViews/booking/bookings", {
      homesData: homesData,
      currentPage: "bookings",
    });
  });
};
// Backwards-compatible alias: some parts of the app reference `getBooking`
exports.getBooking = exports.getBookings;
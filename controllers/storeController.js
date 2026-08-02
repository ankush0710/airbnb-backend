//import local module -> path
const path = require("path");
const mongoose = require("mongoose");
const Home = require("../models/home");
const User = require("../models/users");

//===============================================================//
// controller for home route
exports.getHomes = (req, res, next) => {
  Home.find().then((homesData) => {
    res.render("storeViews/home-list/home-list", {
      homesData: homesData,
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

//=================================================================//
// controller for bookings routes
exports.getBookings = (req, res, next) => {
  res.render("storeViews/booking/bookings", {
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

//================================================================//
// controller for reserve route
exports.getReserve = (req, res, next) => {
  res.render("storeViews/reserve/reserve", {
    currentPage: "reserve",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

//=================================================================//
// controller for favourites route
exports.getFavouitesList = async (req, res, next) => {
  const userId = req.session.user?._id;

  if (!userId) {
    return res.redirect("/login");
  }

  const user = await User.findById(userId).populate("favourite");
  res.render("storeViews/favourite-list/favourite-list", {
    favouriteHomes: user.favourite,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

//===============================================================//
// controller for home Favourites route
exports.postAddToFavourite = async (req, res, next) => {
  const houseId = req.body.homeId || req.body.id || req.body.houseId;
  const userId = req.session.user?._id;

  if (!houseId || !userId) {
    return res.redirect("/login");
  }

  const user = await User.findById(userId);
  const normalizedHouseId = houseId.toString();
  const alreadyFavorite = user.favourite.some((favId) => favId.toString() === normalizedHouseId);

  if (!alreadyFavorite) {
    user.favourite.push(new mongoose.Types.ObjectId(normalizedHouseId));
    await user.save();
  }

  res.redirect("/favourites");
};

//===============================================================//
// controller for home Details route
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((homes) => {
    console.log(homeId);
    if (!homes) {
      res.redirect("/");
    } else {
      const homeName = homes.name || homes.homeName || "Lovely Home";
      const description =
        homes.description ||
        `Enjoy a comfortable stay at ${homeName} in ${homes.location || "a beautiful destination"}. This home offers a warm atmosphere, great amenities, and a welcoming setting for your next getaway.`;

      res.render("storeViews/home-details/home-details", {
        homes: homes,
        homeName: homeName,
        description: description,
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

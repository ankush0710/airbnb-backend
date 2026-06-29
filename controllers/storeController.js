//import local module -> path
const path = require("path");
const Home = require("../models/home");
const { homedir } = require("os");
const Favourite = require("../models/favourite");

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
exports.getFavouitesList = (req, res, next) => {
 Favourite.getFavourites(favourite => {
   Home.fetchAll((homesData) => {
    const favouriteHomes = homesData.filter(home => favourite.includes(home.id));
    res.render("storeViews/favourite-list/favourite-list", {
      favouriteHomes: favouriteHomes,
      currentPage: "favourites",
    });
  });
 })
};

//===============================================================//
// controller for home Favourites route
exports.postAddToFavourite = (req, res, next) => {
  console.log("came to add to favourite", req.body);
  Favourite.addToFavourite(req.body.id, err => {
    if(err) {
    console.log("error while remarking", err);
    }
     res.redirect("/favourites");

  })
};


//===============================================================//
// controller for home Details route
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (homes) => {
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
      });
    }
  });
};
//import local module -> path
const path = require("path");
const Home = require("../models/home");
const { homedir } = require("os");
const Favourite = require("../models/favourite");

//===============================================================//
// controller for home route
exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((homesData) => {
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
  Favourite.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId);
    Home.fetchAll().then((homesData) => {
      console.log(favourites, homesData);
      const favouriteHomes = homesData.filter((home) =>
        favourites.includes(home._id.toString()),
      );
      res.render("storeViews/favourite-list/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",

      })
    });
  });
};

//===============================================================//
// controller for home Favourites route
exports.postAddToFavourite = (req, res, next) => {
  const houseId = req.body.id;
  const fav = new Favourite(houseId);
  fav
    .save()
    .then(result => {
      console.log("added to favourite: ", result);
    })
    .catch(err => {
      console.log("Error while adding to the favourite: ", err);
    })
    .finally(() => res.redirect("/favourites"));
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
      });
    }
  });
};

//import local module -> path
const path = require("path");
const Home = require("../models/home");
const { homedir } = require("os");
const Favourite = require("../models/favourite");

//===============================================================//
// controller for home route
exports.getHomes = (req, res, next) => {
  Home.find().then((homesData) => {
    res.render("storeViews/home-list/home-list", {
      homesData: homesData,
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

//=================================================================//
// controller for bookings routes
exports.getBookings = (req, res, next) => {
  res.render("storeViews/booking/bookings", { 
    currentPage: "bookings", 
    isLoggedIn: req.isLoggedIn,});
};

//================================================================//
// controller for reserve route
exports.getReserve = (req, res, next) => {
  res.render("storeViews/reserve/reserve", { 
    currentPage: "reserve",
    isLoggedIn: req.isLoggedIn, 
  });
};

//=================================================================//
// controller for favourites route
exports.getFavouitesList = (req, res, next) => {
  Favourite.find().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId.toString());
    Home.find().then((homesData) => {
      console.log(favourites, homesData);
      const favouriteHomes = homesData.filter((home) =>
        favourites.includes(home._id.toString()),
      );
      res.render("storeViews/favourite-list/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn,
      })
    });
  });
};

//===============================================================//
// controller for home Favourites route
exports.postAddToFavourite = (req, res, next) => {
  const houseId = req.body.id;
  Favourite.findOne({houseId: houseId}).then((fav) => {
    if(fav){
      console.log("Already marked as favourites");
    }
    else{
      const fav = new Favourite({houseId: houseId});
      fav.save().then((result) => {
        console.log("Home added to favourites");
      })
    }
    res.redirect("/favourites");
  }).catch((err) =>{
    console.log("Error While Add to favourites", err);
  });
}


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
      });
    }
  });
}

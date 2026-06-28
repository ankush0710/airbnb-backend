//external modules
const express = require("express");
const storeRouter = express.Router();

//Loacal modules
const storeController = require("../controllers/storeController")

// common middleware for all routes
storeRouter.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//middleware for home page
storeRouter.get("/", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/reserve", storeController.getReserve);
storeRouter.get("/favourite-list", storeController.getFavouites);
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

// middleware for reserve routes
module.exports = storeRouter;
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
module.exports = storeRouter;
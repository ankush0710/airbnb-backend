//External module
const express = require("express");
const app = express();
const path = require("path");

//Local Modules
const storeRouter = require("./Routes/storeRouter");
const hostRouter = require("./Routes/hostRouter");
const errorController = require("./controllers/errors");
const {default:mongoose} = require('mongoose');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//To add the req into the req.body
//It reads the data and makes it available as a JavaScript object on req.body
// Parse URL-encoded bodies (as sent by HTML forms)

// Request logging middleware
app.use((req, res, next) => {
  // console.log(`📍 ${req.method} ${req.path}`);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(storeRouter);
app.use("/host", hostRouter);

//404 error page
app.use(errorController.pageNotFound);

const PORT = 3001;
const db_path = "mongodb+srv://ankushkurvey053:aNkush123@airbnb-database.az5xv5b.mongodb.net/"
mongoose.connect(db_path).then(() => {
  console.log("Connect to MongoDB and Mongoose");
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log("Error while connecting to Mongoose", err);
});
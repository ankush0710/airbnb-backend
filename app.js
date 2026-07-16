//External module
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

//Local Modules
const storeRouter = require("./Routes/storeRouter");
const hostRouter = require("./Routes/hostRouter");
const errorController = require("./controllers/errors");
const {default:mongoose} = require('mongoose');
const authRouter = require("./Routes/authRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//To add the req into the req.body
//It reads the data and makes it available as a JavaScript object on req.body
// Parse URL-encoded bodies (as sent by HTML forms)


app.use(express.urlencoded({ extended: true }));

const PORT = 3001;
const db_path = "mongodb+srv://ankushkurvey053:aNkush123@airbnb-database.az5xv5b.mongodb.net/"
const store = new mongoDBStore({
  uri: db_path,
  collection: 'sessions',
}) 

//creating the session middleware by using express-session package
app.use(session({
  secret: "my session secretes key",
  resave: false,
  saveUninitialized: true,
  store: store,
}))

//creating cookies for secure login and logout
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  // console.log("cookie check middleware: ", req.get('Cookie'));
  next();
})
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect("/login");
  }
});

//404 error page
app.use(errorController.pageNotFound);

mongoose.connect(db_path).then(() => {
  console.log("Connect to MongoDB and Mongoose");
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log("Error while connecting to Mongoose", err);
});
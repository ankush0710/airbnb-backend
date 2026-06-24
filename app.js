
//External module
const express = require("express");
const app = express();
const path = require('path');

//Local Modules
const userRouter = require("./Routes/userRouter");
const hostRouter = require("./Routes/hostRouter");
const errorController = require("./controllers/errors");

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
//To add the req into the req.body
//It reads the data and makes it available as a JavaScript object on req.body
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use('/host', hostRouter);

//404 error page
app.use(errorController.pageNotFound);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})

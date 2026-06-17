//core modules
const path = require("path");

//External module
const express = require("express");
const app = express();

//Local Modules
const userRouter = require("./Routes/userRouter");
const {hostRouter} = require("./Routes/hostRouter");
const rootDir = require("./utils/pathUtils");

app.set('view engine', 'ejs');
//To add the req into the req.body
//It reads the data and makes it available as a JavaScript object on req.body
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

//404 error page
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

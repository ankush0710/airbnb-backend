//core modules
const path = require("path");
const rootDir = require("./utils/pathUtils");

//=======================================================//
// controller for handling get requests for error messages
exports.pageNotFound = (req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
}
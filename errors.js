//core modules
const path = require("path");
const rootDir = require("./utils/pathUtils");

//=======================================================//
// controller for handling get requests for error messages
exports.pageNotFound = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        isLoggedIn: req.isLoggedIn,
    });
}
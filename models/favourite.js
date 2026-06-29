const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");

const favouriteDataPath = path.join(rootDir, "data", "fav.json");
module.exports = class Favourite {
  //============ static function for add to favourite ==============//
  static addToFavourite(id, callback) {
    Favourite.getFavourites((favourite) => {
      if (favourite.includes(id)) {
        callback("Home is already added o favrouite");
      } else {
        favourite.push(id);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourite), callback);
      }
    });
  }

  //========== static function to get the favourite data ===========//
  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, "utf8", (err, data) => {
      if (err) {
        return callback([]);
      }
      try {
        const favourites = data.trim() ? JSON.parse(data) : [];
        callback(favourites);
      } catch (error) {
        console.log("Invalid JSON:", error.message);
        callback([]);
      }
    });
  }
};

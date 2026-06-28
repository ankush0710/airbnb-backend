const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");

// to capture the entire data form body like a fake database
const homesData = [];

module.exports = class Home {
  constructor(name, price, location, ratings, imageUrl) {
    // Use `name` as the canonical title field. Keep `homeName` for legacy compatibility handled in views.
    this.name = name;
    this.price = price;
    this.location = location;
    this.ratings = ratings;
    this.imageUrl = imageUrl;
  }

  save() {
    this.id = Math.random().toString();
    console.log("hone.js data:", this);
    Home.fetchAll((homesData) => {
      homesData.push(this);
      const homesDataPath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(homesDataPath, JSON.stringify(homesData), (err) => {
        console.log("File Write Concluded", err);
      });
    });
  }

  static fetchAll(callback) {
    const homesDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homesDataPath, (err, data) => {
      // console.log("File read:", err, data);
      callback(!err ? JSON.parse(data) : []);
    });
  }
};

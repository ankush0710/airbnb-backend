const { getDb } = require("../utils/databaseUtils");

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
    const db = getDb();
    return db.collection("homes").insertOne(this);
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('homes').find().toArray();
  }
};

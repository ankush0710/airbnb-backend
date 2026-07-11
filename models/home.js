const { getDb } = require("../utils/databaseUtils");

module.exports = class Home {
  constructor(name, price, location, ratings, imageUrl, _id) {
    // Use `name` as the canonical title field. Keep `homeName` for legacy compatibility handled in views.
    this.name = name;
    this.price = price;
    this.location = location;
    this.ratings = ratings;
    this.imageUrl = imageUrl;
    if(_id){
      this._id = _id;
    }
  }
  save() {
    const db = getDb();
    return db.collection("homes").insertOne(this);
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId){
    const db = getDb();
    return db.collection('homes').find({_id: homeId}).next();

  }
};

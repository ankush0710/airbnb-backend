const { ObjectId } = require("mongodb");
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
    if(this._id){
      const updateFields = {
        name: this.name,
        price: this.price,
        location: this.location,
        ratings: this.ratings,
        imageUrl: this.imageUrl
      }
      return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields})

    }
    else{
    return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId){
    const db = getDb();
    return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next();

  }

  static deleteById(homeId){
    const db = getDb();
    return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))}).next();
  }
};

const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/databaseUtils");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  //============ save function for add to favourite ==============//
  save(){
    const db = getDb();
    return db.collection('favourites').findOne({houseId: this.houseId}).then(existingFav => {
      if(!existingFav){
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve();
    })
  }

  //========== static function to get the favourite data ===========//
  static getFavourites() {
     const db = getDb();
    return db.collection('favourites').find().toArray();
  }
};

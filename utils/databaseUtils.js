const mongo = require("mongodb");

const mongoClient = mongo.MongoClient;

//url for mongodb connection with my local system
const mongoURL = "mongodb+srv://ankushkurvey053:aNkush123@airbnb-data.sgfhvxo.mongodb.net/?appName=airbnb-data"

let _db;
const mongoConnect = (callback) => {
  mongoClient
    .connect(mongoURL)
    .then((client) => {
      console.log("connected to the database");
      callback();
      _db = client.db("airbnb-data");
    })
    .catch((err) => {
      console.log("error while connecting with database", err);
    });
};

const getDb = () => {
  if(!_db){
    throw new Error("mongodb not created");
  }
  return _db
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

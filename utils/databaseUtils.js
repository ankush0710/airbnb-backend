const mongo = require("mongodb");

const mongoClient = mongo.MongoClient;

//url for mongodb connection with my local system
const mongoURL = "mongodb+srv://ankushkurvey053:aNkush123@airbnb-data.sgfhvxo.mongodb.net/?appName=airbnb-data"
const mongoConnect = (callback) => {
  mongoClient
    .connect(mongoURL)
    .then((client) => {
      console.log("connected to the database");

      callback(client);
    })
    .catch((err) => {
      console.log("error while connecting with database", err);
    });
};

module.exports = mongoConnect;

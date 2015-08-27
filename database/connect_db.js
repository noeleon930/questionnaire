var mongodb = require('mongoskin');
var client = mongodb.MongoClient;

var db = client.connect('mongodb://localhost:27017/questionnaire');

module.exports = db;

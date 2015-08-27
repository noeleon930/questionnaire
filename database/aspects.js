var db = require('./connect_db');

var aspects = db.collection('aspects');

module.exports = aspects;

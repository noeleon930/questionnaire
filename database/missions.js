var db = require('./connect_db');

var missions = db.collection('missions');

module.exports = missions;
